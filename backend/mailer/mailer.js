import nodemailer from "nodemailer"
import { json } from "express"
import dotenv from "dotenv"
dotenv.config()

export const sendMail = async orderData => {
  const order = new Object(orderData)
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
    <td style="text-align: center;">
      <a target="_blank" rel="noreferrer" href="https://woolunatic.herokuapp.com/products/${item.product}" style="text-decoration:none; color:#417d97; font-weight: bold">
        ${item.art}
      </a>
    </td>
    <td style="text-align: center;">${item.brand}</td>
    <td style="text-align: center;">${item.name}</td>
    <td style="text-align: center;">${item.color.replace(/_+/g, " ")}</a></td>
    <td style="text-align: center;">${item.fibers}</td>
    <td style="text-align: center;">${item.qty}</td>
    <td style="text-align: center;">${item.meterage}</td>
    <td style="text-align: center;">€${item.price}</td>
    <td style="text-align: center;">€${(item.qty * item.price) / 100}</td>
  </tr>`
  }

  const badges = {
    paid: "#3fb618",
    expired: "#81869c",
    canceled: "#a44a55",
    COMPLETED: "#3fb618"
  }

  const mailOptions = {
    from: `WOOLUNATICS <${GMAIL_EMAIL}>`,
    to: `${order.user.email}`,
    subject: `Your Woolunatics Order #${order._id}`,
    text: `Hello World from Nodemailer`,
    html: `
    <div style="color: #373a3c; font-family: 'Source Sans Pro',Roboto,'Helvetica Neue',Arial,sans-serifs; font-weight: 300; background-color: #f7f7f7; padding: 20px;">
      <div style="max-width: 700px; margin: 0px auto; background-color: white; padding: 16px;">
        <div style="font-size: 30px; line-height: 2; font-weight: 800; margin-bottom: 30px;" align="left">
          <a href="https://woolunatic.herokuapp.com" rel="noreferrer" target="_blank"><img style="height: 70px;" alt="Woolunatics.NL" src="https://woolunatic.herokuapp.com/assets/logo.png" /></a>
        </div>
        <div style="font-size: 20px; margin-bottom: 10px;">
          <a href="https://woolunatic.herokuapp.com/orders/${order._id}" style="text-decoration:none; color:#417d97; font-weight: 600;" target="_blank" rel="noreferrer">#${order._id}</a>
        </div>
        <div style="font-size: 18px; font-weight: 300; margin-bottom: 10px;">Order confirmation</div>
        <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">Hello ${order.user.name}</div> 
        <div style="font-size: 16px; font-weight: 300; margin-bottom: 30px;">Just to let you know, we've received your order. Thanks for shopping with us.</div>
        
        <hr style="border-top: 2px solid #81869c;" />

        <div>
          <div style="font-size: 18px; font-weight: 300;" align="left">PAYMENT DETAILS:</div>
          <div align="right">
            <table>
              <tbody>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">placed: </td><td style="font-size: 12px; font-weight: 300;"> ${new Date(order.createdAt).toString().substring(0, 21)}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">paid: </td><td style="font-size: 12px; font-weight: 300;"> ${new Date(order.paidAt).toString().substring(0, 21)}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">payment ID: </td><td style="font-size: 12px; font-weight: 300;"> ${order.paymentResult.id}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">payment method: </td><td style="font-size: 12px; font-weight: 300;"> ${order.paymentMethod}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">payment status: </td><td style="font-size: 12px; font-weight: 300;"> 
                  <div style="background-color:${badges[order.paymentResult.status]}; padding: 2px; color: white; text-transform:uppercase; display:inline-block">${order.paymentResult.status}</div>
                </td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr style="border-top: 2px solid #81869c;" />

        <div>
          <div style="font-size: 18px; font-weight: 300;" align="left">SHIPPING DETAILS:</div>
          <div align="right">
            <table>
              <tbody>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">name: </td><td style="font-size: 12px; font-weight: 300;"> ${order.user.name}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">address: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.address}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">city: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.city}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">zipcode: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.zipCode}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">country: </td><td style="font-size: 12px; font-weight: 300;"> ${order.shippingAddress.country}</td></tr>
                <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">email: </td><td style="font-size: 12px; font-weight: 300; text-decoration:none; color:#417d97"> ${order.user.email}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr style="border-top: 2px solid #81869c;" />

        <div>
          <div style="font-size: 18px; font-weight: 300; margin-bottom: 20px;" align="left">ORDER DETAILS (total ${order.orderItems.length} items):</div>
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
        </div>
        <div align="right" style="padding-top: 10px; padding-bottom: 20px; background-color: #f7f7f7;">

          <table cellspacing="0" style="margin-right:15px">
            <tbody>
              <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">items weight: </td><td style="font-size: 12px; font-weight: 300;"> ${order.itemsWeight}g</td></tr>
              <tr><td style="padding-bottom: 10px; text-align: right; font-size: 12px; font-weight: 300;">estimated total weight: </td><td style="padding-bottom: 10px; font-size: 12px; font-weight: 300;"> ${order.totalWeight}g</td></tr>
            </tbody>
          </table>

          <hr style="border-top: 2px solid #e2e4e8;" />
              
          <table cellspacing="0" style="margin-right:15px">
            <tbody>
              <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">items price: </td><td style="font-size: 12px; font-weight: 300;"> €${order.itemsPrice.toFixed(2)}</td></tr>
              <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">taxes: </td><td style="font-size: 12px; font-weight: 300;"> €${order.taxPrice.toFixed(2)}</td></tr>
              <tr><td style="text-align: right; font-size: 12px; font-weight: 300;">shipping price: </td><td style="font-size: 12px; font-weight: 300;"> €${order.shippingPrice.toFixed(2)}</td></tr>
              <tr><td style="text-align: right; font-size: 16px; font-weight: 600; height: 30px;">total price: </td><td style="font-size: 16px; font-weight: 600; height: 30px;"> €${order.totalPrice.toFixed(2)}</td></tr>
            </tbody>
          </table>

          <hr style="border-top: 2px solid #e2e4e8;" />

          <div align="center">
            <table cellpadding="15">
              <tbody>
                <tr>
                  <td style="width:50%"><div style="width:100%; padding:10px; text-align:center; background-color:#81869c"><a href="https://woolunatic.herokuapp.com/orders/${order.id}" style="color:#f0f3f7; text-decoration:none" target="_blank" rel="noreferrer">Go to your Order</a></div></td>
                  <td style="width:50%"><div style="width:100%; padding:10px; text-align:center; background-color:#56556e"><a href="https://woolunatic.herokuapp.com/profile" style="color:#f0f3f7; text-decoration:none" target="_blank" rel="noreferrer">Go to your Profile</a></div></td>
                </tr>
              </tbody>
            </table>  
          </div>          
        </div>
      </div>
    </div>
    <footer style="background-color:#81869c; color: #f0f3f7; padding:30px;" align="center">
      <div>Copyright © Woolunatics 2021</div>
      <div><a href="mailto: woolunatics.nl@google.com" style="text-decoration:none; color:#f0f3f7" target="_blank" rel="noreferrer">woolunatics.nl@google.com</a></div>
      <div><small>Groningen, Netherlands</small></div>
    </footer>
    `
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return error
    } else {
      console.log("Email sent... " + info.response)
      return info.response
    }
  })
}
