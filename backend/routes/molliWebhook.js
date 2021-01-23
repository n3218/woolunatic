import express from "express"

import bodyParser from "body-parser"
const router = express.Router()

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

import { mollieWebHook } from "../controllers/orderControllers.js"

router.route("/id").post(mollieWebHook)

export default router
