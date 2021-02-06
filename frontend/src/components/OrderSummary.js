import React from "react"
import { Row, Col, Card, ListGroup } from "react-bootstrap"
import Message from "../components/Message"

const OrderSummary = ({ cart, items, children, error, checkoutStep }) => {
  return (
    <Card border="light">
      <Card.Header className="card-header text-center">
        <h3>Order Summary</h3>
      </Card.Header>

      <ListGroup variant="flush">
        <ListGroup.Item>
          <h4>Total ({items.length}) items</h4>
          <Row>
            <Col>
              <strong>Items price: </strong>
            </Col>
            <Col className="text-right">€{(items && cart.totalPrice) || 0}</Col>
          </Row>
          {checkoutStep === "payment" && (
            <>
              <Row>
                <Col>
                  <strong>Tax</strong>
                </Col>
                <Col className="text-right">€{cart.taxPrice || 0}</Col>
              </Row>
              <Row>
                <Col>
                  <strong>Shipping price: </strong>
                </Col>
                <Col className="text-right">€{cart.shippingPrice || 0}</Col>
              </Row>
            </>
          )}
        </ListGroup.Item>

        {cart.totalPrice && (
          <ListGroup.Item>
            <Row>
              <Col>
                <h5>Order total:</h5>
              </Col>
              <Col>
                <h5>€{cart.totalPrice}</h5>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        {error && (
          <ListGroup.Item>
            <Message>{error}</Message>
          </ListGroup.Item>
        )}
        {children && (
          <ListGroup.Item>
            <div id="payment-buttons">{children}</div>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  )
}

export default OrderSummary // used in CartScreen, CheckoutScreen, OrderScreen and PlaceOrderScreen
