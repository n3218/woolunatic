import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Form, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import Loader from "./Loader"
import imageCompression from "browser-image-compression"
import Message from "./Message"
import { minithumbPath } from "../constants/commonConstans"
import FormData from "form-data"

const ImagesBulkUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [updatedProducts, setUpdatedProducts] = useState([])
  const [notFoundProducts, setNotFoundProducts] = useState([])
  const [fullsizeFiles, setFullsizeFiles] = useState(0)
  const [thumbsFiles, setThumbsFiles] = useState(0)
  const [minithumbsFiles, setMinithumbsFiles] = useState(0)
  const [totalSize, setTotalSize] = useState(0)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const handleImagesBulkUpload = async e => {
    setImages([])
    setUpdatedProducts([])
    setTotalSize(0)
    const file = e.target.files
    const formData = new FormData()
    let size = 0

    //-----------------------------------------WITH COMRESSION
    const options = {
      maxSizeMB: 0.5,
      useWebWorker: true
    }
    for (let i in file) {
      if (typeof file[i] === "object") {
        console.log("file[i]: ", file[i])
        try {
          setUploading(true)
          size += file[i].size
          const compressedFile = await imageCompression(file[i], options)
          console.log("compressedFile: ", compressedFile)
          await formData.append(`image`, compressedFile, compressedFile.name)
        } catch (error) {
          console.log(error)
        }
      }
    }

    //-----------------------------------------NO COMRESSION
    // for (let i in file) {
    //   if (typeof file[i] === "object") {
    //     try {
    //       setUploading(true)
    //       size += file[i].size
    //       await formData.append(`image`, file[i], file[i].originalname)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // }

    setTotalSize(size)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      const { data } = await axios.post("/api/upload/bulk", formData, config)
      console.log("data: ", data)
      if (data) {
        setFullsizeFiles(data.fullsizeFiles)
        setThumbsFiles(data.thumbsFiles)
        setMinithumbsFiles(data.minithumbsFiles)
        setNotFoundProducts(data.notFound)
        setUpdatedProducts(data.products)
        setUploading(false)
      }
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <Form.Group controlId="images" className="mb-4">
      <Row>
        <Col sm="2">
          <h4>Uploading Images</h4>
          <Form.Label>
            <div>
              <small>
                named by ART., like: 101957-1.jpg,
                <br /> 101957-2.jpg,
                <br /> 101957-3.jpg
                <br /> (max 100 per transaction)
              </small>
            </div>
          </Form.Label>
        </Col>
        <Col>
          {updatedProducts && updatedProducts.length > 0 && !uploading && (
            <Message variant="success" onClose={() => setUpdatedProducts([])}>
              <div>
                Updated:{" "}
                <span className="h5">
                  <mark> {updatedProducts.length} </mark>
                </span>{" "}
                updatedProducts.
              </div>

              {notFoundProducts.length > 0 && (
                <div>
                  Not Found Products:{" "}
                  <span className="h5">
                    <mark> {notFoundProducts.join(",")} </mark>
                  </span>{" "}
                  images.
                </div>
              )}

              <div>
                Now total images in fullsize folder:{" "}
                <span className="h5">
                  <mark> {fullsizeFiles} </mark>
                </span>{" "}
                images.
              </div>
              <div>
                Now total images in thumbs folder:{" "}
                <span className="h5">
                  <mark> {thumbsFiles} </mark>
                </span>{" "}
                images.
              </div>
              <div>
                Now total images in minithumbs folder:{" "}
                <span className="h5">
                  <mark> {minithumbsFiles} </mark>
                </span>{" "}
                images.
              </div>
            </Message>
          )}

          {uploading && <h4>Total uploading size: {(totalSize / 1024 / 1024).toFixed(1)}MB</h4>}

          {updatedProducts &&
            updatedProducts.map((prod, i) => (
              <div key={`${prod.art}${i}`}>
                <Link to={`/products/${prod._id}`} className="mx-3">
                  {prod.art}
                </Link>
                {prod.image.map((img, i) => (
                  <span key={`${img.originalname}${i}`} className="color-picture">
                    <img src={minithumbPath + img} alt="Color Preview" width="60" />
                  </span>
                ))}
              </div>
            ))}
          <Form.File id="images" label="Choose Images to upload" custom onChange={handleImagesBulkUpload} multiple accept="image/*"></Form.File>
          {uploading && (
            <div className="mt-5">
              <Loader />
            </div>
          )}
        </Col>
      </Row>
    </Form.Group>
  )
}

export default ImagesBulkUpload
