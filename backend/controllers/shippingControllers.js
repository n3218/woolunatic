import asyncHandler from "express-async-handler"
import Shipping from "../models/shippingModel.js"

// @desc Get Shipping
// @route GET /api/shippings
// @access Private
export const getShippingList = asyncHandler(async (req, res) => {
  console.log("req.params: ", req.params)
  try {
    const shipping = await Shipping.find({}).sort({ country: 1 })
    res.status(200).json(shipping)
  } catch (err) {
    res.status(404)
    throw new Error("Error on getting shippings: ", err)
  }
})

// @desc Get Shipping By ID
// @route GET /api/shippings/:id
// @access Private
export const getShippingById = asyncHandler(async (req, res) => {
  console.log("req.params: ", req.params)
  const id = req.params.id
  try {
    const shipping = await Shipping.findById(id)
    res.status(200).json(shipping)
  } catch (err) {
    res.status(404)
    throw new Error("Error on getting shipping by Id: ", err)
  }
})

// @desc   Create a Shipping
// @route  POST /api/shippings
// @access Private/+Admin
export const createShipping = asyncHandler(async (req, res) => {
  console.log("createShipping")
  const shipping = new Shipping({
    country: "Enter Country",
    local: "Enter Local",
    options: [
      { minWeight: 0, maxWeight: 2000, operator: "", cost: 0 },
      { minWeight: 2001, maxWeight: 5000, operator: "", cost: 0 },
      { minWeight: 5001, maxWeight: 10000, operator: "", cost: 0 },
      { minWeight: 10000, maxWeight: 20000, operator: "", cost: 0 }
    ]
  })
  try {
    const createdShipping = await shipping.save()
    console.log("createShipping: createdShipping: ", createdShipping)
    res.status(201).json(createdShipping)
  } catch (err) {
    console.log("Error on creating Shipping: ", err)
  }
})

// @desc   Update a Shipping
// @route  PUT /api/shippings/:id
// @access Private/+Admin
export const updateShipping = asyncHandler(async (req, res) => {
  console.log("updateShipping")
  const { shipping } = req.body
  console.log("updateShipping: shipping: ", shipping)

  try {
    let result = await Shipping.findByIdAndUpdate(req.params.id, { ...shipping }, { new: true })
    console.log("updateshipping: result: ", result)
    res.status(201).json(result)
  } catch (err) {
    res.status(404)
    throw new Error("Problem on updating Shipping: ", err)
  }
})

// @desc   Delete a Shipping
// @route  DELETE /api/shippings/:id
// @access Private/+Admin
export const deleteShipping = asyncHandler(async (req, res) => {
  const shipping = await Shipping.findById(req.params.id)
  if (shipping) {
    try {
      await shipping.remove()
      console.log({ message: `Shipping was successfully deleted.` })
      res.json({ message: `Shipping was successfully deleted.` })
    } catch (err) {
      res.status(404)
      throw new Error("Problem with deleting Shipping", err)
    }
  } else {
    res.status(404)
    throw new Error("Shipping not found")
  }
})
