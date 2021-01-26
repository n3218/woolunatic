import dotenv from "dotenv"
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import querystring from "querystring"
import colors from "colors"

import { createMollieClient } from "@mollie/api-client"
dotenv.config()
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })

// @desc Create new order
// @route GET /api/orders
// @access Private
export const createNewOrder = asyncHandler(async (req, res) => {
  const {
    orderItems, //
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res / status(400)
    throw new Error("No items in the order")
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

// @desc get Order By ID
// @route GET /api/orders
// @access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email")
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc   Get Logged in User Orders
// @route  GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ updatedAt: -1 })
  res.json(orders)
})

// @desc Get All Orders
// @route GET /api/orders
// @access Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const pageSize = 50
  const page = Number(req.query.pageNumber) || 1
  const count = await Order.countDocuments({})
  const orders = await Order.find({})
    .sort({ updatedAt: -1 })
    .populate("user", "id name")
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json({ orders, page, pages: Math.ceil(count / pageSize) })
})

// @desc update Order to Delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc update Order to Paid
// @route GET /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentMethod = "PayPal"
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    console.log("req.body: ", req.body)
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

// @desc get PaymentURL from Mollie
// @route PUT /api/orders/:id/molliepay
// @access Private
export const molliePay = asyncHandler(async (req, res) => {
  const { totalPrice, currency, description, orderId } = req.body
  const params = {
    amount: { value: Number(totalPrice).toFixed(2), currency: String(currency) },
    description: description,
    redirectUrl: `https://woolunatic.herokuapp.com/orders/${String(orderId)}`,
    webhookUrl: `https://woolunatic.herokuapp.com/api/orders/molliewebhook`,
    metadata: { order_id: String(orderId) }
  }
  await mollieClient.payments
    .create(params)
    .then(payment => {
      res.send(payment.getPaymentUrl())
    })
    .catch(error => {
      res.send(error)
    })
})

// @desc get Order status from Mollie
// @route POST /api/orders/molliewebhook
// @access Public
export const mollieWebHook = asyncHandler(async (req, res) => {
  let body = ""
  await req.on("data", chunk => {
    body += chunk.toString()
  })

  const id = querystring.parse(body).id
  const paymentResult = { id: id, update_time: Date.now() }
  const orderData = {}

  console.log("body: ", body) // BODY
  console.log("id: ", id) // BODY.ID
  // try {
  await mollieClient.payments.get(id).then(payment => {
    console.log("mollieHook:payment: ", payment) // mollieHook:payment
    orderData.id = payment.metadata.order_id
    let details = ""
    if (payment.details) {
      details = Object.keys(payment.details).map(key => " " + key + ": " + payment.details[key] + " \n")
    }
    orderData.paymentMethod = payment.method + ", " + details
    orderData.paidAt = payment.paidAt || payment.authorizedAt || payment.createdAt
    paymentResult.status = payment.status
    paymentResult.email_address = payment.billingEmail || payment.description
    if (payment.isPaid()) {
      orderData.isPaid = true
      console.log("payment.isPaid(): Hooray, you've received a payment! You can start shipping to the consumer.")
    } else if (!payment.isOpen()) {
      console.log("!payment.isOpen(): The payment isn't paid and has expired. We can assume it was aborted.")
    }
    console.log("payment.status: ", payment.status) // PAYMENT STATUS
    // res.status(200)
  })
  // .catch(error => {
  //   res.status(404).send(error)
  //   throw new Error("Payment not found")
  // })

  const order = await Order.findById(orderData.id)
  if (order) {
    order.paymentMethod = orderData.paymentMethod
    order.isPaid = orderData.isPaid
    order.paidAt = orderData.paidAt
    order.paymentResult = paymentResult
    const updatedOrder = await order.save()

    console.log("updatedOrder: ", updatedOrder) //UPDATED ORDER

    res.status(200).send("200 OK")
  } else {
    res.status(404).send(error)
    throw new Error("Order not found")
  }
  // } catch (error) {
  //   res.status(404).send(error)
  //   throw new Error("No Payment ID received")
  // }
})

// https://www.mollie.com/dashboard/org_11322007/payments
