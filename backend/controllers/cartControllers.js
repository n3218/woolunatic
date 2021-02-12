import asyncHandler from "express-async-handler"
import Cart from "../models/cartModel.js"
import Product from "../models/productModel.js"

// @desc Add Item to Cart
// @route PUT /api/cart
// @access Private
export const addItemToCart = asyncHandler(async (req, res) => {
  console.log("------------------cartController: addItemToCart: req.body: ", req.body)
  const { user, product, qty } = req.body
  const productData = await Product.findById(product)

  if (productData) {
    console.log("-------------cartController: addItemToCart: productData: ", productData)
    const { art, brand, name, color } = productData
    const cart = await Cart.findOne({ user: user })
    if (cart) {
      console.log("-------------cartController: addItemToCart: cart: ", cart)
      console.log("//////", cart.items.filter(item => item.product == product && item.qty == qty).length)
      if (!cart.items.filter(item => item.product == product && item.qty == qty).length > 0) {
        cart.items = [
          ...cart.items,
          {
            art,
            brand,
            name,
            color,
            qty,
            product
          }
        ]
        const updatedCart = await cart.save()
        console.log("-------------cartController: addItemToCart: updatedCart: ", updatedCart)
        res.status(201).json(updatedCart)
      }
    } else {
      const newCart = new Cart({
        user,
        items: [
          {
            art,
            brand,
            name,
            color,
            qty,
            product
          }
        ]
      })
      const updatedCart = await newCart.save()
      console.log("-------------cartController: addItemToCart: updatedCart: ", updatedCart)
      res.status(201).json(updatedCart)
    }
  } else {
    res.status(404)
    throw new Error("Product not found to update cart")
  }

  // const updatedCart = await cart.save()

  // if (updatedCart) {
  //   res.status(201).json(updatedCart)

  // } else {
  //   res.status(401)
  //   throw new Error("Can not update the cart")
  // }
})
