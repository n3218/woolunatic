import asyncHandler from "express-async-handler"
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

const holdTime = 300000

const fillTheCartWithData = async cart => {
  const prodIds = cart.items.map(it => it.product) //------------------------------- collect cartItem's IDs
  const products = await Product.find({ _id: { $in: prodIds } }) //----------------- find Products with those IDs
  const prodMap = {}
  products.map(prod => (prodMap[prod._id] = prod)) //------------------------------- build a map of Products

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
        image: it.image,
        price: it.price
      }

      if (prodMap[it.product]) {
        //------------------------------------------ if Product exists in DB
        let product = prodMap[it.product] // ------- Product from DB

        result.price = product.price
        result.product = product
        const arr = product.inStock
          .split(",")
          .map(el => Number(el.trim()))
          .sort((a, b) => a - b)

        const isCurrentUserHold = product.onHold.filter(hold => Number(hold.qty) === Number(it.qty) && String(hold.user) === String(cart.user))
        console.log("isCurrentUserHold: ", isCurrentUserHold)
        if (isCurrentUserHold.length === 0) {
          // check in stock

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
  console.log("req.params: ", req.params.id)
  try {
    const cart = await Cart.findOne({ user: req.params.id })
    if (cart) {
      let updatedCart = await fillTheCartWithData(cart)
      res.json(updatedCart)
    } else {
      console.log("getCart: ELSE: ")

      res.status(200).json({ message: "your cart is empty" })
    }
  } catch {
    res.status(404)
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
        newItem.price = productData.price
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
  console.log("startCheckout: user: ", user)
  const cart = await Cart.findOne({ user: user })
  const prodMap = {} //

  if (cart) {
    const updatedProducts = await Promise.all(
      cart.items.map(async item => {
        const product = await Product.findById(item.product)
        if (product) {
          console.log("--------------------product._id: ", product._id)
          if (!prodMap[product._id]) {
            prodMap[product._id] = product
          }
          prodMap[product._id].onHold.push({
            qty: item.qty,
            user: user,
            lockedAt: Date.now()
          })

          const arr = prodMap[product._id].inStock.split(",").sort((a, b) => a - b)

          console.log("prodMap[product._id].outOfStock: ", prodMap[product._id].outOfStock)
          console.log("prodMap[product._id].inStock: ", prodMap[product._id].inStock)

          if (arr.length === 1) {
            //-------------------------------------- if only one weight is in Stock
            console.log("arr.length: ", arr.length)
            console.log("arr.length === 1: ", arr.length === 1)
            prodMap[product._id].outOfStock = true
            prodMap[product._id].inStock = ""
          } else {
            const index = arr.indexOf(String(item.qty)) //---------------- else find an index
            if (index !== -1) {
              arr.splice(index, 1)
              console.log("arr after splice: ", arr)
            } else {
              if (product.minimum > 0) {
                //------------------------------- if no index found check minimum
                let minLeftover = Math.ceil(((1500 / product.meterage) * 100) / 100) * 100
                let maxVal = arr[arr.length - 1] - minLeftover
                if (item.qty >= product.minimum && item.qty <= maxVal) {
                  console.log("/////item.qty: ", `${item.qty} >= ${product.minimum} && ${item.qty} <= ${maxVal}`)

                  // remove qty from biggest cone
                  console.log("before replacing arr: ", arr)
                  arr.splice(arr.length - 1, 1, arr[arr.length - 1] - item.qty)
                  console.log("after replacing arr: ", arr)
                } else {
                  console.log(`Error: Qty not found in Stock: ${item.qty}g in ${item.brand} ${item.name} ${item.color}`)
                  res.status(404)
                  throw new Error(`Qty not found in Stock: ${item.qty}g in ${item.brand} ${item.name} ${item.color}`)
                }
              } else {
                console.log(`Error: Qty not found in Stock: ${item.qty}g in ${item.brand} ${item.name} ${item.color}`)
                res.status(404)
                throw new Error(`Qty not found in Stock: ${item.qty}g in ${item.brand} ${item.name} ${item.color}`)
              }
            }
            prodMap[product._id].inStock = arr.join(",")
          }
          console.log("prodMap[product._id].outOfStock: ", prodMap[product._id].outOfStock)
          console.log("prodMap[product._id].inStock: ", prodMap[product._id].inStock)
          console.log("prodMap[product._id].onHold: ", prodMap[product._id].onHold)
          return await product.save()
        } else {
          console.log("Error: Product not found: ", item.qty)
          res.status(404)
          throw new Error(`Product not found: ${item.brand} ${item.name} ${item.color}`)
        }
      })
    )

    if (updatedProducts) {
      Object.keys(prodMap).map(async key => {
        let id = prodMap[key]._id
        let update = {
          $set: {
            outOfStock: prodMap[key].outOfStock,
            inStock: prodMap[key].inStock,
            onHold: prodMap[key].onHold
          }
        }
        let options = { upsert: false }

        await Product.findByIdAndUpdate(id, update, options)
          .then(result => {
            const { matchedCount, modifiedCount } = result
            if (matchedCount && modifiedCount) {
              console.log(`/////////////////////Successfully updated the item. `, matchedCount, modifiedCount)
            }
          })
          .catch(err => console.error(`Failed to update the item: ${err}`))
      })
      res.status(201).json(cart)
    }
  } else {
    res.status(404)
    throw new Error("Cart not found")
  }
})
