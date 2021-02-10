import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Button, ListGroup } from "react-bootstrap"
import { cartAddItemAction, cartCleanItemsAction, cartCheckItemsAction, cartRemoveItemsFromDBAction } from "../../actions/cartActions"
import Message from "../../components/Message"
import Meta from "../../components/Meta"
import CartItems from "../../components/CartItems"
import OrderSummary from "../../components/OrderSummary"
import ShippingSection from "../../components/ShippingSection"
import PaymentSection from "../../components/PaymentSection/PaymentSection"
import CheckoutSteps from "../../components/CheckoutSteps"
import OrderWeightsSummary from "../../components/OrderWeightsSummary"
import { USER_DETAILS_RESET } from "../../constants/userConstants"
import { ORDER_CREATE_RESET } from "../../constants/orderConstants"
import { createOrderAction, molliePayAction } from "../../actions/orderActions"
import HideScreen from "../HideScreen/HideScreen"
import Loader from "../../components/Loader"
import "./CartScreen.css"

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
  const [hideScreen, setHideScreen] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  if (!userInfo) {
    history.push("/login")
  }
  if (checkoutStep && cartItems && cartItems.length === 0) {
    history.push("/cart")
  }
  // ----------------------------------------------Add to Cart Item
  useEffect(() => {
    if (productId) {
      dispatch(cartAddItemAction(productId, qty))
    }
  }, [dispatch, productId, qty, cartItems])
  // ----------------------------------------------/Add to Cart Item
  //
  //
  //
  //
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
      showWarningHandler()
    }
  }, [cartItems, checkoutStep, dispatch])
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
        setHideScreen(true)
        proceedMollyPayment(order)
        dispatch({ type: USER_DETAILS_RESET })
        dispatch({ type: ORDER_CREATE_RESET })
        history.push(`/orders/${order._id}/mollie?total=${order.totalPrice}`)
      }
      if (order && paymentMethod === "PayPal") {
        setHideScreen(true)
        dispatch({ type: USER_DETAILS_RESET })
        dispatch({ type: ORDER_CREATE_RESET })
        history.push(`/orders/${order._id}/paypal?total=${order.totalPrice}`)
      }
    }
    // eslint-disable-next-line
  }, [success])

  const placeOrderHandler = () => {
    dispatch(cartCheckItemsAction(cartItems))
    showWarningHandler()
    dispatch(cartCleanItemsAction())
    dispatch(cartRemoveItemsFromDBAction(cartItems))
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
  // -------------------------------------------------/Order Creation

  const proceedMollyPayment = order => {
    const data = {
      totalPrice: order.totalPrice,
      currency: "EUR",
      description: `Order #${order._id}`,
      orderId: order._id
    }
    dispatch(molliePayAction(data))
  }

  const checkoutHandler = () => {
    dispatch(cartCleanItemsAction())
    showWarningHandler()
    if (userInfo) {
      history.push("/cart/checkout/shipping")
    } else {
      history.push("/login?redirect=cart/checkout/shipping")
    }
  }

  const showWarningHandler = () => {
    if (cartItems) {
      let res = cartItems.filter(it => it.message && it.message.length > 0)
      if (res.length > 0) {
        setShowWarning(true)
      } else {
        setShowWarning(false)
      }
    }
  }

  useEffect(() => {
    dispatch(cartCheckItemsAction(cartItems))
  }, [productId, checkoutStep, paymentMethod])

  useEffect(() => {
    showWarningHandler()
  }, [productId, checkoutStep, paymentMethod])

  return (
    <>
      {hideScreen && <HideScreen orderId={order._id} total={order.totalPrice} paymentMethod={order.paymentMethod} />}
      <Meta title="Shopping Cart | Woolunatics" />

      {checkoutStep ? <h2>Checkout</h2> : <h2>Shopping Cart</h2>}
      {checkoutStep && <CheckoutSteps step={checkoutStep} />}
      {cartItems && cartItems.length === 0 && (
        <Message variant="success" className="py-5">
          Your cart is empty <br /> <Link to="/">Go Shopping...</Link>
        </Message>
      )}
      {showWarning && (
        <Message variant="danger" className="py-5">
          Some of items in your cart are out of stock
        </Message>
      )}
      <Row>
        <Col md={9} xs={12}>
          <ListGroup variant="flush">
            {match.params.step && (
              <>
                {checkoutStep && checkoutStep === "shipping" && cartItems.length > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col lg={3} md={3} sm={6}>
                        <h4>SHIPPING ADDRESS</h4>
                      </Col>
                      <Col>
                        <ShippingSection onClickEvent={cartCleanItemsAction} cart={cart} history={history} checkoutStep={match.params.step} userInfo={userInfo} />
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
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

          {/* ---------------------------CART CHECKED ITEMS */}
          {cartItems && cartItems.length > 0 && (
            <>
              <CartItems items={cartItems} />
              <OrderWeightsSummary order={summary} />
            </>
          )}
          {/* ---------------------------/CART CHECKED ITEMS */}
        </Col>

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
