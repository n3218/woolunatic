import React from "react"
import axios from "axios"
import { Form, Row, Col } from "react-bootstrap"
import Loader from "../components/Loader"

const ImageUpload = ({ image, setUploading, setImage, uploading }) => {
  //
  const uploadFileHandler = async e => {
    const file = e.target.files

    const formData = new FormData()
    for (let i in file) {
      if (typeof file[i] === "object") {
        formData.append("image", file[i])
      }
    }

    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      const { data } = await axios.post("/api/upload", formData, config)
      console.log("data: ", data)
      setImage([...image, ...data.map(img => `/${img.path}`)])
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <Form.Group controlId="image-file">
      <Row>
        <Col sm="2">
          <Form.Label>Images</Form.Label>
        </Col>
        <Col>
          <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler} multiple accept="image/png, image/jpeg, image/jpg"></Form.File>
          {uploading && <Loader />}
        </Col>
      </Row>
    </Form.Group>
  )
}

export default ImageUpload
