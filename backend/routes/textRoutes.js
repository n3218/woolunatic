import express from "express"
import { getTexts, getTextById, updateText, createText, getTextByUrl, deleteText } from "../controllers/textControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"
const router = express.Router()

// "/api/texts"
router //
  .route("/")
  .get(getTexts)
  .post(protect, admin, createText)

router //
  .route("/:id")
  .get(getTextById)
  .put(protect, admin, updateText)
  .delete(protect, admin, deleteText)

router //
  .route("/url/:url")
  .get(getTextByUrl)

export default router
