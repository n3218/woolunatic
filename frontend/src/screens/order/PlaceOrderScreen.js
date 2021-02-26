import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"
import FormContainer from "../../components/FormContainer"
import Loader from "../../components/Loader"
import { Col, Row } from "react-bootstrap"
import { molliePayAction, payOrderAction } from "../../actions/orderActions"
import "./PlaceOrderScreen.css"
import Message from "../../components/Message"

const PlaceOrder = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const orderCreate = useSelector(state => state.orderCreate)
  const { loading, order, success, error } = orderCreate

  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    if (order) {
      console.log("order: ", order)

      if (order && order.paymentMethod === "PayPal") {
        console.log("order.paymentMethod: ", order.paymentMethod)
        if (!window.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }

      if (order && order.paymentMethod === "Mollie") {
        proceedMollyPayment(order)
        setTimeout(() => {
          history.push(`/orders/${order._id}`)
        }, 9000)
      }
    }
    // dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: ORDER_CREATE_RESET })
  }, [order.paymentMethod, history])

  useEffect(() => {
    console.log("--------------sdkReady: ", sdkReady)
  }, [sdkReady])

  const successPaymentHandler = paymentResult => {
    dispatch(payOrderAction(order._id, paymentResult))
    history.push(`/orders/${order._id}`)
  }

  const addPayPalScript = async () => {
    console.log("addPayPalScript")
    const { data: clientId } = await axios.get("/api/config/paypal")
    console.log("clientId: ", clientId)
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
      console.log("setSdkReady(true)")
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
      {error && <Message variant="danger">{error}</Message>}
      {success && order && order.paymentMethod === "mollie" && <Loader />}
      {success && order && order.paymentMethod === "paypal" && (
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            {loading && <Loader />}
            {sdkReady && <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
          </Col>
          <Col md={3}></Col>
        </Row>
      )}
    </FormContainer>
  )
}

export default PlaceOrder
