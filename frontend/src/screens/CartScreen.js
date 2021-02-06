import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Button, ListGroup, Card } from "react-bootstrap"
import { cartAddItemAction, cartCleanItemsAction, cartUpdateItemAction } from "../actions/cartActions"
import Message from "../components/Message"
import Meta from "../components/Meta"
import CartItems from "../components/CartItems"
import OrderSummary from "../components/OrderSummary"
import ShippingSection from "../components/ShippingSection"
import PaymentSection from "../components/PaymentSection/PaymentSection"
import CheckoutSteps from "../components/CheckoutSteps"
import OrderWeightsSummary from "../components/OrderWeightsSummary"
import { USER_DETAILS_RESET } from "../constants/userConstants"
import { ORDER_CREATE_RESET } from "../constants/orderConstants"
import { createOrderAction, molliePayAction } from "../actions/orderActions"

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const checkoutStep = match.params.step
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split("=")[1].split("&")[0]) : 1
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const [paymentMethod, setPaymentMethod] = useState("")
  const [summary, setSummary] = useState({})

  if (!cart.shippingAddress.address) {
    history.push("/cart/checkout/shipping")
  }
  if (!userInfo) {
    history.push("/login")
  }

  useEffect(() => {
    if (productId) {
      dispatch(cartAddItemAction(productId, qty))
    }
    if (cartItems.length === 0) {
      history.push("/cart")
    }
  }, [dispatch, productId, qty, cartItems, history])

  // ----------------------------------------------Calculating prices
  useEffect(() => {
    if (cartItems) {
      let taxPrice = 0
      let shippingPrice = 0
      const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
      const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + (item.price * item.qty) / 100, 0))
      if (checkoutStep === "payment") {
        taxPrice = addDecimals(Number(((21.0 * itemsPrice) / 100).toFixed(2)))
        shippingPrice = addDecimals(itemsPrice > 100 ? 26 : 26)
      }
      const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2)
      const itemsWeight = cartItems.reduce((acc, item) => acc + item.qty, 0)
      const totalWeight = itemsWeight + 300 + cartItems.length * 40
      setSummary({ itemsPrice, taxPrice, shippingPrice, totalPrice, itemsWeight, totalWeight })
    }
  }, [cartItems, checkoutStep])
  // ---------------------------------------------/Calculating prices
  //
  //
  //
  // -------------------------------------------------Order Creation
  const orderCreate = useSelector(state => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      if (order && paymentMethod === "Mollie") {
        proceedMollyPayment(order)
      }
      history.push(`/hidescreen`)
    }
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_CREATE_RESET })
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: summary.itemsPrice,
        taxPrice: summary.taxPrice,
        shippingPrice: summary.shippingPrice,
        totalPrice: summary.totalPrice,
        itemsWeight: summary.itemsWeight,
        totalWeight: summary.totalWeight
      })
    )
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

  const checkoutHandler = async () => {
    await cartItems.map(item => dispatch(cartUpdateItemAction(item.product, item.qty)))
    dispatch(cartCleanItemsAction())
    if (userInfo) {
      history.push("/cart/checkout/shipping")
    } else {
      history.push("/login?redirect=cart/checkout/shipping")
    }
  }

  return (
    <>
      <Meta title="Shopping Cart | Woolunatics" />
      {checkoutStep ? <h2>Checkout</h2> : <h2>Shopping Cart</h2>}
      {checkoutStep && <CheckoutSteps step={checkoutStep} />}
      <Row>
        <Col md={9} xs={12}>
          <ListGroup variant="flush">
            {match.params.step && (
              <>
                <ListGroup.Item>
                  <Row>
                    <Col lg={3} md={3} sm={6}>
                      <h4>SHIPPING ADDRESS</h4>
                    </Col>
                    <Col>
                      <ShippingSection cart={cart} history={history} checkoutStep={match.params.step} userInfo={userInfo} />
                    </Col>
                  </Row>
                </ListGroup.Item>

                {checkoutStep && checkoutStep !== "shipping" && (
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
                )}

                <ListGroup.Item>
                  <h4>ORDER ITEMS</h4>
                </ListGroup.Item>
              </>
            )}
          </ListGroup>

          {cartItems.length === 0 ? (
            <Message variant="success" className="py-5">
              Your cart is empty <br /> <Link to="/">Go Shopping...</Link>
            </Message>
          ) : (
            <>
              <CartItems items={cartItems} />
              <OrderWeightsSummary order={summary} />
            </>
          )}
        </Col>
        {/* 
        //
        //
        // 
        // 
        */}
        {cartItems && cartItems.length > 0 && (
          <Col>
            <OrderSummary cart={summary} items={cartItems} checkoutStep={checkoutStep} error={error}>
              {/* ---------------------------CART CHECKOUT BUTTONS */}
              {!match.params.step && (
                <>
                  <Button type="button" className="btn-block btn-success my-3" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                    Checkout
                  </Button>
                  <Button type="button" className="btn-block btn-success bg-blue my-3" onClick={() => history.push("/yarns")}>
                    Continue shopping
                  </Button>
                </>
              )}
              {/* ---------------------------/CART CHECKOUT BUTTONS */}
              {/* ---------------------------PAYMENT BUTTONS */}
              {paymentMethod && (
                <Button className="btn-success btn-block" onClick={() => placeOrderHandler()}>
                  Pay via {paymentMethod}
                </Button>
              )}
              {/* ---------------------------/PAYMENT BUTTONS */}
            </OrderSummary>
          </Col>
        )}
      </Row>
    </>
  )
}

export default CartScreen
