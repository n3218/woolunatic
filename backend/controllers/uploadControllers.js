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
  const blobStream = blob.createWriteStream({
    resumable: false,
    public: true
  })
  const newFilePath = `${process.env.GCLOUD_STORAGE_URL}/${process.env.GCLOUD_BUCKET}`
  await blobStream
    .on("error", err => {
      console.log("Error on blobStream: ", err)
      return err
    })
    .on("finish", () => {
      const publicUrl = `${newFilePath}/${blob.name}`
      const imageDetails = fileData
      imageDetails.image = publicUrl
      console.log("uploading: ", publicUrl)
      return imageDetails
    })
    .end(fileData.buffer)
}

//
//
// render and upload to GCloud all images for single product (fullsize, thumb amd minithumb)
const uploadResizedImages = async file => {
  try {
    blobAction("fullsize", file) // fullsize image

    await sharp(file.buffer)
      .resize(250, 250)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
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
      .jpeg({ quality: 100 })
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
  } catch (err) {
    console.log("Error in uploadResizedImages: ", err)
    return err
  }
}

// @desc   Upload Images for single Product
// @route  POST /api/upload/
// @access Private/+Admin
export const uploadProductImages = asyncHandler(async (req, res) => {
  try {
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
    }
  } catch (err) {
    console.error("Error in uploadProductImages: ", err)
    res.status(404)
    throw new Error("Problem with uploading Images: ", err)
  }
})

export const makeProdMap = async files => {
  const productMap = new Map()

  try {
    await Promise.all(
      files.map(async file => {
        if (file.originalname) {
          const productArt = file.originalname.replace(/[ a-z.]+/g, "").split("-")[0]
          console.log("uploadBulkImages: productArt: ", productArt)
          if (productMap.has(productArt)) {
            productMap.set(productArt, {
              images: [...productMap.get(productArt).images, file.originalname],
              files: [...productMap.get(productArt).files, file]
            })
          } else {
            productMap.set(productArt, {
              images: [file.originalname],
              files: [file]
            })
          }
        }
      })
    ) // fill the prodMap with values

    return productMap
  } catch (err) {
    console.error("Error on generating images: ", err)
    res.status(404)
    throw new Error("Error on generating images", err)
  }
}

// @desc   Upload Bulk Images and connecting to Products
// @route  POST /api/upload/bulk
// @access Private/+Admin
export const uploadBulkImages = asyncHandler(async (req, res) => {
  const products = []
  const notFound = []
  const totalSize = (req.files.reduce((acc, el) => acc + el.size, 0) / 1024 / 1024).toFixed(1)
  const expectedTime = totalSize * 500
  console.log("uploadBulkImages: totalSize: ", totalSize)

  const prodMap = await makeProdMap(req.files)
  console.log("----------------------------prodMap: ", prodMap)
  if (prodMap) {
    console.log("========================")
    // Promise.all(
    await prodMap.forEach(async (value, key) => {
      const product = await Product.findOne({ art: key })
      if (product) {
        prodMap.get(key).files.map(file => {
          uploadResizedImages(file)
        })
        product.image = value.images
        console.log("product.image: ", product.image)
        try {
          const updatedProduct = await product.save()
          products.push(updatedProduct)
          return updatedProduct
        } catch (err) {
          console.log("Error on updating product: ", err)
        }
      } else {
        console.log("ELSE: ")
        notFound.push(key)
        return "Product not found"
      }
    })
    // .then(res => {
    //   console.log("res: ", res)
    // })
    setTimeout(async () => {
      console.log("products.length: ", products.length)
      console.log("notFound: ", notFound)
      let [fullsizeFiles] = await bucket.getFiles({ prefix: "fullsize" })
      let [thumbsFiles] = await bucket.getFiles({ prefix: "thumbs" })
      let [minithumbsFiles] = await bucket.getFiles({ prefix: "minithumbs" })

      console.log("fullsizeFiles.length: ", fullsizeFiles.length)
      console.log("thumbsFiles.length: ", thumbsFiles.length)
      console.log("minithumbsFiles.length: ", minithumbsFiles.length)

      res.json({ products, notFound, fullsizeFiles: fullsizeFiles.length, thumbsFiles: thumbsFiles.length, minithumbsFiles: minithumbsFiles.length })
    }, expectedTime)

    // ).then(res => console.log("res: ", res))
    // console.log("data: ", data)

    // console.log("uploadBulkImages: products: ", products)
  }
  // try {

  // } catch (err) {
  //   console.error("Error on updating products after uploading images: ", err)
  //   res.status(404)
  //   throw new Error("Error on updating products after uploading images", err)
  // }
})

//
//
// delete all files in folder exept undefined
const deleteAllFilesInFolder = async folder => {
  try {
    let [files] = await bucket.getFiles({ prefix: folder })
    console.log("deleteAllFilesInFolder: ", folder, "-", files.length)
    let dirFiles = files.filter(f => f.name.includes(folder) && !f.name.includes("undefined"))
    console.log("deleteAllFilesInFolder: filteredFilesToDelete: ", folder, "-", dirFiles.length)

    dirFiles.forEach(async file => {
      try {
        return await file.delete()
      } catch (err) {
        console.log("Error on deleting file: ", err)
      }
    })
    return " Deleted " + dirFiles.length + " files in folder " + folder
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
    .then(results => {
      console.log("results: ", results)
      console.log("OK")
      const message = results.toString()
      console.log("message: ", message)
      res.json({ message: message })
    })
    .catch(err => {
      res.status(404)
      throw new Error("Problem with deleting Images", err)
    })
})
