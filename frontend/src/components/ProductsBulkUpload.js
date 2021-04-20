import React, { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { Jumbotron, Table } from "react-bootstrap"
import { Form, Row, Col } from "react-bootstrap"
import Loader from "./Loader"
import Message from "./Message"

const ProductsBulkUpload = () => {
  const userLogin = useSelector(state => state.userLogin)
  const [uploading, setUploading] = useState(false)
  const [data, setData] = useState("")
  const [error, setError] = useState("")

  const uploadCsvFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("csv-file", file)
    setUploading(true)
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.userInfo.token}`
        }
      }
      console.log("formData: ", formData.get("csv-file"))
      const { data } = await axios.post("/api/importdata", formData, config)
      console.log("data: ", data)
      setData(data)
      setUploading(false)
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      console.error("error: ", error)
      console.error("message: ", message)
      setError(message)
      setUploading(false)
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  return (
    <>
      <Form id="UploadCsvData">
        <Form.Group controlId="csv-file">
          <Row>
            <Col sm={12} md={4}>
              <nobr>
                <h4>Updating Products</h4>
              </nobr>
            </Col>
            <Col sm={12} md={8}>
              <Form.File //
                id="csv-file"
                label="Choose Csv File"
                custom
                onChange={uploadCsvFileHandler}
                accept="text/csv"
              ></Form.File>
            </Col>
          </Row>
        </Form.Group>
      </Form>
      {uploading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {!uploading && data.success && (
        <Message variant="success" onClose={() => setData({})}>
          <div>
            File{" "}
            <span className="h5">
              <mark>{data.fileName}</mark>
            </span>{" "}
            with{" "}
            <span className="h5">
              <mark>{data.totalRows}</mark>
            </span>{" "}
            rows successfully parsed!
          </div>
          <div>
            newly added Products:{" "}
            <span className="h5">
              <mark>{data.newlyAddedProducts}</mark>
            </span>
          </div>
          <div>
            updated Products:{" "}
            <span className="h5">
              <mark>{data.updatedProducts}</mark>
            </span>
          </div>
        </Message>
      )}

      <Jumbotron>
        <p>
          This is a form for uploading product's data (it identifies Product by group of fields Brand+Name+Color). <br />
          System is looking for next headers and data in format below. <br />
          <strong>File may contain any other columns and order of columns does not matter</strong>
        </p>
        <p>
          File example is here:{" "}
          <a target="_blank" rel="noreferrer" href="https://docs.google.com/spreadsheets/d/1YpUqced7qPwX1tomarHuTFO9BGcNOeXGdNqbeKfqqxk/edit?usp=sharing">
            https://docs.google.com/spreadsheets/d/1YpUqced7qPwX1tomarHuTFO9...
          </a>
        </p>
        <small>
          <Table striped hover responsive className="table-sm product-list">
            <thead>
              <tr>
                <th>art</th>
                <th>category</th>
                <th>brand</th>
                <th>name</th>
                <th>colorWay</th>
                <th>color</th>
                <th>fibers</th>
                <th>inStock</th>
                <th>nm</th>
                <th>price</th>
                <th>meterage</th>
                <th>
                  novelty
                  <br />
                  inSale
                  <br />
                  regular
                  <br />
                  outOfStock
                </th>
                <th>minimum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  101957
                  <br />
                  102057
                  <br />
                  101307
                  <br />
                  401957
                  <br />
                  150957
                  <br />
                </td>
                <td>
                  <strong>
                    cashmere
                    <br />
                    cashmix
                    <br />
                    silk
                    <br />
                    merino
                    <br />
                    wool
                    <br />
                    lambswool
                    <br />
                    angora
                    <br />
                    alpaca
                    <br />
                    mohair
                    <br />
                    linen
                    <br />
                    cotton
                    <br />
                    pailettes
                    <br />
                    camel
                    <br />
                    fantasy
                    <br />
                    cashmix,merino
                    <br />
                    cashmix,silk
                  </strong>
                </td>
                <td>
                  Loro Piana
                  <br />
                  Grignesco
                  <br />
                  Lana Gatto
                  <br />
                  Cariaggi
                  <br />
                  JC Renny
                  <br />
                  Filitaly
                  <br />
                  ...
                </td>
                <td>
                  cash2/27
                  <br />
                  cashwool
                  <br />
                  chambrey
                  <br />
                  chunky
                  <br />
                  cosmopolitan
                  <br />
                  ...
                </td>
                <td>
                  <strong>
                    white
                    <br />
                    beige
                    <br />
                    yellow
                    <br />
                    orange
                    <br />
                    red
                    <br />
                    pink
                    <br />
                    purple
                    <br />
                    blue
                    <br />
                    green
                    <br />
                    grey
                    <br />
                    brown
                    <br />
                    black
                    <br />
                    multicolor
                  </strong>
                </td>
                <td>
                  blue
                  <br />
                  antique rosa
                  <br />
                  licht gr melange
                  <br />
                  light blue
                  <br />
                  cold beige
                  <br />
                  nutmeg
                  <br />
                  sky
                  <br />
                  ...
                </td>
                <td>
                  100%WV
                  <br />
                  50%WS 50%CO
                  <br />
                  100%WO
                  <br />
                  100%SE
                  <br />
                  93%WV 7%PA
                  <br />
                  ...
                </td>
                <td>
                  425
                  <br />
                  1180,1090
                  <br />
                  600,860,980
                  <br />
                  ...
                </td>
                <td>
                  2/40000
                  <br />
                  3x3/18000
                  <br />
                  2/15000
                  <br />
                  ...
                </td>
                <td>
                  € 24.40
                  <br />€ 30.20
                  <br />€ 28.40
                  <br />
                  ...
                </td>
                <td>
                  675
                  <br />
                  1350
                  <br />
                  1400
                  <br />
                  1500
                  <br />
                  467
                  <br />
                  200
                  <br />
                  150
                  <br />
                  ...
                </td>
                <td>
                  <strong>1</strong>
                </td>
                <td>
                  300
                  <br />
                  200
                  <br />
                  100
                  <br />
                  ...
                </td>
              </tr>
            </tbody>
          </Table>
        </small>
        <ol>
          <li>
            save/export excel file as <strong>.csv</strong> (text file with comma separated fields) to your computer
          </li>
          <li>
            upload <strong>.csv</strong> file via this field.
          </li>
        </ol>
      </Jumbotron>
    </>
  )
}

export default ProductsBulkUpload
