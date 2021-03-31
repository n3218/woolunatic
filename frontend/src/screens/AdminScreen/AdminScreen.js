import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Meta from "../../components/Meta"
import "react-quill/dist/quill.snow.css"
import "./AdminScreen.css"

const AdminScreen = ({ history }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    }
  }, [history, userInfo])

  return (
    <>
      <Meta title="Admin | Woolunatics" />
      <Row>
        <Col>
          <h2>Admin Interface</h2>
        </Col>
      </Row>
    </>
  )
}

export default AdminScreen
