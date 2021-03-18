import React from "react"
import { Row, Col, Nav } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import { UPLOADS } from "../constants/commonConstans"

const Footer = () => {
  return (
    <footer className="bg-gray py-3 mt-5">
      <div className="mt-5 pl-5">
        <Row>
          <Col md={6} sm={12} className="pb-5 text-center">
            <div className="text-left ml-5">
              <h3>
                <strong>Woolunatics</strong>
              </h3>
              <div className="my-3">
                <a href="https://www.instagram.com/woolunatics_nl" target="_blank" rel="noreferrer">
                  <Icon.Instagram className="text-light h4 mr-3" />
                </a>
                <a href="mailto: woolunatics.nl@google.com" target="_blank" rel="noreferrer">
                  <Icon.Envelope className="text-light h3" />
                </a>
              </div>

              <div>
                <small>Groningen, Netherlands</small>
              </div>
            </div>
          </Col>
          <Col className="pl-5">
            <h5>COLLECTION</h5>
            <Nav className="flex-column">
              <Nav.Link href="/yarns" className="text-light">
                All Yarns
              </Nav.Link>
              <Nav.Link href="/yarns/cashmere" className="text-light">
                Cashmere
              </Nav.Link>
              <Nav.Link href="/yarns/cashmix" className="text-light">
                Cashmere mix
              </Nav.Link>
              <Nav.Link href="/yarns/merino-wool-lambswool" className="text-light">
                Merino/Wool
              </Nav.Link>
              <Nav.Link href="/yarns/angora" className="text-light">
                Angora
              </Nav.Link>
              <Nav.Link href="/yarns/mohair-alpaca" className="text-light">
                Mohair/Alpaca
              </Nav.Link>
              <Nav.Link href="/yarns/camel-yak" className="text-light">
                Camel/Yak
              </Nav.Link>
              <Nav.Link href="/yarns/silk-viscose" className="text-light">
                Silk
              </Nav.Link>
              <Nav.Link href="/yarns/cotton-linen" className="text-light">
                Linen/Cotton
              </Nav.Link>
              <Nav.Link href="/yarns/fantasy-pailettes" className="text-light">
                Fantasy Yarns
              </Nav.Link>
            </Nav>
          </Col>
          <Col className="text-light">
            <h5>SUPPORT</h5>
            <Nav className="flex-column">
              <Nav.Link href="/about" className="text-light">
                About
              </Nav.Link>
              <Nav.Link href="/how-to" className="text-light">
                How To Order
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </div>
      <hr />
      <Row>
        <Col className="text-center">
          <small>© 2021 All rights reserved.</small>
        </Col>
        <Col className="text-center">
          <img src={`${UPLOADS}/payments.png`} alt="payment methods" />
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
