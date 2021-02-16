import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { Form, Row, Col, Button } from "react-bootstrap"
import Loader from "./Loader"
import imageCompression from "browser-image-compression"
import Message from "./Message"

const ImageBulkUpload = ({}) => {
  const dispatch = useDispatch()
  const minithumbPath = "/uploads/minithumbs/minithumb-"

  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])

  const handleImageBulkUpload = async e => {
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
          setLoading(true)
          const compressedFile = await imageCompression(file[i], options)
          await formData.append(`image`, compressedFile, compressedFile.name) // write your own logic
        } catch (error) {
          console.log(error)
        }
      }
    }
    setLoading(false)
    setUploading(true)

    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } }
      const { data } = await axios.post("/api/upload", formData, config)
      console.log("data: ", data)
      setImages(data)
      setUploading(false)
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
          <Form.Label>JPEG, JPG, PNG</Form.Label>
        </Col>
        <Col>
          {images &&
            images.map(img => (
              <div key={img.originalname} className="color-picture">
                <Form.Label>
                  <img src={minithumbPath + img.originalname} alt="Color Preview" width="80" />
                </Form.Label>
              </div>
            ))}

          <Form.File id="images" label="Choose Images to upload" custom onChange={handleImageBulkUpload} multiple accept="image/*"></Form.File>
          {(loading || uploading) && <Loader />}
        </Col>
      </Row>
    </Form.Group>
  )
}

export default ImageBulkUpload
