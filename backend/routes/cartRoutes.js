import express from "express"
const router = express.Router()
import { getCart, addItemToCart, removeItemFromCart, startCheckout } from "../controllers/cartControllers.js"
import { getShipping } from "../controllers/shippingControllers.js"
import { protect } from "../middleware/authMiddleware.js"

// "/api/cart"
router //
  .route("/")
  .post(protect, addItemToCart)

router //
  .route("/startcheckout")
  .put(protect, startCheckout)

router //
  .route("/shipping")
  .get(protect, getShipping)

router //
  .route("/:id")
  .get(protect, getCart)
  .put(protect, removeItemFromCart)

export default router
