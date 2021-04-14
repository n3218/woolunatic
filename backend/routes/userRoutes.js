import express from "express"
const router = express.Router()
import {
  registerUser, //
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  sendLinkToResetPassword,
  resetPassword
} from "../controllers/userControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"

// "/api/users"
router //
  .route("/")
  .post(registerUser)
  .get(protect, admin, getUsers)
router //
  .post("/login", authUser)
router //
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router //
  .route("/forgotpassword")
  .post(sendLinkToResetPassword)
router //
  .route("/resetpassword/:userId/:token")
  .post(resetPassword)
router //
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser)

export default router
