import React from "react"
import { useSelector } from "react-redux"
import { ListGroup } from "react-bootstrap"
import CartLayout from "./CartLayout"
import ShippingSection from "../../components/ShippingSection"
import PaymentSection from "../../components/PaymentSection/PaymentSection"

const CartScreen = ({ history }) => {
  const checkoutStep = "payment"
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector(state => state.cart)

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
