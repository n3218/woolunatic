import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
import fs from "fs"

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
  const products = await Product.find({}).sort({ outOfStock: 1, novelty: -1, updatedAt: -1 }).limit(12)
  res.json(products)
})

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    if (product.onHold) {
      let filteredHold = []
      let arrInStock = product.inStock.split(",")
      product.onHold.map(hold => {
        if (new Date(hold.lockedAt).getTime() + 900000 < Date.now()) {
          //remove from hold and put to inStock
          if (arrInStock.length === 0) {
            product.outOfStock = false
          }
          arrInStock.push(hold.qty)
        } else {
          //keep in hold and remove from inStock
          filteredHold.push(hold)
          let index = arrInStock.indexOf(hold.qty)
          arrInStock.splice(index, 1)
          if (arrInStock.length === 0) {
            product.outOfStock = true
          }
        }
      })
      product.onHold = filteredHold
      product.inStock = arrInStock.join(",")

      console.log("filteredHold: ", filteredHold)
    }

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
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
    const deleteImages = () => {
      if (product.image && product.image.length > 0) {
        product.image.map(img => {
          try {
            let productImage = "uploads/products/" + img
            let productPath = fs.statSync(productImage)
            if (productPath.isFile()) {
              fs.unlinkSync(productImage) // remove fullsize file
            }
            let thumbImage = "uploads/thumbs/thumb-" + img
            let thumbPath = fs.statSync(thumbImage)
            if (thumbPath.isFile()) {
              fs.unlinkSync(thumbImage) // remove thumb file
            }
            let minithumbImage = "uploads/minithumbs/minithumb-" + img
            let minithumbPath = fs.statSync(minithumbImage)
            if (minithumbPath.isFile()) {
              fs.unlinkSync(minithumbImage) // remove minithumb file
            }
          } catch (err) {
            console.log(err)
            res.status(404)
            throw new Error("Can't delete Image from Disk")
          }
        })
      }
    }

    await Promise.all([deleteImages, product.remove()])
      .then(() => {
        console.log({ message: `Product was successfully deleted.` })
        res.json({ message: `Product was successfully deleted.` })
      })
      .catch(err => {
        res.status(404)
        throw new Error("Problem with deleting Images", err)
      })
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

// @desc   Remove Product from Stock or DB
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
            const savedProduct = await product.save()
            console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\ removeItemsFromDB: savedProduct: ", savedProduct)

            return `Weight '${item.qty}' removed from list inStock in product '${product.art}', product still has '${product.inStock}' weights inStock.`
          } else {
            return { message: "Weight not found" }
          }
        }
      }
      if (arr.length === 0) {
        product.outOfStock = true
        const savedProduct = await product.save()
        console.log("/////////////////////////// removeItemsFromDB: savedProduct: ", savedProduct)
        return `Weight '${item.qty}' removed, product '${product.art}' marked as 'outOfStock'.`
      }
    } else {
      return { message: "Product not Found" }
    }
  }

  let results = cartItems.reduce((acc, nextItem) => {
    return acc.then(() => {
      return removeItem(nextItem)
    })
  }, Promise.resolve())

  // const removedItems = cartItems.map(item => removeItem(item))

  // const results = await Promise.all(removedItems)
  console.log("=================removeItemsFromDB:results: ", results)

  results.then(e => {
    console.log("=================removeItemsFromDB:e: ", e)
  })

  if (results) {
    res.status(201).json(results)
  } else {
    res.status(404)
    throw new Error("Checking items in stock failed")
  }
})

// @desc   Delete single Image from Product
// @route  PUT /api/products/deleteimage/:img
// @access Private/+Admin
export const deleteProductImage = asyncHandler(async (req, res) => {
  console.log("deleteProductImage: req.params.img: ", req.params.img)
  try {
    fs.unlinkSync(`uploads/products/${req.params.img}`) // remove fullsize file
    fs.unlinkSync(`uploads/thumbs/thumb-${req.params.img}`) // remove thumb file
    fs.unlinkSync(`uploads/minithumbs/minithumb-${req.params.img}`) // remove minithumb file
    res.json({ message: "Image deleted from Disk" })
  } catch (err) {
    console.log(err)
    res.status(404)
    throw new Error("Can't delete Image from Disk")
  }
})

// @desc   Delete All Products from DB
// @route  DELETE /api/products/delete/bulk
// @access Private/+Admin
export const deleteAllProductsData = asyncHandler(async (req, res) => {
  console.log("deleteAllProductsData")
  try {
    await Product.deleteMany({})
    console.log("Data Destroyed!")
    res.json({ message: "All Products deleted from DB" })
  } catch (error) {
    console.error(error)
    res.status(404)
    throw new Error("Problem with deleting Products from DB")
  }
})
