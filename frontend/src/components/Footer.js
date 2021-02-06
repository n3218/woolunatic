import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className="bg-gray py-5 mt-5">
      <Container>
        <Row>
          <Col className="text-center py-3 text-light">
            <div>Copyright &copy; Woolunatics 2021</div>
            <div>
              <a href="mailto: woolunatics.nl@google.com" className="text-light">
                woolunatics.nl@google.com
              </a>
            </div>
            <div>
              <small>Groningen, Netherlands</small>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
