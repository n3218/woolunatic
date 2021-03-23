import React, { useState } from "react"
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
  const { shippingAddress } = cart
  const method = useSelector(state => state.paymentMethod)
  const [paymentMethod, setPaymentMethod] = useState(method || "")

  return (
    <CartLayout history={history} checkoutStep={checkoutStep} title="Payment" shippingPrice={shippingAddress.shippingOption.cost}>
      <ListGroup variant="flush">
        <ShippingSection cart={cart} history={history} checkoutStep={checkoutStep} userInfo={userInfo} />
        <PaymentSection order={cart} history={history} checkoutStep={checkoutStep} userInfo={userInfo} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
      </ListGroup>
    </CartLayout>
  )
}

export default CartScreen
