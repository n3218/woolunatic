import express from "express"
import { createShipping, deleteShipping, getShippingById, getShippingList, updateShipping } from "../controllers/shippingControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"
const router = express.Router()

// "/api/shippings"
router //
  .route("/")
  .post(protect, admin, createShipping)
  .get(getShippingList)

router //
  .route("/:id")
  .get(getShippingById)
  .put(protect, admin, updateShipping)
  .delete(protect, admin, deleteShipping)

export default router
