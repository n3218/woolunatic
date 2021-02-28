import express from "express"
const router = express.Router()

import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct, getTopProducts, removeItemsFromDB, deleteProductImage, deleteAllProducts } from "../controllers/productControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"

// "/api/products"
router //
  .route("/")
  .get(getProducts)
  .post(protect, admin, createProduct)
  .delete(protect, admin, deleteAllProducts)
router //
  .get("/top", getTopProducts)
router //
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router //
  .route("/:id/reviews")
  .post(protect, createProductReview)
router //
  .route("/removefromdb")
  .post(protect, admin, removeItemsFromDB)
router //
  .route("/deleteimage/:img")
  .delete(protect, admin, deleteProductImage)

export default router
