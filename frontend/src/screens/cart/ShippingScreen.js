import React from "react"
import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"
import CartLayout from "./CartLayout"
import ShippingSection from "../../components/ShippingSection"

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const checkoutStep = "shipping"

  return (
    <CartLayout history={history} checkoutStep={checkoutStep} title="Shipping">
      <ListGroup variant="flush">
        <ShippingSection cart={cart} history={history} checkoutStep={checkoutStep} userInfo={userInfo} />
      </ListGroup>
    </CartLayout>
  )
}

export default ShippingScreen
