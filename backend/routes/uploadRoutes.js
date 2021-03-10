import express from "express"
import Multer from "multer"
import { uploadBulkImages, uploadProductImages, deleteImages } from "../controllers/uploadControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js"
import { Storage } from "@google-cloud/storage"
import sharp from "sharp"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY
  }
})

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
})

const bucket = storage.bucket(process.env.GCLOUD_BUCKET)

// "/api/upload"
router //
  .route("/")
  .get((req, res) => {
    res.render("index")
  })
  .post(protect, admin, multer.array("image", 10), async (req, res) => {
    await Promise.all(
      req.files.map(async file => {
        const newFilePath = `${process.env.GCLOUD_STORAGE_URL}/${process.env.GCLOUD_BUCKET}`

        const blobAction = async (size, fi) => {
          const blob = bucket.file(`${size}/${file.originalname}`)
          const blobStream = blob.createWriteStream()
          await blobStream
            .on("error", err => console.log("Error on blobStream.on: ", err))
            .on("finish", () => {
              const publicUrl = `${newFilePath}/${blob.name}`
              const imageDetails = fi
              imageDetails.image = publicUrl
              console.log("imageDetails: ", imageDetails)
              return imageDetails
            })
            .end(fi.buffer)
        }
        blobAction("fullsize", file)

        await sharp(file.buffer) //
          .resize(250, 250)
          .toFormat("jpeg")
          .jpeg({ quality: 80 })
          .toBuffer((err, data, info) => {
            if (err) {
              console.log("Error on thumbs: ", err)
              return err
            }
            const result = {
              ...info,
              buffer: data,
              originalname: file.originalname
            }
            return blobAction("thumbs", result)
          })

        await sharp(file.buffer) //
          .resize(80, 80)
          .toFormat("jpeg")
          .jpeg({ quality: 80 })
          .toBuffer((err, data, info) => {
            if (err) {
              console.log("Error on minithumbs: ", err)
              return err
            }
            const result = {
              ...info,
              buffer: data,
              originalname: file.originalname
            }
            return blobAction("minithumbs", result)
          })
      })
    )
      .then(results => {
        console.log("results: ", results)
        res.json(req.files)
      })
      .catch(err => {
        console.error("Error on uploading Images: ", err)
        res.status(404)
        throw new Error("Problem with uploading Images")
      })
  })

router //
  .route("/bulk")
  .post(protect, admin, multer.array("image", 100), uploadBulkImages)
  .delete(protect, admin, deleteImages)

export default router
