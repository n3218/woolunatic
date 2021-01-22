import React from "react"
import { Row, Col, Card, ListGroup } from "react-bootstrap"
import Message from "../components/Message"

const OrderSummary = ({ cart, items, children, error }) => {
  return (
    <Col md={3}>
      <Card>
        <Card.Header className="card-header text-center">
          <h3>Order Summary</h3>
        </Card.Header>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <h4>Total ({items.length}) items</h4>
            <Row>
              <Col>
                <strong>Items weight: </strong>
              </Col>
              <Col className="text-right">{items.reduce((acc, item) => acc + item.qty, 0)}g</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>
                <strong>Items price: </strong>
              </Col>
              <Col className="text-right">€{cart.itemsPrice}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Shipping price: </strong>
              </Col>
              <Col className="text-right">€{cart.shippingPrice}</Col>
            </Row>
            <Row>
              <Col>
                <strong>Tax</strong>
              </Col>
              <Col className="text-right">€{cart.taxPrice}</Col>
            </Row>
          </ListGroup.Item>
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
          {error && (
            <ListGroup.Item>
              <Message>{error}</Message>
            </ListGroup.Item>
          )}
          <ListGroup.Item>{children}</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  )
}

export default OrderSummary // used in OrderScreen and PlaceOrderScreen
