import path from "path"
import express from "express"
import multer from "multer"
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/imports")
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

function checkFileType(file, cb) {
  console.log("checkFileType")
  const filetypes = /csv/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb("Csv only!")
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log("csvUploadRoutes.const.upload")
    checkFileType(file, cb)
  }
})

router //
  .post("/", upload.single("csv-file"), (req, res) => {
    console.log("req.file: ", req.file)
    res.send(`/${req.file.path}`)
  })

export default router
