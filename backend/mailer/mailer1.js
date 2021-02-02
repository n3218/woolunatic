import nodemailer from "nodemailer"
import xoauth2 from "xoauth2"
import { google } from "googleapis"

import dotenv from "dotenv"
dotenv.config()

const GMAIL_EMAIL = String(process.env.GMAIL_EMAIL)
const CLIENT_ID = String(process.env.GMAIL_CLIENT_ID)
const CLIENT_SECRET = String(process.env.GMAIL_CLIENT_SECRET)
const REDIRECT_URI = String(process.env.GMAIL_REDIRECT_URI)
const REFRESH_TOKEN = String(process.env.GMAIL_REFRESH_TOKEN)

console.log("GMAIL_EMAIL: ", GMAIL_EMAIL)
console.log("CLIENT_ID: ", CLIENT_ID)
console.log("CLIENT_SECRET: ", CLIENT_SECRET)
console.log("REDIRECT_URI: ", REDIRECT_URI)
console.log("REFRESH_TOKEN: ", REFRESH_TOKEN)

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    const mailOptions = {
      from: `WOOLUNATICS <${process.env.GMAIL_EMAIL}>`,
      to: "natalia@tsigelnik.com",
      subject: "Sending email using MailerJS",
      text: `Hello World from Nodemailer`,
      text: `<h1>Hello World</h1> from Nodemailer`
    }

    const result = await transport.sendMail(mailOptions)
    return result
  } catch (err) {
    return err
  }
}

sendMail()
  .then(result => console.log("Email sent... ", result))
  .catch(error => console.error("Error accurred... ", error))
