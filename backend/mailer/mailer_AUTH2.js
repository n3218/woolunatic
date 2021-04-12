import dotenv from "dotenv"
dotenv.config()
import nodemailer from "nodemailer"
import xoauth2 from "xoauth2"
import { google } from "googleapis"
const OAuth2 = google.auth.OAuth2

const EMAIL = String(process.env.EMAIL)
const CLIENT_ID = String(process.env.GMAIL_CLIENT_ID)
const CLIENT_SECRET = String(process.env.GMAIL_CLIENT_SECRET)
const REDIRECT_URI = String(process.env.GMAIL_REDIRECT_URI)
const REFRESH_TOKEN = String(process.env.GMAIL_REFRESH_TOKEN)

console.log("EMAIL: ", EMAIL)
console.log("CLIENT_ID: ", CLIENT_ID)
console.log("CLIENT_SECRET: ", CLIENT_SECRET)
console.log("REDIRECT_URI: ", REDIRECT_URI)
console.log("REFRESH_TOKEN: ", REFRESH_TOKEN)

const createTransporter = async () => {
  const oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, "https://developers.google.com/oauthplayground")

  oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(")
      }
      resolve(token)
    })
  })

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      accessToken,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      redirect_uris: ["http://localhost"],
      javascript_origins: ["http://localhost"]
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  return transporter
}

export const sendMail = async order => {
  const mailOptions = {
    from: `WOOLUNATICS <${process.env.OUGOING_ORDERS_EMAIL}>`,
    to: "natalia@tsigelnik.com",
    subject: "Sending email using MailerJS",
    text: `Hello World from Nodemailer`,
    html: `<h1>Hello World</h1> from Nodemailer`
  }

  try {
    let emailTransporter = await createTransporter()
    const result = await emailTransporter
      .sendMail(mailOptions)
      .then(result => console.log("Email sent... ", result))
      .catch(error => console.error("Error accurred... ", error))
    return result
  } catch (err) {
    return err
  }
}

// sendMail()
//   .then(result => console.log("Email sent... ", result))
//   .catch(error => console.error("Error accurred... ", error))
