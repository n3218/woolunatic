import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Button, ListGroup } from "react-bootstrap"
import { cartAddItemAction, cartCleanItemsAction, cartCheckItemsAction, cartRemoveItemsFromDBAction, getCartAction } from "../../actions/cartActions"

import ShippingSection from "../../components/ShippingSection"
import PaymentSection from "../../components/PaymentSection/PaymentSection"
import CheckoutSteps from "../../components/CheckoutSteps"
import OrderWeightsSummary from "../../components/OrderWeightsSummary"
import { USER_DETAILS_RESET } from "../../constants/userConstants"
import { ORDER_CREATE_RESET } from "../../constants/orderConstants"
import { createOrderAction, molliePayAction } from "../../actions/orderActions"
import HideScreen from "../HideScreen/HideScreen"
import Loader from "../../components/Loader"
import CartLayout from "./CartLayout"

const CartScreen = ({ history }) => {
  const dispatch = useDispatch()
  const checkoutStep = "payment"
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector(state => state.cart)
  const { items } = cart

  const [paymentMethod, setPaymentMethod] = useState("")
  const [summary, setSummary] = useState({})
  const [hideScreen, setHideScreen] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  // // ----------------------------------------------Calculating prices
  // useEffect(() => {
  //   if (items && items.length > 0) {
  //     let taxPrice = 0
  //     let shippingPrice = 0
  //     const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
  //     const itemsPrice = addDecimals(items.reduce((acc, item) => acc + (item.price * item.qty) / 100, 0))
  //     if (checkoutStep === "payment") {
  //       taxPrice = addDecimals(Number((21.0 * itemsPrice) / 100))
  //       shippingPrice = addDecimals(itemsPrice > 100 ? 26 : 26)
  //     }
  //     const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2)
  //     const itemsWeight = items.reduce((acc, item) => acc + item.qty, 0)
  //     const totalWeight = itemsWeight + 300 + items.length * 40
  //     setSummary({ itemsPrice, taxPrice, shippingPrice, totalPrice, itemsWeight, totalWeight })
  //   }
  // }, [items, checkoutStep, dispatch])
  // // ---------------------------------------------/Calculating prices
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
    // dispatch(cartCheckItemsAction(items))
    dispatch(cartCleanItemsAction())
    dispatch(
      createOrderAction({
        orderItems: cart.items,
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
    dispatch(cartRemoveItemsFromDBAction(items))
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

  return (
    <CartLayout history={history} checkoutStep={checkoutStep} title="Payment">
      <ListGroup variant="flush">
        <ShippingSection cart={cart} history={history} checkoutStep={checkoutStep} userInfo={userInfo} />
        <PaymentSection order={cart} history={history} checkoutStep={checkoutStep} userInfo={userInfo} />
      </ListGroup>
    </CartLayout>
  )
}

export default CartScreen
