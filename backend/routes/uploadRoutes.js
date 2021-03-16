import express from "express"
import Multer from "multer"
import { uploadBulkImages, uploadProductImages, deleteImages } from "../controllers/uploadControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

// "/api/upload"
router //
  .route("/")
  .post(protect, admin, multer.array("image", 10), uploadProductImages)

router //
  .route("/bulk")
  .post(protect, admin, multer.array("image", 100), uploadBulkImages)
  .delete(protect, admin, deleteImages)

export default router
