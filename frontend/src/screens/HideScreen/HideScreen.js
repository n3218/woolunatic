import React, { useEffect, useState } from "react"
import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"
import FormContainer from "../../components/FormContainer"
import Loader from "../../components/Loader"
import { Form, Button, Col, Row } from "react-bootstrap"
import { molliePayAction, payOrderAction } from "../../actions/orderActions"

import "./HideScreen.css"
import { useDispatch } from "react-redux"

const HideScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const total = Number(location.search.split("=")[1])
  const orderId = match.params.id
  const paymentMethod = match.params.paymentmethod
  const [sdkReady, setSdkReady] = useState(false)

  console.log("match: ", match)
  console.log("location: ", location)
  console.log("total: ", total)
  console.log("typeof total: ", typeof total)
  console.log("paymentMethod: ", paymentMethod)
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

    if (!window.paypal) {
      addPayPalScript()
    } else {
      setSdkReady(true)
    }
  }, [orderId])

  const successPaymentHandler = paymentResult => {
    dispatch(payOrderAction(orderId, paymentResult))
    history.push(`/orders/${orderId}`)
  }

  return (
    <FormContainer className="hide-container mt-6">
      {paymentMethod === "mollie" && <Loader />}
      {paymentMethod === "paypal" && (
        <Row>
          <Col md={3}></Col>
          <Col md={6}>{!sdkReady ? <Loader /> : <PayPalButton amount={total} onSuccess={successPaymentHandler} />}</Col>
          <Col md={3}></Col>
        </Row>
      )}
    </FormContainer>
  )
}

export default HideScreen
