import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"
import FormContainer from "../../components/FormContainer"
import Loader from "../../components/Loader"
import { Col, Row } from "react-bootstrap"
import { molliePayAction, payOrderAction } from "../../actions/orderActions"
import "./PlaceOrderScreen.css"

const PlaceOrder = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const orderCreate = useSelector(state => state.orderCreate)
  const { loading, order, success, error } = orderCreate

  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    if (order) {
      if (order && order.paymentMethod === "Mollie") {
        proceedMollyPayment(order)
        setTimeout(() => {
          history.push(`/orders/${order._id}`)
        }, 9000)
      }

      if (order && order.paymentMethod === "PayPal") {
        //   dispatch({ type: USER_DETAILS_RESET })
        //   dispatch({ type: ORDER_CREATE_RESET })
        //   history.push(`/orders/${order._id}/paypal?total=${order.totalPrice}`)
      }
      // history.push(`/orders/${order._id}`)
    }
    // dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: ORDER_CREATE_RESET })
  }, [order])

  const successPaymentHandler = paymentResult => {
    dispatch(payOrderAction(order._id, paymentResult))
    history.push(`/orders/${order._id}`)
  }

  useEffect(() => {
    if (order && order.paymentMethod === "PayPal") {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [order])

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

  const proceedMollyPayment = order => {
    const data = {
      totalPrice: order.totalPrice,
      currency: "EUR",
      description: `Order #${order._id}`,
      orderId: order._id
    }
    dispatch(molliePayAction(data))
  }

  return (
    <FormContainer className="hide-container mt-6">
      {success && order && order.paymentMethod === "mollie" && <Loader />}
      {success && order && order.paymentMethod === "paypal" && (
        <Row>
          <Col md={3}></Col>
          <Col md={6}>{loading && !sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}</Col>
          <Col md={3}></Col>
        </Row>
      )}
    </FormContainer>
  )
}

export default PlaceOrder
