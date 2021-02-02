import nodemailer from "nodemailer"
import { json } from "express"
import dotenv from "dotenv"
dotenv.config()

export const sendMail = async orderData => {
  const order = new Object(orderData)
  console.log("typeof order: ", typeof order)
  console.log("===================sendMail:order: ", order)

  const GMAIL_EMAIL = process.env.GMAIL_EMAIL
  const GMAIL_PASSWORD = String(process.env.GMAIL_PASSWORD)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_PASSWORD
    }
  })
  const row = item => {
    return `<tr style="border: 1px solid #9AABBD;">
    <td style="text-align: center;">${item.art}</td>
    <td style="text-align: center;">${item.brand}</td>
    <td style="text-align: center;">
    ${item.name}
    </td>
    <td style="text-align: center;">
      <a target="_blank" href='https://woolunatic.herokuapp.com/products/${item.product}'>${item.color.replace(/_+/g, " ")}</a>
    </td>
    <td style="text-align: center;">${item.fibers}</td>
    <td style="text-align: center;">${item.qty}</td>
    <td style="text-align: center;">${item.meterage}</td>
    <td style="text-align: center;">€${item.price}</td>
    <td style="text-align: center;">€${(item.qty * item.price) / 100}</td>
  </tr>`
  }

  const mailOptions = {
    from: `WOOLUNATICS <${GMAIL_EMAIL}>`,
    to: `${order.user.email}`,
    subject: `Your Woolunatics Order #${order._id}`,
    text: `Hello World from Nodemailer`,
    html: `<div style="color: #373a3c; font-family: 'Source Sans Pro',Roboto,'Helvetica Neue',Arial,sans-serifs; font-weight: 300;">
    <div style="font-size: 30px; line-height: 2; font-weight: 800;" align="left">WOOLUNATICS</div>
    <div style="font-size: 20px; line-height: 2;" align="right">Order confirmation</div>
    <hr style="border-top: 1px solid #CFDAE8;" />

      <div style="font-size: 18px; font-weight: 300;">Hello ${order.user.name}</div> 
      <div style="font-size: 14px; font-weight: 300;">Thank you for shopping with us!</div>


      <div align="right">
        <table>
          <tbody>
            <tr><td style="text-align: right; font-size: 14px; font-weight: 300;">placed: </td><td style="text-align: right; font-size: 14px; font-weight: 300;"> ${new Date(order.createdAt).toString().substring(0, 21)}</td></tr>
            <tr><td style="text-align: right; font-size: 14px; font-weight: 300;">paid: </td><td style="text-align: right; font-size: 14px; font-weight: 300;"> ${new Date(order.paidAt).toString().substring(0, 21)}</td></tr>
            <tr><td style="text-align: right; font-size: 14px; font-weight: 300;">payment ID: </td><td style="text-align: right; font-size: 14px; font-weight: 300;"> ${order.paymentResult.id}</td></tr>
            <tr><td style="padding-bottom: 10px; text-align: right; font-size: 14px; font-weight: 300;">payment Method: </td><td style="padding-bottom: 10px; text-align: right; font-size: 14px; font-weight: 300;"> ${order.paymentMethod}</td></tr>
          </tbody>
        </table>
      </div>
      <div style="font-size: 20px;">Order #${order._id}</div>
      <table style="width: 100%; border: 2px solid gray; font-weight: 300;">
        <thead>
          <tr style="border-bottom: 2px solid gray; height: 24px;">
            <th><i>art.</i></th>
            <th><i>brand</i></th>
            <th><i>name</i></th>
            <th><i>color</i></th>
            <th><i>fibers,%</i></th>
            <th><i>weight,g</i></th>
            <th><i>m/100gr</i></th>
            <th><i>€/100gr</i></th>
            <th><i>price</i></th>
          </tr>
        </thead>
        <tbody>
        ${order.orderItems.map(item => row(item))}
        <tr style="height: 30px;"></tr>
        </tbody>
      </table>
      <div align="right" style="padding-top: 10px;">
        <table cellspacing="0">
          <tbody>
            <tr><td style="text-align: right; font-size: 14px; font-weight: 300;">Items Price: </td><td style="text-align: right; font-size: 14px; font-weight: 300;"> €${order.orderItems.reduce((res, el) => res + (el.price * el.qty) / 100, 0).toFixed(2)}</td></tr>
            <tr><td style="text-align: right; font-size: 14px; font-weight: 300;">Taxes: </td><td style="text-align: right; font-size: 14px; font-weight: 300;"> €${order.taxPrice.toFixed(2)}</td></tr>
            <tr><td style="padding-bottom: 10px; text-align: right; font-size: 14px; font-weight: 300;">Shipping Price: </td><td style="padding-bottom: 10px; text-align: right; font-size: 14px; font-weight: 300;"> €${order.shippingPrice.toFixed(2)}</td></tr>
            <tr><td style="border-top: 2px solid gray; text-align: right; font-size: 16px; font-weight: 600; height: 30px;">Total Price: </td><td style=" border-top: 2px solid gray; text-align: right; font-size: 16px; font-weight: 600; height: 30px;"> €${order.totalPrice.toFixed(2)}</td></tr>
          </tbody>
        </table>
      </div>
      <hr style="border-top: 1px solid #CFDAE8;" />
    </div>`
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent... " + info.response)
    }
  })
}
