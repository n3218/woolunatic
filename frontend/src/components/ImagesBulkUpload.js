import React, { useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { Form, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import Loader from "./Loader"
import imageCompression from "browser-image-compression"
import Message from "./Message"
import { minithumbPath } from "../constants/commonConstans"

const ImagesBulkUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState([])
  const [updatedProducts, setUpdatedProducts] = useState([])
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const handleImagesBulkUpload = async e => {
    const file = e.target.files
    const formData = new FormData()
    for (let i in file) {
      if (typeof file[i] === "object") {
        const options = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1440,
          useWebWorker: true
        }
        try {
          setUploading(true)
          const compressedFile = await imageCompression(file[i], options)
          await formData.append(`image`, compressedFile, compressedFile.name)
        } catch (error) {
          console.log(error)
        }
      }
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      const { data } = await axios.post("/api/upload/bulk", formData, config)
      console.log("data: ", data)
      setTimeout(() => {
        setImages(data.files)
        setUpdatedProducts(data.products)
        setUploading(false)
      }, 9000)
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
            JPEG, JPG, PNG
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
                Uploaded{" "}
                <span className="h5">
                  <mark> {images.length} </mark>
                </span>{" "}
                images.
              </div>
              <div>
                Updated{" "}
                <span className="h5">
                  <mark> {updatedProducts.length} </mark>
                </span>{" "}
                updatedProducts.
              </div>
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
