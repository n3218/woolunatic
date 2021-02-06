import dotenv from "dotenv"
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import querystring from "querystring"
import colors from "colors"

import { createMollieClient } from "@mollie/api-client"
import { json } from "express"
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
    totalPrice,
    itemsWeight,
    totalWeight
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
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
      totalPrice,
      itemsWeight,
      totalWeight
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
  console.log("=========================updateOrderToPaid:req.body: ", req.body)
  const order = await Order.findById(req.params.id)
  if (order) {
    console.log("=========================updateOrderToPaid:if(order):order: ", order)

    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentMethod = "PayPal"
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
      links: JSON.stringify(payment._links)
    }

    const updatedOrder = await order.save()
    console.log("=========================updateOrderToPaid:updatedOrder: ", updatedOrder)
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
  await mollieClient.payments.create(params).then(payment => {
    res.send(payment.getPaymentUrl())
  })
})

// @desc get Order status from Mollie
// @route POST /api/orders/molliewebhook
// @access Public
export const mollieWebHook = asyncHandler(async (req, res) => {
  let orderToUpdate = {}

  const getPayment = async id =>
    await mollieClient.payments.get(id).then(payment => {
      console.log("=============================mollieHook:payment: ", payment) ////// mollieHook:payment
      orderToUpdate = {
        id: payment.metadata.order_id,
        paymentMethod: payment.method,
        paidAt: payment.paidAt || payment.authorizedAt || payment.createdAt,
        isPaid: false,
        paymentResult: {
          id: id,
          update_time: Date.now(),
          status: payment.status,
          email_address: payment.billingEmail || "",
          links: JSON.stringify(payment._links)
        }
      }

      if (payment.isPaid()) {
        orderToUpdate.isPaid = true
        console.log("payment.isPaid(): Hooray, you've received a payment! You can start shipping to the consumer.")
      } else if (!payment.isOpen()) {
        console.log("!payment.isOpen(): The payment isn't paid and has expired. We can assume it was aborted.")
      }
      console.log("=============================payment.status: ", payment.status) // PAYMENT STATUS

      getOrderToUpdate(orderToUpdate.id)
    })

  const getOrderToUpdate = async orderId => {
    console.log("getOrderToUpdate") /////////////////////// getOrderToUpdate
    console.log("orderId: ", orderId) //////////////////// orderId
    const order = await Order.findById(orderId)
    if (order) {
      order.paymentMethod = orderToUpdate.paymentMethod
      order.paidAt = orderToUpdate.paidAt
      order.paymentResult = orderToUpdate.paymentResult
      order.isPaid = orderToUpdate.isPaid

      const updatedOrder = await order.save()
      console.log("updatedOrder: ", updatedOrder) ////////// UPDATED ORDER
      res.status(200).send("200 OK")
    } else {
      res.status(404)
      throw new Error("Order not found")
    }
  }

  let body = ""
  await req
    .on("data", chunk => {
      body += chunk.toString()
    })
    .on("end", () => {
      const id = querystring.parse(body).id
      console.log("=============================req.body: ", body) /////////////////////////////// ID
      console.log("=============================req.body.id: ", id) /////////////////////////////// ID
      getPayment(id)
    })
})

// https://www.mollie.com/dashboard/org_11322007/payments
