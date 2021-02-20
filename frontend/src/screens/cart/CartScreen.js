import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cartAddItemAction, getCartAction } from "../../actions/cartActions"

import "./CartScreen.css"
import CartLayout from "./CartLayout"

const CartScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id && match.params.id
  const qty = match.params.qty ? Number(match.params.qty) : 300
  const checkoutStep = "cart"
  const [redirect, setRedirect] = useState()

  const cart = useSelector(state => state.cart)
  const { loading, error } = cart

  useEffect(() => {
    if (productId) {
      setRedirect(`cart/${productId}/${qty}`)
      dispatch(cartAddItemAction(productId, qty))
    } else {
      setRedirect("cart")
    }
    dispatch(getCartAction())
  }, [dispatch, productId, qty])

  return <CartLayout history={history} redirect={redirect} checkoutStep={checkoutStep} title="Shopping Cart" error={error} loading={loading}></CartLayout>
}

export default CartScreen
