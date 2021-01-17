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
    .sort([[sortBy, order]])
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ products, page, pages: Math.ceil(count / pageSize), count })
})

// @desc   Get top rated products
// @route  GET /api/products/top
// @access Public
export const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ updatedAt: -1 }).limit(12)
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
    nm: ""
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc   Update a product
// @route  PUT /api/products/:id
// @access Private/+Admin
export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, inStock, outOfStock, fibers, meterage, minimum, color, colorWay, art, nm } = req.body
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
