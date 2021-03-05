import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Button } from "react-bootstrap"
import { getCartAction, startCheckoutAction } from "../../actions/cartActions"
import Message from "../../components/Message"
import Meta from "../../components/Meta"
import CartItem from "../../components/CartItem"
import OrderSummary from "../../components/OrderSummary"
import CheckoutSteps from "../../components/CheckoutSteps"
import OrderWeightsSummary from "../../components/OrderWeightsSummary"
import Loader from "../../components/Loader"
import { createOrderAction } from "../../actions/orderActions"
import { ORDER_CREATE_RESET } from "../../constants/orderConstants"
import { USER_DETAILS_REQUEST } from "../../constants/userConstants"
import { getUserDetails } from "../../actions/userActions"

const CartLayout = ({ history, redirect, checkoutStep, title, children, loading, error }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector(state => state.cart)
  const { loading: cartLoading, error: cartError, items, success: cartSuccess } = cart
  const [summary, setSummary] = useState({})
  const [warning, setWarning] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const orderCreate = useSelector(state => state.orderCreate)
  const { loading: orderLoading, order, success, error: orderError } = orderCreate

  useEffect(() => {
    if (!userInfo) {
      if (redirect) {
        history.push(`/login?redirect=${redirect}`)
      } else {
        history.push(`/login`)
      }
    } else {
      dispatch(getUserDetails(userInfo._id))
    }
  }, [cart, history, redirect, userInfo, dispatch])

  // ------------------------------------------------------------------------Calculating totals
  useEffect(() => {
    if (items && items.length > 0) {
      let taxPrice = 0
      let shippingPrice = 0
      const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
      const itemsPrice = addDecimals(items.reduce((acc, item) => acc + (item.price * item.qty) / 100, 0))
      if (checkoutStep === "payment") {
        taxPrice = addDecimals(Number((21.0 * itemsPrice) / 100))
        shippingPrice = addDecimals(itemsPrice > 100 ? 26 : 26)
      }
      const storecredit = userInfo.storecredit || 0
      const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice) - Number(storecredit)).toFixed(2)
      const itemsWeight = items.reduce((acc, item) => acc + item.qty, 0)
      const totalWeight = itemsWeight + 300 + items.length * 40
      setSummary({ itemsPrice, taxPrice, shippingPrice, storecredit, totalPrice, itemsWeight, totalWeight })
    }
  }, [items, checkoutStep, dispatch, userInfo])
  // -----------------------------------------------------------------------/Calculating totals

  useEffect(() => {
    if (checkoutStep === "cart") {
      if (items && items.length > 0) {
        console.log("if (items && items.length > 0)")
        let res = items.filter(it => it.message && it.message.length > 0)
        console.log("items.filter(it => it.message && it.message.length > 0): ", res)

        if (res.length > 0) {
          console.log("-------------IF (res.length > 0)")
          setWarning(true)
          console.log("setWarning(true)")
          setCheckout(false)
          console.log("setCheckout(false)")
        } else {
          console.log("-------------ELSE")
          setWarning(false)
          console.log("setWarning(false)")
          if (checkout) {
            setIsChecked(true)
          }
          console.log("setIsChecked(true)")
        }
      }
    }
  }, [items])

  useEffect(() => {
    if (cartSuccess && isChecked && checkout) {
      console.log("GO CKECKOUT, NO WARNING, IS CHECKED: ")
      dispatch(startCheckoutAction())
      history.push("/checkout/shipping")
    }
  }, [checkout, isChecked, cartSuccess])

  useEffect(() => {
    if (success && order) {
      dispatch({ type: ORDER_CREATE_RESET })
      history.push(`/checkout/payorder/${order._id}/${order.paymentMethod}`)
    }
  }, [order, history, success, dispatch])

  // ----------------------------------------------------------------------- Handlers
  const checkoutHandler = () => {
    console.log("checkoutHandler: dispatch(getCartAction())")
    dispatch(getCartAction())
    console.log("checkoutHandler: setCheckout(true)")
    setIsChecked(false)
    setCheckout(true)
  }

  const placeOrderHandler = () => {
    dispatch(
      createOrderAction({
        orderItems: cart.items,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: summary.itemsPrice,
        taxPrice: summary.taxPrice,
        shippingPrice: summary.shippingPrice,
        storecredit: summary.storecredit,
        totalPrice: summary.totalPrice,
        itemsWeight: summary.itemsWeight,
        totalWeight: summary.totalWeight
      })
    )
  }
  // ----------------------------------------------------------------------- /Handlers

  return (
    <>
      <Meta title={`${title} | Woolunatics`} />
      <h2>{title}</h2>
      {checkoutStep !== "cart" && <CheckoutSteps step={checkoutStep} />}

      {(loading || cartLoading || orderLoading) && <Loader />}

      {(error || cartError || orderError) && (
        <Message variant="warning" className="py-4" onClose={() => dispatch(getCartAction())}>
          {error || cartError || orderError}
        </Message>
      )}

      {!error && !cartError && !loading && !cartLoading && (!items || items.length === 0) && (
        <Message variant="success" className="py-4">
          Your cart is empty <br /> <Link to="/yarns">Go Shopping...</Link>
        </Message>
      )}

      {warning && (
        <Message variant="danger" className="py-4">
          Some of items in your cart are out of stock
        </Message>
      )}

      {items && items.length > 0 && !(cartSuccess && isChecked && checkout) && (
        <Row>
          <Col md={9} xs={12}>
            {/* --------------------------------------------------------------------SHIPPING/PAYMENT CONTENT */}
            {children && children}

            {/* --------------------------------------------------------------------ORDER ITEMS */}
            <ListGroup variant="flush">
              {checkoutStep !== "cart" && (
                <ListGroup.Item>
                  <h4>ORDER ITEMS</h4>
                </ListGroup.Item>
              )}
              {items.map(item => item && <CartItem key={`${item._id}-${item.qty}`} item={item} qty={item.qty} setCheckout={setCheckout} checkoutStep={checkoutStep} />)}
            </ListGroup>

            {/* --------------------------------------------------------------------ORDER WEIGHT SUMMARY */}
            <OrderWeightsSummary order={summary} />
          </Col>
          <Col>
            {/* --------------------------------------------------------------------ORDER SUMMARY */}
            <OrderSummary cart={summary} summary={summary} items={items} checkoutStep={checkoutStep} history={history} userInfo={userInfo}>
              {checkoutStep === "cart" && (
                <ListGroup.Item>
                  <Button type="button" className="btn-block btn-success my-3" disabled={items.length === 0 || warning} onClick={checkoutHandler}>
                    Checkout
                  </Button>
                  <Button type="button" className="btn-block btn-success bg-blue my-3" onClick={() => history.push("/yarns")}>
                    Continue shopping
                  </Button>
                </ListGroup.Item>
              )}
              {checkoutStep === "payment" && cart.paymentMethod && (
                <ListGroup.Item>
                  <Button className="btn-success btn-block" onClick={() => placeOrderHandler()}>
                    Place order and pay
                  </Button>
                </ListGroup.Item>
              )}
            </OrderSummary>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartLayout
