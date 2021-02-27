import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"
import sharp from "sharp"
import fs from "fs"

// @desc   Upload Images for single Product
// @route  POST /api/upload/
// @access Private/+Admin
export const uploadProductImages = asyncHandler(async (req, res) => {
  const results = await Promise.all(
    req.files.map(async file => {
      console.log("Promise.all.file: ", file)
      let thumb = await sharp(file.path).resize(250, 250).toFormat("jpeg").jpeg({ quality: 80 }).toFile(`${file.destination}../thumbs/thumb-${file.originalname}`)
      let minithumb = await sharp(file.path).resize(112, 112).toFormat("jpeg").jpeg({ quality: 80 }).toFile(`${file.destination}../minithumbs/minithumb-${file.originalname}`)
      console.log("thumb, minithumb: ", thumb, minithumb)
      return { file, thumb, minithumb }
    })
  )
  if (results) {
    console.log("results: ", results)
    res.json(req.files)
  } else {
    res.status(404)
    throw new Error("Problem with uploading Images")
  }
})

// @desc   Upload Bulk Images and connecting to Products
// @route  POST /api/upload/bulk
// @access Private/+Admin
export const uploadBulkImages = asyncHandler(async (req, res) => {
  let productMap = {}
  const results = await Promise.all(
    req.files.map(async file => {
      await sharp(file.path).resize(250, 250).toFormat("jpeg").jpeg({ quality: 80 }).toFile(`${file.destination}../thumbs/thumb-${file.originalname}`)
      await sharp(file.path).resize(112, 112).toFormat("jpeg").jpeg({ quality: 80 }).toFile(`${file.destination}../minithumbs/minithumb-${file.originalname}`)
      if (file.originalname) {
        let productArt = file.originalname.split("-")[0]
        if (productMap[productArt]) {
          productMap[productArt].push(file.originalname)
        } else {
          productMap[productArt] = [file.originalname]
        }
      }
    })
  )
  if (results) {
    const updatedProducts = await Promise.all(
      Object.keys(productMap).map(async key => {
        const filter = { art: key }
        const update = { $set: { image: productMap[key] } }
        return await Product.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
          if (err) {
            console.log("Something wrong when updating data!")
          }
          return doc
        })
      })
    )
    if (updatedProducts) {
      console.log("updatedProducts.length: ", updatedProducts.length)
    }
    res.json({ files: req.files, products: updatedProducts })
  }
})

// @desc   Delete All Images (FullSize, Thumbs, Minithumbs)
// @route  DELETE /api/upload/bulk
// @access Private/+Admin
export const deleteImages = asyncHandler(async (req, res) => {
  const files = fs.readdirSync("uploads/products/")
  const thumbs = fs.readdirSync("uploads/thumbs/")
  const minithumbs = fs.readdirSync("uploads/minithumbs/")

  const filesPromise = files.forEach(async file => {
    if (file.name !== "file.txt") {
      await fs.unlinkSync("uploads/products/" + file)
    }
  })
  const thumbsPromise = thumbs.forEach(async file => {
    if (file.name !== "file.txt") {
      await fs.unlinkSync("uploads/thumbs/" + file)
    }
  })
  const minithumbsPromise = minithumbs.forEach(async file => {
    if (file.name !== "file.txt") {
      await fs.unlinkSync("uploads/minithumbs/" + file)
    }
  })

  await Promise.all([filesPromise, thumbsPromise, minithumbsPromise])
    .then(() => {
      console.log("OK")
      res.send("OK")
    })
    .catch(err => {
      res.status(404)
      throw new Error("Problem with deleting Images", err)
    })
})
