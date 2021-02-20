import express from "express"
import multer from "multer"
import { uploadBulkImages, uploadProductImages, deleteImages } from "../controllers/uploadControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/products/")
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

const multerFilter = async (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb("Please upload only images.", false)
  }
}

const upload = multer({
  storage,
  fileFilter: multerFilter
})

router //
  .route("/")
  .post(protect, admin, upload.array("image", 10), uploadProductImages)

router //
  .route("/bulk")
  .post(protect, admin, upload.array("image", 100), uploadBulkImages)
  .delete(protect, admin, deleteImages)

export default router
