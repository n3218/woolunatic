import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Button, Card, ListGroup } from "react-bootstrap"
// import { cartCheckItemsAction } from "../actions/cartActions"
import Message from "../../components/Message"
import Meta from "../../components/Meta"
import CartItems from "../../components/CartItems"
import ShippingSection from "../../components/ShippingSection"
// import PaymentSection from "../components/PaymentSection"
import CheckoutSteps from "../../components/CheckoutSteps"
import OrderSummary from "../../components/OrderSummary"
import PaymentSection from "../../components/PaymentSection/PaymentSection"

const CartScreen = ({ match, location, history }) => {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("")

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
    if (cartItems.length === 0) {
      history.push("/cart")
    }
  }, [history, userInfo, cartItems, checkoutStep])

  const PayOrder = () => {
    console.log("PayOrder")
  }

  console.log("CHECKOUT STEP: ", checkoutStep)
  return (
    <>
      <Meta title="Shopping Cart | Woolunatics" />
      <h2>Checkout</h2>
      <CheckoutSteps step={checkoutStep} setCheckoutStep={setCheckoutStep} />
      <Row>
        <Col md={9} xs={12}>
          <ListGroup variant="flush">
            {/* ------------------------------------ SHIPPING ADDRESS ------------------------------ */}
            <ListGroup.Item>
              <Row>
                <Col lg={3} md={3} sm={6}>
                  <h4>SHIPPING ADDRESS</h4>
                </Col>
                <Col>
                  <ShippingSection cart={cart} setCheckoutStep={setCheckoutStep} checkoutStep={checkoutStep} userInfo={userInfo} />
                </Col>
              </Row>
            </ListGroup.Item>

            {/* ------------------------------------ PAYMENT ------------------------------------- */}
            <ListGroup.Item>
              <Row>
                <Col lg={3} md={3} sm={6}>
                  <h4>PAYMENT METHOD</h4>
                </Col>
                <Col>
                  <PaymentSection order={cart} userInfo={userInfo} checkoutStep={checkoutStep} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                </Col>
              </Row>
            </ListGroup.Item>

            {/* ------------------------------------ ORDER ITEMS ------------------------------ */}
            <ListGroup.Item>
              <h4>ORDER ITEMS</h4>
              {cart.cartItems.length === 0 ? <Message>Your cart is empty.</Message> : <CartItems items={cart.cartItems} checkoutStep={checkoutStep} />}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <OrderSummary cart={cart} items={cartItems}>
            {paymentMethod && (
              <Button className="btn-success btn-block" onClick={() => PayOrder()}>
                Pay via {paymentMethod}
              </Button>
            )}
          </OrderSummary>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
