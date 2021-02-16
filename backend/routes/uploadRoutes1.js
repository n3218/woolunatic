import path from "path"
import express from "express"
import multer from "multer"
import sharp from "sharp"

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/products/")
  },
  filename(req, file, cb) {
    console.log("file.fieldname: ", file.fieldname)
    // console.log("path.basename: ", path.basename())
    console.log("file.originalname: ", file.originalname)
    console.log("file: ", file)

    // cb(null, `1440x1440-${file.fieldname}`)
    // cb(null, `${file.fieldname}-${file.originalname}-${Date.now()}${path.extname(file.originalname)}`)
    cb(null, `${file.originalname}`)
  }
})

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png|webp/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb("Images only!")
//   }
// }

const upload = multer({
  storage
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb)
  // }
})

// changed
router //
  .post("/", upload.array("image", 100), (req, res) => {
    res.send(req.files)
  })

export default router
