import path from "path"
import express from "express"
import multer from "multer"
import fs from "fs"
import csv from "fast-csv"
import Product from "../models/productModel.js"

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

router.post("/", upload.single("csv-file"), (req, res) => {
  console.log("req.file: ", req.file)
  //
  //
  const newProducts = []
  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ headers: true }))
    .on("error", error => console.error(error))
    .on("data", row => {
      let newProduct = {
        // _id: row._id,
        art: row.art,
        brand: row.brand,
        name: row.name,
        color: row.color,
        colorWay: row.colorWay,
        category: row.category,
        meterage: Number(row.meterage),
        fibers: row.fibers,
        price: Number(row.price),

        image: row.image
          .replace(/[\'\[\]\"]+?/g, "")
          .split(",")
          .map(el => String(el.trim())),
        // reviews: [{ ...row.reviews.replace(/[\'\[\]]+?/g, "") }],
        rating: Number(row.rating),
        numReviews: Number(row.numReviews),
        minimum: Number(row.minimum),
        inStock: row.inStock
          .replace(/[\'\[\]\"]+?/g, "")
          .split(",")
          .map(el => Number(el.trim())),
        outOfStock: row.outOfStock === "FALSE" ? false : true,
        user: row.user,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        description: row.description
      }
      newProducts.push(newProduct)
    })
    .on("end", async rowCount => {
      // console.log("newProducts: ", newProducts)
      // await Product.updateMany({ _id: { $in: ids } }, newProducts)
      await Product.insertMany(newProducts)
      console.log(`Parsed ${rowCount} rows`)
    })
  //
  //
  res.send(`/${req.file.path}`)
})

export default router
