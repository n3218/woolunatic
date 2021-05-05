import nodemailer from "nodemailer"
import asyncHandler from "express-async-handler"
import dotenv from "dotenv"
import { footer, itemRow, shippingDetails, userButtons } from "./mailComponents.js"

dotenv.config()

export const sendOrderShipmentConfirmation = asyncHandler(async orderData => {
  const order = new Object(orderData)
  const OUGOING_ORDERS_EMAIL = process.env.OUGOING_ORDERS_EMAIL
  const OUGOING_ORDERS_PASSWORD = process.env.OUGOING_ORDERS_PASSWORD
  const DOMAIN_NAME = String(process.env.DOMAIN_NAME)

  const ORDERS_EMAIL = process.env.ORDERS_EMAIL

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: OUGOING_ORDERS_EMAIL,
      pass: OUGOING_ORDERS_PASSWORD
    }
  })

  const mailOptions = {
    from: `YarnStore Shipping <${ORDERS_EMAIL}>`,
    to: `${order.user.email}`,
    subject: `Order #${order.orderId} shipped!`,
    envelope: {
      from: `YarnStore <${ORDERS_EMAIL}>`, // used as MAIL FROM: address for SMTP
      to: `${order.user.email}` // used as RCPT TO: address for SMTP
    },
    html: `
    <div style="color: #373a3c; font-family: 'Source Sans Pro',Roboto,'Helvetica Neue',Arial,sans-serifs; font-weight: 300; background-color: #f7f7f7; padding: 20px;">
      <div style="max-width: 500px; margin: 0px auto; background-color: white; padding: 16px;">
        <div style="font-size: 20px; line-height: 2; font-weight: 800; margin-bottom: 30px;" align="left">
          <a href="${DOMAIN_NAME}" style="text-decoration:none; color:#417d97; font-weight: 600;" target="_blank" rel="noreferrer">
            YarnStore
          </a>
          <a href="${DOMAIN_NAME}" rel="noreferrer" target="_blank"><img alt="YarnStore" src="${DOMAIN_NAME}/assets/logo.png" height="80" width="80" align="right" /></a>
        </div>
        <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">
          Your order <a href="${DOMAIN_NAME}/orders/${order._id}" style="text-decoration:none; color:#417d97; font-weight: 600;" target="_blank" rel="noreferrer">#${order.orderId}</a> on its way!
        </div>
        ${
          order.shippingAddress.shippingOption.shippingCode &&
          `
            <div style="font-size: 18px; font-weight: 600; margin-top: 30px;">Track & Trace Number:</div>
            <div style="font-size: 18px; margin-bottom: 30px;">${order.shippingAddress.shippingOption.shippingCode}</div>
          `
        }
        ${
          order.shippingAddress.shippingOption.shippingLink &&
          `
            <div style="text-align:center;">  
              <div style="padding:1rem 3rem; margin-bottom: 30px; margin-top: 30px; text-align:center; background-color:#81869c">
                <a href="${order.shippingAddress.shippingOption.shippingLink}" style="color:#f0f3f7; text-decoration:none;" target="_blank" rel="noreferrer">
                  Track Package
                </a>
              </div>
            </div>
          `
        }
        <hr style="border-top: 2px solid #e2e4e8;" />
        ${shippingDetails(order)}
        <hr style="border-top: 2px solid #e2e4e8;" />

        <div>
          <div style="font-size: 18px; font-weight: 300; margin: 10px 0px;" align="left">
            ORDER DETAILS (total ${order.orderItems.length} items):
          </div>
          <table style="width: 100%; border: 1px solid #e2e4e8; font-size: 11px; font-weight: 300;">
            <tbody>
              ${order.orderItems.map(item => itemRow(item))}
            </tbody>
          </table>
        </div>

        ${userButtons(order)} 

      </div>
    </div>
    ${footer}
    `
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return error
    } else {
      console.log("Email with order shipment confirmation sent... " + info.response)
      return info.response
    }
  })
})
