import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @desc   Fetch all products
// @route  GET /api/products
// @access Public
export const getProducts = asyncHandler(async (req, res) => {
  let order = req.body.order ? req.body.order : "desc"
  let sortBy = req.body.sortBy ? req.body.sortBy : "updatedAt"
  let page = Number(req.query.pageNumber) || 1
  let pageSize = 300
  let parameters = {}

  if (req.query.keyword) {
    parameters = {
      $or: [
        //
        { name: { $regex: req.query.keyword, $options: "i" } },
        { brand: { $regex: req.query.keyword, $options: "i" } },
        { color: { $regex: req.query.keyword, $options: "i" } },
        { colorWay: { $regex: req.query.keyword, $options: "i" } },
        { category: { $regex: req.query.keyword, $options: "i" } }
      ]
    }
  }

  if (req.query.category) {
    let cat = req.query.category.split("-")

    if (cat.length === 1) {
      parameters = {
        category: { $regex: cat[0], $options: "i" }
      }
    }
    if (cat.length === 2) {
      parameters = {
        $or: [
          //
          { category: { $regex: cat[0], $options: "i" } },
          { category: { $regex: cat[1], $options: "i" } }
        ]
      }
    }
    if (cat.length === 3) {
      parameters = {
        $or: [
          //
          { category: { $regex: cat[0], $options: "i" } },
          { category: { $regex: cat[1], $options: "i" } },
          { category: { $regex: cat[2], $options: "i" } }
        ]
      }
    }
    if (cat.length === 4) {
      parameters = {
        $or: [
          //
          { category: { $regex: cat[0], $options: "i" } },
          { category: { $regex: cat[1], $options: "i" } },
          { category: { $regex: cat[2], $options: "i" } },
          { category: { $regex: cat[3], $options: "i" } }
        ]
      }
    }
  }

  const count = await Product.countDocuments({ ...parameters })
  const products = await Product.find({ ...parameters })
    .sort([
      ["outOfStock", 1],
      [sortBy, order]
    ])
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize), count })
})

// @desc   Get top rated products
// @route  GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ outOfStock: 1, updatedAt: -1 }).limit(12)
  res.json(products)
})

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc   Delete a product
// @route  DELETE /api/products/:id
// @access Private/+Admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc   Create a product
// @route  POST /api/products
// @access Private/+Admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: [],
    brand: "",
    category: "",
    inStock: "",
    outOfStock: false,
    numReviews: 0,
    description: "",
    fibers: "",
    meterage: "",
    minimum: 0,
    color: "",
    colorWay: "",
    art: "",
    nm: "",
    novelty: false,
    inSale: false,
    regular: false
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/+Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, inStock, outOfStock, fibers, meterage, minimum, color, colorWay, art, nm, novelty, inSale, regular } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.image = image
    product.brand = brand
    product.category = category
    product.inStock = inStock
    product.outOfStock = outOfStock
    product.description = description
    product.fibers = fibers
    product.meterage = meterage
    product.minimum = minimum
    product.color = color
    product.colorWay = colorWay
    product.art = art
    product.nm = nm
    product.novelty = novelty
    product.inSale = inSale
    product.regular = regular

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc   Create New Review
// @route  POST /api/products/:id/reviews
// @access Private
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if (alreadyReviewed) {
      res.status(400)
      throw new Error("Product already reviewed")
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length
    await product.save()
    res.status(201).json({ message: "Review added" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

// @desc   Check Products in Stock
// @route  POST /api/products/check
// @access Private
export const checkProductsInStock = asyncHandler(async (req, res) => {
  const cartItems = req.body
  const checkItem = async item => {
    const product = await Product.findById(item.product)
    if (product) {
      if (product.outOfStock) {
        return { ...item, message: "Product out of Stock" }
      } else if (product.inStock) {
        const arr = product.inStock
          .split(",")
          .map(el => Number(el.trim()))
          .sort((a, b) => a - b)
        if (arr.includes(item.qty)) {
          return { ...item, message: "" }
        } else {
          if (product.minimum > 0) {
            let minLeftover = Math.ceil(((1500 / product.meterage) * 100) / 100) * 100
            let maxVal = arr[arr.length - 1] - minLeftover
            if (item.qty >= product.minimum && item.qty <= maxVal) {
              return item
            } else {
              return { ...item, message: "Weight not found" }
            }
          } else {
            return { ...item, message: "Weight not found" }
          }
        }
      }
    } else {
      return { ...item, message: "Product not Found" }
    }
  }
  const checkedItems = cartItems.map(item => checkItem(item))
  const results = await Promise.all(checkedItems)
  console.log("=================checkProductsInStock:results: ", results)
  if (results) {
    res.status(200).json(results)
  } else {
    res.status(404)
    throw new Error("Checking items in stock failed")
  }
})

// @desc   Check Products in Stock
// @route  POST /api/products/removefromdb
// @access Private
export const removeItemsFromDB = asyncHandler(async (req, res) => {
  console.log("=================removeItemsFromDB:req.body: ", req.body)
  const cartItems = req.body

  const removeItem = async item => {
    const product = await Product.findById(item.product)
    if (product) {
      const arr = product.inStock
        .split(",")
        .map(el => Number(el.trim()))
        .sort((a, b) => a - b)
      let index = arr.indexOf(item.qty)
      if (index !== -1) {
        arr.splice(index, 1)
        product.inStock = arr.join(",")
      } else {
        if (product.minimum > 0) {
          let minLeftover = Math.ceil(((1500 / product.meterage) * 100) / 100) * 100
          let maxVal = arr[arr.length - 1] - minLeftover
          if (item.qty >= product.minimum && item.qty <= maxVal) {
            let windBigger = arr[arr.length - 1] - item.qty
            arr.pop().push(windBigger)
            product.inStock = arr.join(",")
          } else {
            return { message: "Weight not found" }
          }
        }
      }
      if (arr.length === 0) {
        product.outOfStock = true
      }
      console.log("++++++++++++++++++ productController:removeItemsFromDB:product: ", product)
      const savedProduct = await product.save()
      console.log("++++++++++++++++++ productController:removeItemsFromDB:savedProduct: ", savedProduct)
    } else {
      return { message: "Product not Found" }
    }
  }

  // res.status(201).json({ message: "Review added" })

  const removeddItems = cartItems.map(item => removeItem(item))

  const results = await Promise.all(removeddItems)
  console.log("=================removeItemsFromDB:results: ", results)

  if (results) {
    res.status(201).json(results)
  } else {
    res.status(404)
    throw new Error("Checking items in stock failed")
  }
})
