import React from "react"
import { Form, Col, Row, ListGroup, Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { savePaymentMethodAction } from "../../actions/cartActions"
import Message from "../Message"
import { PaymentStatus } from "../Utils"
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

  const showLinks = links => {
    const arr = JSON.parse(links)
    console.log("arr: ", arr)
    return Object.keys(arr).map(key => (
      <Row key={key}>
        <Col xs={4} sm={6} lg={4} className="p-0 m-0">
          <small>
            <i>{key}: </i>
          </small>
        </Col>
        <Col className="m-0 p-0">
          <a href={arr[key].href} target="_blank" rel="noreferrer">
            {arr[key].href.substring(0, 20)}...
          </a>
        </Col>
      </Row>
    ))
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col lg={3} md={3} sm={3} className="pl-0">
          <h4>PAYMENT METHOD</h4>
        </Col>
        <Col>
          {(checkoutStep === "payment" || (checkoutStep === "order" && !order.isPaid)) && (
            <Form className="mb-3">
              <Form.Group>
                <Row>
                  <Col xs={6} xl={6}>
                    <Card bg="light">
                      <Card.Header className="text-center">
                        <img src="/assets/payments/mollie-all.jpeg" alt="mollie-ideal" style={{ width: "100%" }} />
                      </Card.Header>
                      <Card.Body className="text-center">{radioButton("Mollie", "Mollie")}</Card.Body>
                    </Card>
                  </Col>
                  <Col xs={6} xl={6}>
                    <Card bg="light">
                      <Card.Header className="text-center">
                        <img src="/assets/payments/pay.png" alt="paypal" style={{ width: "100%" }} />
                      </Card.Header>
                      <Card.Body className="text-center">{radioButton("PayPal", "PayPal")}</Card.Body>
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
                <PaymentRow name="Payment Method">
                  <span className="text-capitalize">{order.paymentMethod}</span>
                </PaymentRow>
              )}
              <PaymentRow name="Payment ID">{order.paymentResult.id}</PaymentRow>
              <PaymentRow name="Status">{order.paymentResult && order.paymentResult.status && <PaymentStatus paymentStatus={order.paymentResult.status} />}</PaymentRow>
              {order.paymentResult && order.paymentResult.email && <PaymentRow name="Email"> {order.paymentResult.email}</PaymentRow>}
              {userInfo && userInfo.isAdmin && <PaymentRow name="Links">{order.paymentResult.links && showLinks(order.paymentResult.links)}</PaymentRow>}
            </>
          )}
          {checkoutStep === "order" && !order.isPaid && checkoutStep !== "payment" && <Message variant="warning">Not Paid</Message>}
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

const PaymentRow = ({ name, children }) => {
  return (
    <Row>
      <Col xl={2} xs={2} className="mr-2 h6 mb-0">
        {name}
      </Col>
      <Col className="p-0 m-0">{children}</Col>
    </Row>
  )
}

export default PaymentSection
