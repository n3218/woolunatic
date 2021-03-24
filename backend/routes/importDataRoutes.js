import path from "path"
import express from "express"
import multer from "multer"
import csv from "fast-csv"
import Product from "../models/productModel.js"

const router = express.Router()

const storage = multer.memoryStorage()

function checkFileType(file, cb) {
  const filetypes = /csv/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  console.log("path.extname(file.originalname).toLowerCase(): ", path.extname(file.originalname).toLowerCase())
  console.log("file.mimetype: ", file.mimetype)
  console.log("extname: ", extname)
  console.log("mimetype: ", mimetype)
  if (extname || mimetype) {
    console.log("checkFileType: File type is CSV.")
    return cb(null, true)
  } else {
    console.log("checkFileType: Did not pass filter.")
    return cb("Csv only!")
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    console.log("go to checkFileType. ")
    checkFileType(file, cb)
  }
})

// "/api/importdata"
router.post("/", upload.single("csv-file"), async (req, res) => {
  console.log("req.file: ", req.file)
  let totalRows = 0
  let updatedProducts = 0
  let newlyAddedProducts = 0

  const stream = csv
    .parse({ headers: true })
    .on("error", error => console.error(error))
    .on("data", async row => {
      let newData = {}
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
        newData.price = Number(row.price.replace(/[,]+/g, ".").replace(/[ €Ū]+/g, ""))
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
      if (Number(row.novelty) === 1 || String(row.novelty).toLowerCase() === "yes") {
        newData.novelty = true
      } else {
        newData.novelty = false
      }
      if (Number(row.regular) === 1 || String(row.regular).toLowerCase() === "yes") {
        newData.regular = true
      } else {
        newData.regular = false
      }
      if (Number(row.inSale) === 1 || String(row.inSale).toLowerCase() === "yes") {
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

      let product = await Product.findOne({ brand: row.brand, name: row.name, color: row.color })
      if (product) {
        product.art = newData.art || product.art
        product.colorWay = newData.colorWay || product.colorWay
        product.category = newData.category || product.category
        product.meterage = newData.meterage || product.meterage
        product.fibers = newData.fibers || product.fibers
        product.price = newData.price || product.price
        product.nm = newData.nm || product.nm
        product.minimum = newData.minimum || product.minimum
        product.novelty = newData.novelty
        product.regular = newData.regular
        product.inSale = newData.inSale
        product.outOfStock = newData.outOfStock || product.outOfStock
        product.inStock = newData.inStock || product.inStock
        product.user = `5fc6e1458fa9f7a30eaf05ec`

        let result = await product.save()
        if (result) {
          updatedProducts++
        } else {
          res.status(400)
          throw new Error({ message: "Can not updated Product" })
        }
      } else {
        console.log("newData.name, newData.brand, newData.color: ", newData.name, newData.brand, newData.color)
        let newProduct = await Product.create(newData)
        if (newProduct) {
          newlyAddedProducts++
        } else {
          res.status(400)
          throw new Error({ message: "Can not save New Product" })
        }
      }
      if (updatedProducts + newlyAddedProducts === totalRows) {
        console.log("Updated totalRows, updatedProducts, newlyAddedProducts: ", totalRows, updatedProducts, newlyAddedProducts)
        res.json({ success: true, fileName: req.file.originalname, updatedProducts, newlyAddedProducts, totalRows })
      }
    })
    .on("end", async rowCount => {
      totalRows = rowCount
    })
  stream.write(req.file.buffer)
  stream.end()
})

export default router
