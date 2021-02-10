import dotenv from "dotenv"
import Order from "../models/orderModel.js"
dotenv.config()
import { sendMail } from "../mailer/mailer.js"

// @desc get Order To Mail By ID
// @route GET /api/mailer/:id
// @access Private
export const getOrderToMailById = async orderId => {
  const order = await Order.findById(orderId).populate("user", "name email")
  if (order) {
    sendMail(order)
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
}
