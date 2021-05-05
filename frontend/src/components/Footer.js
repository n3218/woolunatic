import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import * as Icon from "react-bootstrap-icons"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { textListAction } from "../actions/textActions"
import Loader from "./Loader"
import Message from "./Message"

const Footer = () => {
  const dispatch = useDispatch()

  const textList = useSelector(state => state.textList)
  const { loading, error, texts } = textList

  useEffect(() => {
    dispatch(textListAction())
  }, [dispatch])

  return (
    <footer className="bg-gray py-3">
      <div className="mt-5">
        <Row>
          <Col md={6} sm={12} className="pb-5 text-center">
            <div className="text-left ml-5">
              <h3>
                <strong>YarnStore</strong>
              </h3>
              <div className="mt-3 mb-2">
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                  <Icon.Instagram className="text-light h4 mr-3" />
                </a>
                <a href="mailto: info@wYarnStore" target="_blank" rel="noreferrer">
                  <Icon.Envelope className="text-light h3" />
                </a>
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
            <h5>SUPPORT</h5>

            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {texts &&
              texts.map(
                text =>
                  !text.hide && (
                    <div className="mb-1 mr-2" key={text._id}>
                      <Link to={`/info/${text.url}`} className="text-light">
                        {text.title}
                      </Link>
                    </div>
                  )
              )}
          </Col>
        </Row>

        <hr />
        <Row>
          <Col className="text-center" xs={12} sm={4}>
            <small>© 2021 All rights reserved.</small>
          </Col>
          <Col className="text-center">
            <img src={`/assets/payments/payments.png`} alt="payment methods" className="footer-payments-image" />
          </Col>
        </Row>
      </div>
    </footer>
  )
}

export default Footer
