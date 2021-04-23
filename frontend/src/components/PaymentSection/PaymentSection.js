import React from "react"
import { Form, Col, Row, ListGroup, Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { savePaymentMethodAction } from "../../actions/cartActions"
import Message from "../Message"
import { PaymentStatus, OrderDetailsRow, showLink } from "../Utils"
import "./PaymentSection.css"

const PaymentSection = ({ order, checkoutStep, userInfo, paymentMethod, setPaymentMethod }) => {
  const dispatch = useDispatch()

  const onSelectPaymentMethod = e => {
    setPaymentMethod(e.target.value)
    dispatch(savePaymentMethodAction(e.target.value))
  }

  const radioButton = (label, name) => (
    <Form.Check //
      type="radio"
      label={label}
      id={name}
      name="paymentMethod"
      value={name}
      checked={paymentMethod === name}
      onChange={onSelectPaymentMethod}
    ></Form.Check>
  )

  return (
    <ListGroup.Item>
      <Row>
        <Col lg={3} md={3} sm={3} className="pl-0">
          <h4>PAYMENT METHOD</h4>
        </Col>
        <Col className="pl-0 pt-0">
          {(checkoutStep === "payment" || (checkoutStep === "order" && !order.isPaid)) && (
            <Form className="mb-3 mt-0 pt-0">
              <Form.Group className="mt-2">
                <Row>
                  <Col xs={6} xl={6} className="pl-0 pr-2 pt-0">
                    <Card bg="light" style={{ height: "100%" }}>
                      <Card.Header className="text-center">
                        <img src="/assets/payments/mollie-all.jpeg" alt="mollie-ideal" style={{ width: "100%" }} />
                      </Card.Header>
                      <Card.Body className="text-center py-2">{radioButton("Mollie", "Mollie")}</Card.Body>
                    </Card>
                  </Col>
                  <Col xs={6} xl={6} className="pl-2 pr-0">
                    <Card bg="light" style={{ height: "100%" }}>
                      <Card.Header className="text-center">
                        <img src="/assets/payments/pay.png" alt="paypal" style={{ width: "100%" }} />
                      </Card.Header>
                      <Card.Body className="text-center py-2">{radioButton("PayPal", "PayPal")}</Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          )}
          {order.isPaid && (
            <>
              <Message variant="success">Paid on {new Date(order.paidAt).toString()}</Message>
              {order.paymentMethod && (
                <OrderDetailsRow name="Payment Method" className="text-capitalize">
                  {order.paymentMethod}
                </OrderDetailsRow>
              )}
              <OrderDetailsRow name="Payment ID">{order.paymentResult.id}</OrderDetailsRow>
              <OrderDetailsRow name="Status">{order.paymentResult && order.paymentResult.status && <PaymentStatus paymentStatus={order.paymentResult.status} />}</OrderDetailsRow>
              {order.paymentResult && order.paymentResult.email && <OrderDetailsRow name="Email"> {order.paymentResult.email}</OrderDetailsRow>}

              {userInfo && userInfo.isAdmin && order.paymentResult.links && <OrderDetailsRow name="Links">{showLink(order.paymentResult.links)}</OrderDetailsRow>}
            </>
          )}
          {checkoutStep === "order" && !order.isPaid && checkoutStep !== "payment" && <Message variant="warning">Not Paid</Message>}
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default PaymentSection
