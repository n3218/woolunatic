import dotenv from "dotenv"
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import querystring from "querystring"
import colors from "colors"
import { sendMail } from "../mailer/mailer.js"

import { createMollieClient } from "@mollie/api-client"
import { json } from "express"
import Product from "../models/productModel.js"
dotenv.config()
const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })

// @desc Create new order
// @route POST /api/orders
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
  const order = await Order.findById(req.params.id).populate("user", "name email")
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

// @desc update Order to Paid by PAYPAL
// @route GET /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  console.log("=========================updateOrderToPaid:req.body: ", req.body)
  const order = await Order.findById(req.params.id).populate("user", "name email")
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentMethod = "PayPal"
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
      links: JSON.stringify({ self: { href: req.body.links[0]["href"] } })
    }
    const updatedOrder = await order.save()
    if (updatedOrder) {
      actionsAfterOrderPay(updatedOrder)
    }
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
  console.log("molliePay: req.body:", req.body)
  const { totalPrice, currency, description, orderId } = req.body
  const params = {
    amount: { value: Number(totalPrice).toFixed(2), currency: String(currency) },
    description: description,
    redirectUrl: `https://woolunatic.herokuapp.com/orders/${String(orderId)}`,
    webhookUrl: `https://woolunatic.herokuapp.com/api/orders/molliewebhook`,
    metadata: { order_id: String(orderId) }
  }
  console.log("molliePay: params:", params)
  await mollieClient.payments
    .create(params)
    .then(payment => {
      console.log("molliePay: payment.id: ", payment.id)
      console.log("molliePay: payment.getPaymentUrl(): ", payment.getPaymentUrl())
      res.send(payment.getPaymentUrl())
    })
    .catch(err => {
      console.error("Error on sending Mollie Payment URL: ", err)
    })
})

// @desc get Order status from MOLLIE
// @route POST /api/orders/molliewebhook
// @access Public
export const mollieWebHook = asyncHandler(async (req, res) => {
  let orderToUpdate = {}
  let id = req.body.id

  try {
    await mollieClient.payments
      .get(id)
      .then(async payment => {
        console.log("============================= mollieHook: payment: ", payment) //---- mollieHook:payment
        orderToUpdate = {
          orderId: payment.metadata.order_id,
          paymentMethod: payment.method,
          paidAt: payment.paidAt || payment.authorizedAt || payment.createdAt,
          isPaid: true,
          paymentResult: {
            id: id,
            update_time: Date.now(),
            status: payment.status,
            email_address: payment.billingEmail || "",
            links: JSON.stringify(payment._links)
          }
        }
        console.log("mollieWebHook: payment.status: ", payment.status) // PAYMENT STATUS
        console.log("mollieWebHook: payment.isPaid(): ", payment.isPaid()) // PAYMENT ISPAID

        const order = await Order.findById(orderToUpdate.orderId).populate("user", "name email")
        if (order) {
          order.paymentMethod = orderToUpdate.paymentMethod
          order.paidAt = orderToUpdate.paidAt
          order.paymentResult = orderToUpdate.paymentResult
          order.isPaid = orderToUpdate.isPaid

          try {
            const updatedOrder = await order.save()
            console.log("---------------------mollieWebHook: updatedOrder: ", updatedOrder) //  UPDATED ORDER

            if (updatedOrder) {
              saveOrderToMollie(updatedOrder)
              actionsAfterOrderPay(updatedOrder)
            }
          } catch (err) {
            res.status(404)
            throw new Error("Error on update Product after Mollie Payment: ", err)
          }
        } else {
          res.status(404)
          throw new Error("Order not found")
        }
      })
      .then(result => {
        console.log("result: ", result)
        console.log("req.body.id: ", req.body.id)
        res.status(200).send("200 OK")
      })
  } catch (err) {
    console.warn("Error on mollieClient.payments.get: ", err)
  }

  const saveOrderToMollie = async updatedOrder => {
    const vat = "21.00"
    try {
      // const mollieItems = updatedOrder.orderItems.map(it => ({
      //   type: "",
      //   sku: "",
      //   name: it.art + " " + it.brand + " " + it.name + " " + it.color,
      //   productUrl: `https://woolunatic.herokuapp.com/products/${it._id}`,
      //   imageUrl: it.image ? `https://woolunatic.herokuapp.com/uploads/tuhmbs/${it.image}` : "",
      //   quantity: it.qty / 100,
      //   vatRate: vat,
      //   unitPrice: {
      //     currency: "EUR",
      //     value: (it.price * it.qty) / 100
      //   },
      //   totalAmount: {
      //     currency: "EUR",
      //     value: ((it.price * it.qty) / 100 + ((it.price * it.qty) / 100) * 0.21).toFixed(2)
      //   },
      //   discountAmount: {
      //     currency: "EUR",
      //     value: ""
      //   },
      //   vatAmount: {
      //     currency: "EUR",
      //     value: ((it.price * it.qty) / 100) * 0.21
      //   }
      // }))

      const mollieOrder = await mollieClient.orders.create({
        amount: {
          value: updatedOrder.totalPrice,
          currency: "EUR"
        },
        billingAddress: {
          organizationName: updatedOrder.user.name,
          streetAndNumber: updatedOrder.shippingAddress.address,
          city: updatedOrder.shippingAddress.city,
          region: "",
          postalCode: updatedOrder.shippingAddress.zipCode,
          country: updatedOrder.shippingAddress.country,
          title: "",
          givenName: updatedOrder.user.name,
          familyName: "",
          email: updatedOrder.user.email,
          phone: ""
        },
        shippingAddress: {
          organizationName: updatedOrder.user.name,
          streetAndNumber: updatedOrder.shippingAddress.address,
          city: updatedOrder.shippingAddress.city,
          region: "",
          postalCode: updatedOrder.shippingAddress.zipCode,
          country: updatedOrder.shippingAddress.country,
          title: "",
          givenName: updatedOrder.user.name,
          familyName: "",
          email: updatedOrder.user.email
        },
        metadata: {
          order_id: updatedOrder._id,
          description: "Woolunatics.Nl order"
        },
        consumerDateOfBirth: "",
        locale: updatedOrder.shippingAddress.country,
        orderNumber: updatedOrder._id,
        redirectUrl: `https://woolunatic.herokuapp.com/orders/${String(updatedOrder._id)}`,
        webhookUrl: `https://woolunatic.herokuapp.com/api/orders/molliewebhook`,
        method: updatedOrder.paymentMethod,
        lines: []
      })

      console.log("mollieOrder: ", mollieOrder)
    } catch (error) {
      console.warn(error)
    }
  }
}) // https://www.mollie.com/dashboard/org_11322007/payments

//
//
// @desc Actions after Order Pay
export const actionsAfterOrderPay = async order => {
  console.log("======================================actionsAfterOrderPay: order: ", order)
  const productsMap = {}
  await Promise.all(
    order.orderItems.map(async item => {
      const product = await Product.findById(item.product)
      if (product) {
        if (!productsMap[product._id]) {
          productsMap[product._id] = product
        }
        console.log("actionsAfterOrderPay: BEFORE filter productsMap[product._id]: ", productsMap[product._id].onHold)
        product.onHold.map(hold => {
          console.log("IF ", hold.user, " = ", order.user._id, " && ", hold.qty, " == ", item.qty)
          if (String(hold.user) === String(order.user._id) && Number(hold.qty) === Number(item.qty)) {
            console.log("++++++++++++++++++++++++++++++IF")
            let index = productsMap[product._id].onHold.indexOf(hold)
            console.log("index: ", hold.qty, index)
            productsMap[product._id].onHold.splice(index, 1)
          }
        })
        console.log("actionsAfterOrderPay: AFTER filter productsMap[product._id].onHold: ", productsMap[product._id].onHold)
      } else {
        console.error("Product not found")
      }
    })
  )
    .then(async () => {
      console.log("--------------productsMap: ", productsMap)

      await Promise.all(
        Object.keys(productsMap).map(async key => {
          let updatedProduct = await Product.findByIdAndUpdate(productsMap[key]._id, productsMap[key])
          if (updatedProduct) {
            return updatedProduct
          } else {
            console.error("Can't update a product")
          }
        })
      )
        .then(results => console.log("results: ", results))
        .catch(err => console.error("Error on updating Products: ", err))
    })
    .catch(err => console.error("Error on sendMail: ", err))

  await sendMail(order).catch(err => console.error("Error on sendMail: ", err))
}
