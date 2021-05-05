import React from "react"
import { Row, Col, Card } from "react-bootstrap"

const OrderWeightsSummary = ({ order }) => {
  return (
    <>
      <Card border="light" className="mb-3">
        <Card.Header>
          <Row>
            <Col xs={10} xl={10} className="text-right">
              <strong>Items weight: </strong>
            </Col>
            <Col xs={2} xl={2} className="text-right">
              <nobr>{order.itemsWeight || 0}g</nobr>
            </Col>
          </Row>
          <Row>
            <Col xs={10} xl={10} className="text-right">
              <strong>Estimated total weight: </strong>
            </Col>
            <Col xs={2} xl={2} className="text-right">
              <nobr>{order.totalWeight || 0}g</nobr>
            </Col>
          </Row>
        </Card.Header>
      </Card>
      <div className="jumbotron text-right">
        <h5>Test user for PayPal payments : sb-k30x54012881@personal.example.com</h5>
        <h5>Test password for PayPal payments : {`RHU*Oy6{`}</h5>
      </div>
    </>
  )
}

export default OrderWeightsSummary
