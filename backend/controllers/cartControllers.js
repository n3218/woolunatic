import asyncHandler from "express-async-handler"
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

const fillTheCartWithData = async cart => {
  const prodIds = cart.items.map(it => it.product)
  const products = await Product.find({ _id: { $in: prodIds } })
  const prodMap = {}
  products.map(prod => (prodMap[prod._id] = prod))
  const itemsData = cart.items
    .sort((a, b) => String(b._id).localeCompare(String(a._id)))
    .map(it => {
      let result = {
        qty: it.qty,
        art: it.art,
        brand: it.brand,
        name: it.name,
        color: it.color,
        meterage: it.meterage,
        fibers: it.fibers,
        image: it.image
      }
      if (prodMap[it.product]) {
        let product = prodMap[it.product]
        result.price = product.price
        result.product = product
        const arr = product.inStock
          .split(",")
          .map(el => Number(el.trim()))
          .sort((a, b) => a - b)
        if (product.outOfStock) {
          result.message = "out of stock"
        } else if (!arr.includes(it.qty)) {
          if (product.minimum > 0) {
            let minLeftover = Math.ceil(((1500 / product.meterage) * 100) / 100) * 100
            let maxVal = arr[arr.length - 1] - minLeftover
            if (it.qty >= product.minimum && it.qty <= maxVal) {
              console.log("/////it.qty: ", `${it.qty} >= ${product.minimum} && ${it.qty} <= ${maxVal}`)
              result.message = ""
            } else {
              result.message = "weight not found"
            }
          } else {
            result.message = "weight not found"
          }
        }
      } else {
        result.message = "product not found"
        result.price = 0
        result.product = it.product
      }
      return result
    })
  cart.items = itemsData
  return cart
}

// @desc Get Cart
// @route GET /api/cart/user/:id
// @access Private
export const getCart = asyncHandler(async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id })
    if (cart) {
      let updatedCart = await fillTheCartWithData(cart)
      res.json(updatedCart)
    } else {
      res.status(201).json({ message: "your cart is empty" })
    }
  } catch {
    res.status(401)
    throw new Error("Can not find a product")
  }
})

// @desc Add Item to Cart
// @route POST /api/cart
// @access Private
export const addItemToCart = asyncHandler(async (req, res) => {
  let updatedCart = {}
  const { user, productId, qty } = req.body
  const newItem = { user, productId, qty }
  try {
    const cart = await Cart.findOne({ user: user })
    try {
      const productData = await Product.findById(productId)
      if (productData) {
        newItem.product = productId
        newItem.art = productData.art
        newItem.brand = productData.brand
        newItem.name = productData.name
        newItem.color = productData.color
        newItem.fibers = productData.fibers
        newItem.meterage = productData.meterage
        newItem.image = productData.image[0] || ""
      }
    } catch (err) {
      console.log(err)
    }
    if (cart) {
      if (!cart.items.filter(item => item.product == productId && item.qty == qty).length > 0) {
        cart.items = [...cart.items, newItem]
      } else {
        cart.items = [...cart.items]
      }
      updatedCart = await cart.save()
    } else {
      const newCart = new Cart({
        user,
        items: [newItem]
      })
      updatedCart = await newCart.save()
    }
    let resultCart = await fillTheCartWithData(updatedCart)
    res.status(201).json(resultCart)
  } catch {
    res.status(401)
    throw new Error("Can not find a product")
  }
})

// @desc Remove Item from Cart
// @route PUT /api/cart/:id
// @access Private
export const removeItemFromCart = asyncHandler(async (req, res) => {
  const { user, productId, qty } = req.body
  const cart = await Cart.findOne({ user: user })
  if (cart) {
    const filteredCart = new Cart(cart)
    filteredCart.items = cart.items.filter(item => !(item.product == productId && item.qty == qty))
    await filteredCart.save()
    let updatedCart = await fillTheCartWithData(filteredCart)
    res.status(201).json(updatedCart)
  } else {
    res.status(404)
    throw new Error("Cart not found")
  }
})

// @desc Start Checkout
// @route PUT /api/cart/startcheckout
// @access Private
export const startCheckout = asyncHandler(async (req, res) => {
  const { user } = req.body
  console.log("user: ", user)
  const cart = await Cart.findOne({ user: user })
  if (cart) {
    console.log("cart: ", cart)
    const updatedProducts = await Promise.all(
      cart.items.map(async item => {
        console.log("item: ", item)
        const filter = { _id: item.product }
        const update = {
          $set: {
            onHold: {
              qty: item.qty,
              user: user,
              lockedAt: Date.now()
            }
          }
        }
        return await Product.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
          if (err) {
            console.log("Something wrong with updating Product")
            return err
          }
          console.log("doc: ", doc)
          return doc
        })
      })
    )
    if (updatedProducts) {
      console.log("updatedProducts: ", updatedProducts)
      res.json(cart)
    }
  } else {
    res.status(404)
    throw new Error("Cart not found")
  }
})
