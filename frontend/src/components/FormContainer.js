import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const FormContainer = ({ children, className }) => {
  return (
    <Container>
      <Row className={`form-container ${className}`}>
        <Col sm={11} md={9} lg={9} xl={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
