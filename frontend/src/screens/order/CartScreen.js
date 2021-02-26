import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { cartAddItemAction, getCartAction } from "../../actions/cartActions"

import "./CartScreen.css"
import CartLayout from "./CartLayout"

const CartScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id && match.params.id
  const qty = match.params.qty ? Number(match.params.qty) : 300
  const checkoutStep = "cart"
  const [redirect, setRedirect] = useState()

  useEffect(() => {
    if (productId) {
      setRedirect(`cart/${productId}/${qty}`)
      dispatch(cartAddItemAction(productId, qty))
    } else {
      setRedirect("cart")
      dispatch(getCartAction())
    }
  }, [dispatch, productId, qty])

  return <CartLayout history={history} redirect={redirect} checkoutStep={checkoutStep} title="Shopping Cart"></CartLayout>
}

export default CartScreen
