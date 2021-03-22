import asyncHandler from "express-async-handler"
import Shipping from "../models/shippingModel.js"

// @desc Get Shipping
// @route GET /api/cart/shipping
// @access Private
export const getShipping = asyncHandler(async (req, res) => {
  console.log("req.params: ", req.params)
  try {
    const shipping = await Shipping.find({}).sort({ country: 1 })
    res.status(200).json(shipping)
  } catch (err) {
    res.status(404)
    throw new Error("Error on getting shippings: ", err)
  }
})
