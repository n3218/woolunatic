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
    cb(null, `data-${new Date().toISOString().slice(0, 13)}${path.extname(file.originalname)}`)
  }
})

function checkFileType(file, cb) {
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

router.post("/", upload.single("csv-file"), async (req, res) => {
  console.log("req.file: ", req.file)
  const newProductsMap = {}
  let rows = 0
  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ headers: true }))
    .on("error", error => console.error(error))
    .on("data", row => {
      let identifier = row.brand.trim() + "_" + row.name.trim() + "_" + row.color.trim()
      const newData = {}
      if (row.art) {
        newData.art = row.art.trim()
      }
      if (row.brand) {
        newData.brand = row.brand.trim()
      }
      if (row.name) {
        newData.name = row.name.trim()
      }
      if (row.color) {
        newData.color = row.color.trim()
      }
      if (row.colorWay) {
        newData.colorWay = row.colorWay.trim()
      }
      if (row.category) {
        newData.category = row.category.trim()
      }
      if (row.meterage) {
        newData.meterage = Number(row.meterage)
      }
      if (row.fibers) {
        newData.fibers = row.fibers.trim()
      }
      if (row.price) {
        newData.price = Number(row.price.replace(/[ €]+/g, ""))
      }
      if (row.nm) {
        newData.nm = row.nm.trim()
      }
      if (row.minimum) {
        newData.minimum = Number(row.minimum) | 0
      }
      if (row.inStock) {
        newData.inStock = row.inStock.trim()
      }
      if (Number(row.novelty) === 1) {
        newData.novelty = true
      } else {
        newData.novelty = false
      }
      if (Number(row.regular) === 1) {
        newData.regular = true
      } else {
        newData.regular = false
      }
      if (Number(row.inSale) === 1) {
        newData.inSale = true
      } else {
        newData.inSale = false
      }
      if (Number(row.outOfStock) === 1) {
        newData.outOfStock = true
      } else {
        newData.outOfStock = false
      }
      newData.user = `5fc6e1458fa9f7a30eaf05ec`

      if (newProductsMap[identifier]) {
        if (row.art) {
          newProductsMap[identifier].art = newProductsMap[identifier].art + "," + row.art.trim()
        }
        if (row.inStock) {
          newProductsMap[identifier].inStock = newProductsMap[identifier].inStock + "," + row.inStock.trim()
        }
      } else {
        newProductsMap[identifier] = newData
      }
      const filter = { brand: row.brand.trim(), name: row.name.trim(), color: row.color.trim() }
      const options = { upsert: true }
      const result = Product.findOneAndUpdate(filter, newProductsMap[identifier], options, (err, doc) => {
        if (err) return res.status(500).send({ message: err })
        console.log("++++++++++++++++++doc: ", doc)
      })
      // console.log("++++++++++++++++++result: ", result)
    })
    .on("end", async rowCount => {
      rows = rowCount
      console.log(`================================Parsed ${rowCount} rows`)
      res.json({ success: true, fileName: req.file.path, rows: rows })
    })
})

export default router
