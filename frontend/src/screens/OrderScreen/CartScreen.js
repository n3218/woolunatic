import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cartAddItemAction, getCartAction, cartLocalAddItemAction, getCartLocalAction } from "../../actions/cartActions"

import "./CartScreen.css"
import CartLayout from "./CartLayout"
import { Button, Card } from "react-bootstrap"
import ShippingOptions from "../../components/ShippingOptions"

const CartScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id && match.params.id
  const qty = match.params.qty && Number(match.params.qty)
  const checkoutStep = "cart"

  const [showShippingOption, setShowShippingOptions] = useState(false)
  const [country, setCountry] = useState("")
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (productId) {
      if (userInfo) {
        dispatch(cartAddItemAction(productId, qty))
      } else {
        dispatch(cartLocalAddItemAction(productId, qty))
      }
    } else {
      if (userInfo) {
        console.log("getCartAction: userInfo.")
        dispatch(getCartAction())
      }
    }
  }, [dispatch, productId, qty, userInfo])

  const checkShippingPriceHandler = () => {
    setShowShippingOptions(true)
  }

  return (
    <CartLayout history={history} checkoutStep={checkoutStep} title="Shopping Cart" shippingPrice={0}>
      <Card border="light">
        <Card.Header>
          {showShippingOption ? (
            <ShippingOptions checkoutStep={checkoutStep} country={country} setCountry={setCountry} />
          ) : (
            <Button variant="success" onClick={checkShippingPriceHandler}>
              Check shipping price
            </Button>
          )}
        </Card.Header>
      </Card>
    </CartLayout>
  )
}

export default CartScreen
