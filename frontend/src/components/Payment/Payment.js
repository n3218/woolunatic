import React, { useState, useEffect } from "react"
import axios from "axios"
import { Form, Button, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { savePaymentMethodAction } from "../../actions/cartActions"
import { PayPalButton } from "react-paypal-button-v2"
import Message from "../Message"
import Loader from "../Loader"
import { molliePayAction, payOrderAction } from "../../actions/orderActions"
import MolliePayment from "../PaymentMollie"
import "./Payment.css"
import PaymentStatus from "../PaymentStatus"

const Payment = ({ order, userInfo }) => {
  const dispatch = useDispatch()
  const orderId = order._id
  const [paymentMethod, setPaymentMethod] = useState("")
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order])

  const onSelectPaymentMethod = e => {
    setPaymentMethod(e.target.value)
    dispatch(savePaymentMethodAction(e.target.value))
  }

  const successPaymentHandler = paymentResult => {
    dispatch(payOrderAction(orderId, paymentResult))
  }

  const proceedMollyPayment = () => {
    const data = {
      totalPrice: order.totalPrice,
      currency: "EUR",
      description: `Order #${order._id}`,
      orderId: order._id
    }
    dispatch(molliePayAction(data))
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
        <Col className="p-0 m-0">
          <small>
            <i>{key}: </i>
          </small>
        </Col>
        <Col className="m-0 p-0">
          <a href={arr[key].href} target="_blank" rel="noreferrer">
            {arr[key].href.substring(0, 30)}...
          </a>
        </Col>
      </Row>
    ))
  }

  return (
    <>
      {!order.isPaid && (
        <>
          <Form.Group className="mb-3">
            <Form.Group>
              <Row>
                <Col xs={3} lg={2} xl={2}>
                  {radioButton("Mollie", "Mollie")}
                </Col>
                <Col>
                  <img src="/assets/payments/ideal.svg" className="payment-icon" alt="ideal" />
                  <img src="/assets/payments/sepa.svg" className="payment-icon" alt="sepa" />
                  <img src="/assets/payments/ing.svg" className="payment-icon" alt="ing" />
                  <img src="/assets/payments/applepay.svg" className="payment-icon" alt="applepay" />
                  <img src="/assets/payments/visa.svg" className="payment-icon" alt="visa" />
                  <img src="/assets/payments/mastercard.svg" className="payment-icon" alt="mastercard" />
                  <img src="/assets/payments/amex.svg" className="payment-icon" alt="amex" />
                </Col>
              </Row>
              {!order.isPaid && paymentMethod === "Mollie" && (
                <Col md={6}>
                  {
                    <Button className="btn-block btn-success my-3" onClick={proceedMollyPayment}>
                      Pay via Mollie
                    </Button>
                  }
                </Col>
              )}
              <Row>
                <Col xs={3} lg={2} xl={2}>
                  {radioButton("PayPal", "PayPal")}
                </Col>
                <Col>
                  <img src="/assets/payments/paypal.svg" className="payment-icon" alt="paypal" />
                  <img src="/assets/payments/visa.svg" className="payment-icon" alt="visa" />
                  <img src="/assets/payments/mastercard.svg" className="payment-icon" alt="mastercard" />
                  <img src="/assets/payments/amex.svg" className="payment-icon" alt="amex" />
                </Col>
              </Row>
            </Form.Group>
          </Form.Group>
        </>
      )}
      {!order.isPaid && paymentMethod === "PayPal" && <Col md={6}>{!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}</Col>}

      {order.isPaid && (
        <>
          <Message variant="success">Paid on {new Date(order.paidAt).toString()}</Message>
          {order.paymentMethod && (
            <PaymentRow val1="Payment Method">
              <span className="text-capitalize">{order.paymentMethod}</span>
            </PaymentRow>
          )}
          <PaymentRow val1="Payment ID">{order.paymentResult.id}</PaymentRow>
          <PaymentRow val1="Status">{order.paymentResult && order.paymentResult.status && <PaymentStatus paymentStatus={order.paymentResult.status} />}</PaymentRow>
          {order.paymentResult && order.paymentResult.email && <PaymentRow val1="Email"> {order.paymentResult.email}</PaymentRow>}
          {userInfo && userInfo.isAdmin && <PaymentRow val1="Links">{order.paymentResult.links && showLinks(order.paymentResult.links)}</PaymentRow>}
        </>
      )}
      {!order.isPaid && !paymentMethod && <Message variant="warning">Not Paid</Message>}
    </>
  )
}

const PaymentRow = ({ val1, children }) => {
  return (
    <Row>
      <Col xl={2} xs={2} className="mr-2 h6 mb-0">
        {val1}
      </Col>
      <Col className="p-0 m-0">{children}</Col>
    </Row>
  )
}

export default Payment
