import express from "express"
import { getCart, addItemToCart, removeItemFromCart, startCheckout } from "../controllers/cartControllers.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

// "/api/cart"
router //
  .route("/")
  .post(protect, addItemToCart)

router //
  .route("/startcheckout")
  .put(protect, startCheckout)

router //
  .route("/:userId")
  .post(protect, getCart)
  .put(protect, removeItemFromCart)

export default router
