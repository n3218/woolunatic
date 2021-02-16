import path from "path"
import express from "express"
import multer from "multer"
import sharp from "sharp"
import Product from "../models/productModel.js"

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/products/")
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

// const multerStorage = multer.memoryStorage()

const multerFilter = async (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    // await sharp(file.buffer).resize(250, 250).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`thumb-${Date.now()}-${file.originalname}`)
    cb(null, true)
  } else {
    cb("Please upload only images.", false)
  }
}

const upload = multer({
  storage,
  fileFilter: multerFilter
})

// ------------------ new
// const uploadFiles = upload.array("image", 10)

// const uploadImages = (req, res, next) => {
//   console.log("req: ", req)
//   uploadFiles(req, res, err => {
//     console.log("req: ", req)

//     if (err instanceof multer.MulterError) {
//       if (err.code === "LIMIT_UNEXPECTED_FILE") {
//         console.error(err)
//         return res.send("Too many files to upload.")
//       }
//     } else if (err) {
//       return res.send(err)
//     }
//     next()
//   })
// }

// const resizeImages = async (req, res, next) => {
//   if (!req.files) return next()

//   req.body.images = []
//   await Promise.all(
//     req.files.map(async file => {
//       await sharp(file.buffer).resize(250, 250).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`uploads/thumbs/thumb-${file.originalname}`)
//       req.body.images.push(newFilename)
//     })
//   )

//   next()
// }

// const getResult = async (req, res) => {
//   if (req.body.images.length <= 0) {
//     return res.send(`You must select at least 1 image.`)
//   }
//   const images = req.body.images.map(image => "" + image + "").join("")
//   // res.send(req.files)
//   console.log(`Images were uploaded:${images}`)

//   return res.send(`Images were uploaded:${images}`)
// }

// router.post("/", uploadImages, resizeImages, getResult)

// ------------------ /new

router //
  .post("/", upload.array("image", 100), async (req, res) => {
    let productMap = {}
    const results = await Promise.all(
      req.files.map(async file => {
        console.log("Promise.all.file: ", file)
        await sharp(file.path).resize(250, 250).toFormat("jpeg").jpeg({ quality: 80 }).toFile(`${file.destination}../thumbs/thumb-${file.originalname}`)
        await sharp(file.path).resize(112, 112).toFormat("jpeg").jpeg({ quality: 80 }).toFile(`${file.destination}../minithumbs/minithumb-${file.originalname}`)
        if (file.originalname) {
          let productArt = file.originalname.split("-")[0]
          if (productMap[productArt]) {
            productMap[productArt].push(file.originalname)
          } else {
            productMap[productArt] = [file.originalname]
          }
          console.log("productMap: ", productMap)
        }
      })
    )
    if (results) {
      Object.keys(productMap).map(async key => {
        const filter = { art: key }
        const update = { $set: { image: productMap[key] } }
        await Product.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!")
          }
          console.log(doc)
        })
      })
    }
    res.send(req.files)
  })

export default router
