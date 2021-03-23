import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { cartAddItemAction, getCartAction } from "../../actions/cartActions"

import "./CartScreen.css"
import CartLayout from "./CartLayout"
import { Button, Card } from "react-bootstrap"
import ShippingOptions from "../../components/ShippingOptions"

const CartScreen = ({ match, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id && match.params.id
  const qty = match.params.qty ? Number(match.params.qty) : 300
  const checkoutStep = "cart"
  const [redirect, setRedirect] = useState()
  const [showShippingOption, setShowShippingOptions] = useState(false)
  const [country, setCountry] = useState("")

  useEffect(() => {
    if (productId) {
      setRedirect(`cart/${productId}/${qty}`)
      dispatch(cartAddItemAction(productId, qty))
    } else {
      setRedirect("cart")
      dispatch(getCartAction())
    }
  }, [dispatch, productId, qty])

  const checkShippingPriceHandler = () => {
    setShowShippingOptions(true)
    console.log("checkShippingPriceHandler")
  }

  return (
    <CartLayout history={history} redirect={redirect} checkoutStep={checkoutStep} title="Shopping Cart" shippingPrice={0}>
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
