import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Form, Row, Col, Jumbotron, Table } from "react-bootstrap"
import axios from "axios"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import Meta from "../../components/Meta"
import "react-quill/dist/quill.snow.css"
import "./AdminScreen.css"

const AdminScreen = ({ history }) => {
  const [uploading, setUploading] = useState(false)
  const [data, setData] = useState("")
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    }
  }, [history, userInfo])

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
        <Col md={2} sm={1}>
          <div className="color-example bg-super-dark-gray">super-dark-gray</div>
          <div className="color-example bg-dark-gray">dark-gray</div>
          <div className="color-example bg-gray">gray</div>
          <div className="color-example bg-medium-gray">medium-gray</div>
          <div className="color-example bg-light-gray">light-gray</div>
          <div className="color-example bg-super-light-gray">super-light-gray</div>
          <div className="color-example bg-super-dark-green">super-dark-green</div>
          <div className="color-example bg-dark-green">dark-green</div>
          <div className="color-example bg-green">green</div>
          <div className="color-example bg-light-green">light-green</div>
          <div className="color-example bg-super-light-green">super-light-green</div>
          <div className="color-example bg-red">red</div>
          <div className="color-example bg-orange">orange</div>
          <div className="color-example bg-blue">blue</div>
        </Col>
        <Col md={10}>
          <h2>Admin Interface</h2>
          <Form onSubmit={submitHandler} id="UploadCsvData">
            <Form.Group controlId="csv-file">
              <Row>
                <Col sm="2">
                  <Form.Label>Update Products by uploading CSV file (fields separated by commas)</Form.Label>
                </Col>
                <Col>
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
          {!uploading && data.success && <Message variant="success">File {data.fileName} successfully uploaded!</Message>}
          <Jumbotron>
            <p>
              This is a form for uploading product data (<span className="text-danger">inserts new products ONLY</span>)
            </p>
            <p>
              File example here:{" "}
              <a target="_blank" rel="noreferrer" href="https://docs.google.com/spreadsheets/d/1YpUqced7qPwX1tomarHuTFO9BGcNOeXGdNqbeKfqqxk/edit?usp=sharing">
                https://docs.google.com/spreadsheets/...
              </a>
            </p>
            System is looking for next headers in any order and data in next format:
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
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td></td>
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
                        natural
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
                        gray
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
            <p>
              <strong>File may contain any other columns and order of columns does not matter</strong>
            </p>
            .
          </Jumbotron>
        </Col>
      </Row>
    </>
  )
}

export default AdminScreen
