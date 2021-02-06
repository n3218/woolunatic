import React from "react"
import { Row, Col, Card } from "react-bootstrap"

const OrderWeightsSummary = ({ order }) => {
  return (
    <Card border="light">
      <Card.Header className="card-header text-center">
        <Row>
          <Col xs={10} xl={10} className="text-right">
            <strong>Items weight: </strong>
          </Col>
          <Col xs={2} xl={2} className="text-right">
            {order.itemsWeight || 0}g
          </Col>
        </Row>
        <Row>
          <Col xs={10} xl={10} className="text-right">
            <strong>Total weight: </strong>
          </Col>
          <Col xs={2} xl={2} className="text-right">
            {order.totalWeight || 0}g
          </Col>
        </Row>
      </Card.Header>
    </Card>
  )
}

export default OrderWeightsSummary
