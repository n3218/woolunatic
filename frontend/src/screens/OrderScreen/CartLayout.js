import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Button } from "react-bootstrap"
import { cartCleanAllAction, getCartAction, startCheckoutAction, cartCleanHoldsAction } from "../../actions/cartActions"
import Message from "../../components/Message"
import Meta from "../../components/Meta"
import CartItem from "../../components/CartItem"
import OrderSummary from "../../components/OrderSummary"
import CheckoutSteps from "../../components/CheckoutSteps"
import OrderWeightsSummary from "../../components/OrderWeightsSummary"
import Loader from "../../components/Loader"
import { createOrderAction } from "../../actions/orderActions"
import { ORDER_CREATE_RESET } from "../../constants/orderConstants"
import { calculateWeight } from "../../components/Utils"
import { GET_CART_RESET } from "../../constants/cartConstants"
import { startCheckoutPeriod } from "../../constants/commonConstans"

const CartLayout = ({ history, redirect, checkoutStep, title, children, loading, error, shippingPrice }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector(state => state.cart)
  const { loading: cartLoading, error: cartError, items, success: cartSuccess, startCheckout } = cart
  const orderCreate = useSelector(state => state.orderCreate)
  const { loading: orderLoading, order, success: orderCreateSuccess, error: orderCreateError } = orderCreate

  const [summary, setSummary] = useState({})
  const [warning, setWarning] = useState(false)
  const [checkout, setCheckout] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  // ----------------------------------------------Calculating totals
  useEffect(() => {
    if (userInfo && userInfo._id) {
      readCookie(userInfo._id) // --------??????
    }
    if (items && items.length > 0) {
      const { itemsWeight, totalWeight } = calculateWeight(items)
      const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
      const itemsPrice = addDecimals(items.reduce((acc, item) => acc + (item.price * item.qty) / 100, 0))
      let taxPrice = (itemsPrice - itemsPrice / 1.21).toFixed(2)
      const storecredit = cart.user && cart.user.storecredit ? cart.user.storecredit : 0
      const totalPrice = (Number(itemsPrice) + Number(shippingPrice) - Number(storecredit)).toFixed(2)
      setSummary({ itemsPrice, taxPrice, shippingPrice, storecredit, totalPrice, itemsWeight, totalWeight })
    }
  }, [items, checkoutStep, dispatch, userInfo, shippingPrice, cart])

  useEffect(() => {
    if (warning === true) {
      dispatch(cartCleanHoldsAction())
      setTimeout(() => {
        dispatch(getCartAction())
      }, 1000)
    }
  }, [dispatch, warning])

  useEffect(() => {
    if (checkoutStep === "cart") {
      if (items && items.length > 0) {
        let res = items.filter(it => it.message && it.message.length > 0)
        if (res.length > 0) {
          setWarning(true)
          setCheckout(false)
        } else {
          setWarning(false)
          if (checkout) {
            setIsChecked(true)
          }
        }
      }
    }
  }, [items, checkout, checkoutStep])

  useEffect(() => {
    if (orderCreateSuccess && order) {
      dispatch({ type: ORDER_CREATE_RESET })
      dispatch({ type: GET_CART_RESET })
      dispatch(cartCleanAllAction())
      history.push(`/checkout/payorder/${order._id}/${order.paymentMethod}`)
    }
  }, [order, history, orderCreateSuccess, dispatch])

  // ------------------------------------------------------ GO CKECKOUT, NO WARNING, IS CHECKED
  useEffect(() => {
    if (cartSuccess && isChecked && checkout) {
      console.log("GO CKECKOUT, NO WARNING, IS CHECKED: ")
      dispatch(startCheckoutAction())
      writeCookie("checkoutStarted", userInfo._id, startCheckoutPeriod)

      setTimeout(() => {
        dispatch(cartCleanHoldsAction()) // timeout counting 15min from checkout start
        history.push("/cart")
      }, startCheckoutPeriod)

      history.push("/checkout/shipping")
    }
  }, [checkout, isChecked, cartSuccess, dispatch, history, userInfo, startCheckout])

  // ------------------------------------------------------ Cookie
  const writeCookie = (name, value, mins) => {
    let date
    let expires
    if (mins) {
      date = new Date()
      console.log("writeCookie: date: ", date)
      date.setTime(date.getTime() + mins * 60 * 1000)
      console.log("writeCookie: new date: ", date)
      expires = "; expires=" + date.toGMTString()
      console.log("writeCookie: expires: ", expires)
    } else {
      expires = ""
    }
    document.cookie = name + "=" + value + expires + "; path=/"
    console.log("writeCookie: document.cookie: ", document.cookie)
  }

  const readCookie = name => {
    let c
    let ca
    let nameEQ = name + "="
    ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      c = ca[i]
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length)
      }
      if (c.indexOf(nameEQ) === 0) {
        console.log("Header: readCookie: ", c.substring(nameEQ.length, c.length))
        return c.substring(nameEQ.length, c.length)
      }
    }
    return ""
  }

  // ------------------------------------------------------ Handlers
  const checkoutHandler = () => {
    setWarning(false)
    if (!userInfo) {
      console.log("NOT REGISTERED USER STARTS CHECKOUT")
      history.push("/login?redirect=/cart")
    } else {
      dispatch(getCartAction())
      setIsChecked(false)
      setCheckout(true)
    }
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
        totalWeight: summary.totalWeight,
        comment: cart.shippingAddress.comment
      })
    )
  }

  return (
    <>
      <Meta title={`${title} | Woolunatics`} />
      <h2>{title}</h2>
      {checkoutStep !== "cart" && <CheckoutSteps step={checkoutStep} />}

      {(loading || cartLoading || orderLoading) && <Loader />}

      {(error || cartError || orderCreateError) && (
        <Message variant="danger" className="py-4" onClose={() => dispatch(getCartAction())}>
          {error || cartError || orderCreateError}
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
          <Col md={8} xs={12} className="px-0">
            {/* --------------------------------------------------------------------SHIPPING/PAYMENT CONTENT */}
            {children && checkoutStep !== "cart" && children}
            {/* --------------------------------------------------------------------ORDER ITEMS */}
            <ListGroup variant="flush">
              {checkoutStep !== "cart" && (
                <ListGroup.Item>
                  <h4>ORDER ITEMS</h4>
                </ListGroup.Item>
              )}
              {items.map((item, i) => item && <CartItem userInfo={userInfo} key={`${i}-${item.art}-${item.qty}`} item={item} qty={item.qty} setCheckout={setCheckout} checkoutStep={checkoutStep} />)}
            </ListGroup>
            {/* --------------------------------------------------------------------ORDER WEIGHT SUMMARY */}
            <OrderWeightsSummary order={summary} />
            {checkoutStep === "cart" && children}
          </Col>
          <Col className="px-0 py-3">
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
                  <Button className="btn-success btn-block my-3" onClick={() => placeOrderHandler()}>
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
