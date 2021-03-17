import asyncHandler from "express-async-handler"
import sharp from "sharp"
import Product from "../models/productModel.js"
import bucket from "../config/bucket.js"

import dotenv from "dotenv"
dotenv.config()

//
//
// upload single file to GCloud Bucket
const blobAction = async (size, fileData) => {
  const blob = bucket.file(`${size}/${fileData.originalname}`)
  const blobStream = blob.createWriteStream()
  const newFilePath = `${process.env.GCLOUD_STORAGE_URL}/${process.env.GCLOUD_BUCKET}`
  await blobStream
    .on("error", err => console.log("Error on blobStream.on: ", err))
    .on("finish", () => {
      const publicUrl = `${newFilePath}/${blob.name}`
      const imageDetails = fileData
      imageDetails.image = publicUrl
      return imageDetails
    })
    .end(fileData.buffer)
}

//
//
// render and upload to GCloud all images for single product (fullsize, thumb amd minithumb)
const uploadResizedImages = async file => {
  blobAction("fullsize", file) // fullsize image

  await sharp(file.buffer)
    .resize(250, 250)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toBuffer((err, data, info) => {
      if (err) {
        console.log("Error on thumbs: ", err)
        return err
      } else {
        const result = {
          ...info,
          buffer: data,
          originalname: file.originalname
        }
        return blobAction("thumbs", result) // thumb image
      }
    })

  await sharp(file.buffer)
    .resize(80, 80)
    .toFormat("jpeg")
    .jpeg({ quality: 80 })
    .toBuffer((err, data, info) => {
      if (err) {
        console.log("Error on minithumbs: ", err)
        return err
      } else {
        const result = {
          ...info,
          buffer: data,
          originalname: file.originalname
        }
        return blobAction("minithumbs", result) // minithumb image
      }
    })
}

// @desc   Upload Images for single Product
// @route  POST /api/upload/
// @access Private/+Admin
export const uploadProductImages = asyncHandler(async (req, res) => {
  const results = await Promise.all(
    req.files.map(async file => {
      uploadResizedImages(file)
    })
  )
  if (results) {
    setTimeout(() => {
      console.log("uploadProductImages: req.files.length: ", req.files.length)
      console.log("uploadProductImages: results.length: ", results.length)
      res.json(req.files)
    }, 9000)
  } else {
    console.error("Error on uploading Images")
    res.status(404)
    throw new Error("Problem with uploading Images")
  }
})

// @desc   Upload Bulk Images and connecting to Products
// @route  POST /api/upload/bulk
// @access Private/+Admin
export const uploadBulkImages = asyncHandler(async (req, res) => {
  let productMap = {}
  try {
    const results = await Promise.all(
      req.files.map(async file => {
        uploadResizedImages(file)

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
      try {
        await Promise.all(
          Object.keys(productMap).map(async key => {
            const filter = { art: key }
            const update = { $set: { image: productMap[key] } }
            return await Product.findOneAndUpdate(filter, update, { new: true }, (err, doc) => {
              if (err) {
                console.log("Something wrong when updating data!")
                return err
              } else {
                return doc
              }
            })
          })
        ).then(result => {
          console.log("uploadBulkImages: result.length: ", result.length)
          res.json({ files: req.files, products: result })
        })
      } catch (err) {
        console.error("Error on updating products after uploading images: ", err)
        res.status(404)
        throw new Error("Error on updating products after uploading images", err)
      }
    }
  } catch (err) {
    console.error("Error on generating images: ", err)
    res.status(404)
    throw new Error("Error on generating images", err)
  }
})

//
//
// delete all files in folder exept undefined
const deleteAllFilesInFolder = async folder => {
  console.log("deleteAllFilesInFolder: folder: ", folder)
  try {
    let [files] = await bucket.getFiles({ prefix: folder })
    console.log("deleteAllFilesInFolder: folder-files.length: ", folder, "-", files.length)
    let dirFiles = files.filter(f => f.name.includes(folder) && !f.name.includes("undefined"))
    dirFiles.forEach(async file => {
      try {
        await file.delete()
      } catch (err) {
        console.log("Error on deleting file: ", err)
      }
    })
  } catch (err) {
    console.log("Error: ", err)
  }
}

// @desc   Delete All Images in product images derectories(FullSize, Thumbs, Minithumbs)
// @route  DELETE /api/upload/bulk
// @access Private/+Admin
export const deleteImages = asyncHandler(async (req, res) => {
  console.log("deleteImages")
  await Promise.all([deleteAllFilesInFolder("fullsize"), deleteAllFilesInFolder("thumbs"), deleteAllFilesInFolder("minithumbs")])
    .then(() => {
      console.log("OK")
      res.send("OK")
    })
    .catch(err => {
      res.status(404)
      throw new Error("Problem with deleting Images", err)
    })
})
