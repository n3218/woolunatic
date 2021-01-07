import React, { useState } from "react"
import axios from "axios"
import { Form, Row, Col } from "react-bootstrap"
import Loader from "../components/Loader"
import Meta from "../components/Meta"
import "react-quill/dist/quill.snow.css"

const AdminScreen = () => {
  const [uploading, setUploading] = useState(false)

  const uploadCsvFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("csv-file", file)
    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      console.log("formData: ", formData.get("csv-file"))
      const { data } = await axios.post("/api/importdata", formData, config)
      console.log("data: ", data)

      // setCsvFile(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = () => {
    console.log("submitHandler")
  }

  return (
    <>
      <Meta title="Admin | Woolunatics" />
      <Row>
        <Col md={4} sm={12}>
          Col-1
        </Col>
        <Col md={8}>
          <h2>Admin Interface</h2>
          <Form onSubmit={submitHandler} id="UploadCsvData">
            <Form.Group controlId="csv-file">
              <Row>
                <Col sm="2">
                  <Form.Label>Update Products by uploading CSV file (fields separated by ',')</Form.Label>
                </Col>
                <Col>
                  <Form.File //
                    id="csv-file"
                    label="Choose Csv File"
                    custom
                    onChange={uploadCsvFileHandler}
                    accept="text/csv"
                  ></Form.File>
                  {uploading && <Loader />}
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default AdminScreen
