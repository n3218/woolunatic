import React from "react"
import { Row, Col } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import { Link } from "react-router-dom"

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
            <div className="mb-1">
              <Link to="/yarns" className="text-light">
                All Yarns
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/cashmere" className="text-light">
                Cashmere
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/cashmix" className="text-light">
                Cashmere mix
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/merino-wool-lambswool" className="text-light">
                Merino/Wool
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/angora" className="text-light">
                Angora
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/mohair-alpaca" className="text-light">
                Mohair/Alpaca
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/camel-yak" className="text-light">
                Camel/Yak
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/silk-viscose" className="text-light">
                Silk
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/cotton-linen" className="text-light">
                Linen/Cotton
              </Link>
            </div>
            <div className="mb-1">
              <Link to="/yarns/fantasy-pailettes" className="text-light">
                Fantasy Yarns
              </Link>
            </div>
          </Col>
          <Col>
            <div>
              <h5>SUPPORT</h5>
              <div className="mb-1">
                <Link to="/about" className="text-light">
                  About
                </Link>
              </div>
              <div className="mb-1">
                <Link to="/how-to" className="text-light">
                  How To Order
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col className="text-center">
            <small>© 2021 All rights reserved.</small>
          </Col>
          <Col className="text-center">
            <img src={`/assets/payments/payments.png`} alt="payment methods" />
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
