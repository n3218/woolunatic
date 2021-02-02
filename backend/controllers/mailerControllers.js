import dotenv from "dotenv"
import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"
import querystring from "querystring"
import colors from "colors"
import { createMollieClient } from "@mollie/api-client"
import { json } from "express"
dotenv.config()
import { sendMail } from "../mailer/mailer.js"

// @desc get Order To Mail By ID
// @route GET /api/mailer/:id
// @access Private
export const getOrderToMailById = asyncHandler(async (req, res) => {
  const order = await Order.findById("6018bb2e5211a9113edd8cc4").populate("user", "name email")
  if (order) {
    sendMail(order)
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})
