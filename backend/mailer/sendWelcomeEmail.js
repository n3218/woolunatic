import nodemailer from "nodemailer"
import asyncHandler from "express-async-handler"
import dotenv from "dotenv"
import { footer } from "./mailComponents.js"

dotenv.config()

export const sendWelcomeEmail = asyncHandler(async email => {
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
    from: `YarnShop registration <${ORDERS_EMAIL}>`,
    to: email,
    subject: `Welcome to YarnShop!`,
    envelope: {
      from: `YarnShop <${ORDERS_EMAIL}>`, // used as MAIL FROM: address for SMTP
      to: email // used as RCPT TO: address for SMTP
    },
    html: `
    <div style="color: #373a3c; font-family: 'Source Sans Pro',Roboto,'Helvetica Neue',Arial,sans-serifs; font-weight: 300; background-color: #f7f7f7; padding: 20px;">
      <div style="max-width: 700px; margin: 0px auto; background-color: white; padding: 16px;">
        <div style="font-size: 20px; line-height: 2; font-weight: 800; margin-bottom: 30px;" align="left">
          <a href="${DOMAIN_NAME}" style="text-decoration:none; color:#417d97; font-weight: 600;" target="_blank" rel="noreferrer">
            YarnShop
          </a>
          <a href="${DOMAIN_NAME}" rel="noreferrer" target="_blank"><img alt="YarnShop" src="${DOMAIN_NAME}/assets/logo.png" height="80" width="80" align="right" /></a>
        </div>
        <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px; margin-top: 30px;">Registration confirmation</div>
        <div style="font-size: 18px; font-weight: 300; margin-bottom: 10px;">Hello!</div> 
        <div style="font-size: 16px; font-weight: 300; margin-bottom: 30px;">We are excited to welcome you on YarnShop!</div>


        <div style="display:flex; flex-direction: row; flex-wrap: wrap; justify-content: center;">
        <div style="padding:10px 30px; margin: 10px 20px 0px 20px; text-align:center; background-color:#81869c"><a href="${DOMAIN_NAME}/yarns" style="color:#f0f3f7; text-decoration:none; font-size: 12px; font-weight: 300;" target="_blank" rel="noreferrer">Go shopping</a></div>
        <div style="padding:10px 30px; margin: 10px 20px 0px 20px; text-align:center; background-color:#56556e"><a href="${DOMAIN_NAME}/profile" style="color:#f0f3f7; text-decoration:none; font-size: 12px; font-weight: 300;" target="_blank" rel="noreferrer">Go to your Profile</a></div>
      </div>
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
      console.log("Email with password reset link sent... " + info.response)
      return info.response
    }
  })
})
