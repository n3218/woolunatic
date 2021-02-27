import React from "react"
import { Row, Col, Card, ListGroup } from "react-bootstrap"
import Message from "../components/Message"

const OrderSummary = ({ cart, items, error, checkoutStep, children }) => {
  return (
    <Card className="mx-1">
      <Card.Header className="card-header text-center">
        <h3>Order Summary</h3>
      </Card.Header>

      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col className="text-center">
              <h4>Total ({items.length}) items</h4>
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Items price: </strong>
            </Col>
            <Col className="text-right">€{Number(cart.itemsPrice).toFixed(2) || 0}</Col>
          </Row>
          <Row>
            <Col>
              <strong>Tax</strong>
            </Col>
            <Col className="text-right">€{Number(cart.taxPrice).toFixed(2) || 0}</Col>
          </Row>
          <Row>
            <Col>
              <strong>Shipping price: </strong>
            </Col>
            <Col className="text-right">€{Number(cart.shippingPrice).toFixed(2) || 0}</Col>
          </Row>
        </ListGroup.Item>

        {cart.totalPrice && (
          <ListGroup.Item>
            <Row>
              <Col>
                <h5>Total price:</h5>
              </Col>
              <Col className="text-right">
                <h5>€{Number(cart.totalPrice).toFixed(2)}</h5>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        {checkoutStep !== "shipping" && children && children}

        {error && (
          <ListGroup.Item>
            <Message>{error}</Message>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  )
}

export default OrderSummary // used in CartScreen, ShippingScreen, PaymentScreen
