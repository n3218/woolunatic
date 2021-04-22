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
import { OptionsForCompressingImages } from "./Utils"

const ImagesBulkUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [updatedProducts, setUpdatedProducts] = useState([])
  const [notFoundProducts, setNotFoundProducts] = useState([])
  const [fullsizeFiles, setFullsizeFiles] = useState(0)
  const [thumbsFiles, setThumbsFiles] = useState(0)
  const [minithumbsFiles, setMinithumbsFiles] = useState(0)
  const [totalSizeBefore, setTotalSizeBefore] = useState(0)
  const [totalSizeAfter, setTotalSizeAfter] = useState(0)
  const [resized, setResized] = useState([])
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const handleImagesBulkUpload = async e => {
    setImages([])
    setUpdatedProducts([])
    setTotalSizeBefore(0)
    setTotalSizeAfter(0)
    const file = e.target.files
    const formData = new FormData()
    let totalSizeBeforeVar = 0
    let totalSizeAfterVar = 0
    let resizedVar = []

    //-----------------------------------------WITH COMRESSION
    for (let i in file) {
      if (typeof file[i] === "object") {
        console.log("file[i]: ", file[i])
        try {
          setUploading(true)
          totalSizeBeforeVar += file[i].size
          setTotalSizeBefore(totalSizeBeforeVar)

          const compressedFile = await imageCompression(file[i], OptionsForCompressingImages)

          totalSizeAfterVar += compressedFile.size
          setTotalSizeAfter(totalSizeAfterVar)

          resizedVar.push({ name: file[i].name, sizeBefore: file[i].size, sizeAfter: compressedFile.size })
          setResized(resizedVar)
          console.log("resized: ", resized)
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

    // setTotalSize(size)

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
        <Col xl={3} md={4}>
          <h4>Uploading Images</h4>
          <div>
            <small>
              named by ART. field, like: "101957-1.jpg"...
              <div className="h5">If total images in folders are not equal, reUpload the same bunch of images.</div>
              <br />
            </small>
          </div>
          {totalSizeBefore > 0 && <h4>Total size before: {(totalSizeBefore / 1024 / 1024).toFixed(1)}MB</h4>}
          {totalSizeAfter > 0 && <h4>Total size after compressing: {(totalSizeAfter / 1024 / 1024).toFixed(1)}MB</h4>}
          <br />
          {resized &&
            resized.map(el => (
              <div key={el.name}>
                {el.name}: <span className="mx-3">{(el.sizeBefore / 1024).toFixed(0)}KB</span> {" -> "} {(el.sizeAfter / 1024).toFixed(0)}KB
              </div>
            ))}
          <br />
        </Col>
        <Col>
          {(updatedProducts > 0 || thumbsFiles > 0 || minithumbsFiles > 0) && (
            <Message variant="success" onClose={() => setUpdatedProducts([])}>
              <div>
                Updated:{" "}
                <span className="h5">
                  <mark> {updatedProducts.length} </mark>
                </span>{" "}
                Products.
              </div>

              {notFoundProducts.length > 0 && (
                <div>
                  Not Found Products:{" "}
                  <span className="h5">
                    <mark> {notFoundProducts.join(", ")} </mark>
                  </span>{" "}
                  and their images did not upload.
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
          {fullsizeFiles !== thumbsFiles && thumbsFiles !== minithumbsFiles && (
            <Message variant="warning" onClose={() => setUpdatedProducts([])}>
              If total images in folders are not equal, reupload the same images.
            </Message>
          )}

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
          <Form.Label className="h5">Refresh/reload page (⌘ + R) after every use uploading form.</Form.Label>
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
