import express from "express"
const router = express.Router()
import { addItemToCart } from "../controllers/cartControllers.js"
import { protect } from "../middleware/authMiddleware.js"

router //
  .route("/")
  .post(protect, addItemToCart)

export default router
