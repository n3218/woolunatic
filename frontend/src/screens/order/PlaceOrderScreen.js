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
import CartLayout from "./CartLayout"
import { ORDER_CREATE_RESET } from "../../constants/orderConstants"
import { USER_DETAILS_RESET } from "../../constants/userConstants"

const PlaceOrder = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const orderCreate = useSelector(state => state.orderCreate)
  const { loading, order, success, error } = orderCreate
  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  const [sdkReady, setSdkReady] = useState(false)

  useEffect(() => {
    if (order) {
      console.log("order: ", order)

      if (order && order.paymentMethod === "PayPal") {
        const addPayPalScript = async () => {
          console.log("addPayPalScript")
          const { data: clientId } = await axios.get("/api/config/paypal")
          console.log("=============================clientId: ", clientId)
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

        console.log("order.paymentMethod: ", order.paymentMethod)
        if (!successPay && !order.isPaid) {
          if (!window.paypal) {
            addPayPalScript()
          } else {
            setSdkReady(true)
          }
        }
        if (successPay) {
          // dispatch({ type: USER_DETAILS_RESET })
          // dispatch({ type: ORDER_CREATE_RESET })
          history.push(`/orders/${order._id}`)
        }
      }

      if (order && order.paymentMethod === "Mollie") {
        const data = {
          totalPrice: order.totalPrice,
          currency: "EUR",
          description: `Order #${order._id}`,
          orderId: order._id
        }
        console.log("proceedMollyPayment: data: ", data)
        dispatch(molliePayAction(data))
        // setTimeout(() => {
        //   history.push(`/orders/${order._id}`)
        // }, 9000)
      }
    }
  }, [order, history, successPay, dispatch])

  useEffect(() => {
    console.log("--------------sdkReady: ", sdkReady)
  }, [sdkReady])

  const successPaymentHandler = paymentResult => {
    console.log("successPaymentHandler")
    console.log("paymentResult: ", paymentResult)
    dispatch(payOrderAction(order._id, paymentResult))
  }

  return (
    // <CartLayout history={history} title="Payment">
    <FormContainer className="hide-container pt-6">
      {error && <Message variant="danger">{error}</Message>}
      {success && order && order.paymentMethod === "mollie" && <Loader />}

      {/* {success && order && order.paymentMethod === "paypal" && ( */}
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          {loading && !sdkReady && <Loader />}

          {sdkReady && <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
        </Col>
        <Col md={3}></Col>
      </Row>
      {/* )} */}
    </FormContainer>
    // </CartLayout>
  )
}

export default PlaceOrder
