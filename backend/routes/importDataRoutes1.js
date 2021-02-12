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
  //
  //
  const newProducts = []
  const newProductsMap = {}
  // console.log("+++++++++++++++++++decoded: ", decoded) // ?
  //
  //
  fs.createReadStream(req.file.path)
    .pipe(csv.parse({ headers: true }))
    .on("error", error => console.error(error))
    .on("data", async row => {
      let identifier = row.brand + "_" + row.name + "_" + row.color
      const exists = await Product.findOne({ brand: row.brand, name: row.name, color: row.color })
      if (!exists) {
        console.log("Inserting new Product: ", row.brand + row.name + row.color)
        let newProduct = {
          art: row.art,
          brand: row.brand,
          name: row.name,
          color: row.color,
          colorWay: row.colorWay,
          category: row.category,
          meterage: Number(row.meterage),
          fibers: row.fibers,
          price: Number(row.price.replace(/[ €]+/g, "")),
          nm: row.nm,
          novelty: row.novelty,
          inSale: row.inSale,
          regular: row.regular,
          minimum: Number(row.minimum) | 0,
          inStock: row.inStock,
          novelty: Boolean(row.novelty) | false,
          regular: Boolean(row.regular) | false,
          inSale: Boolean(row.inSale) | false,
          user: `5fc6e1458fa9f7a30eaf05ec`
        }
        if (newProductsMap[identifier]) {
          newProductsMap[identifier].inStock = newProductsMap[identifier].inStock + "," + newProduct.inStock
        } else {
          newProductsMap[identifier] = newProduct
        }
        await Product.create(newProducts)
      } else {
        let updateArt
        if (exists.art.includes(row.art)) {
          updateArt = row.exists
        } else {
          updateArt = exists.art + "," + row.art
        }
        let updateProduct = {
          art: updateArt,
          brand: row.brand,
          name: row.name,
          color: row.color,
          colorWay: row.colorWay | exists.colorWay,
          category: row.category | exists.category,
          meterage: Number(row.meterage) | exists.meterage,
          fibers: row.fibers | exists.fibers,
          price: Number(row.price.replace(/[ €]+/g, "")) | exists.price,
          nm: row.nm | exists.nm,
          novelty: row.novelty | exists.novelty,
          inSale: row.inSale | exists.inSale,
          regular: row.regular | exists.regular,
          minimum: Number(row.minimum) | exists.regular,
          // inStock: exists.inStock + "," + row.inStock,
          inStock: row.inStock | exists.inStock,
          novelty: Boolean(row.novelty) | exists.novelty,
          regular: Boolean(row.regular) | exists.regular,
          inSale: Boolean(row.inSale) | exists.inSale,
          user: `5fc6e1458fa9f7a30eaf05ec`
        }
        console.log("Updating existing Product: ", row.brand + row.name + row.color)
        newProductsMap[identifier] = { ...updateProduct }
      }
    })
    .on("end", async rowCount => {
      console.log("newProductsMap: ")
      Object.keys(newProductsMap).map(key => newProducts.push(newProductsMap[key]))
      console.log("newProducts: ")
      console.log("Created new products: ", newProducts.length)
      // await Product.updateMany({ _id: { $in: ids } }, newProducts)
      result = await Product.insertMany(newProducts)
      console.log(`Parsed ${rowCount} rows`)
      // console.log(decoded) // ?
    })
  //
  //
  // console.log("newProducts.length: ", newProducts.length)
  // console.log("req.file.path: ", req.file.path)
  // console.log("rowCount: ", rowCount)
  res.json({ success: true, fileName: req.file.path })
})

export default router
