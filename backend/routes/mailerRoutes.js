import express from "express"
const router = express.Router()
import { getOrderToMailById } from "../controllers/mailerControllers.js"
import { protect } from "../middleware/authMiddleware.js"

// "/api/mailer"
router //
  .route("/:id")
  .get(protect, getOrderToMailById)

export default router
