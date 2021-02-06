import React from "react"
import { ListGroup } from "react-bootstrap"
import CartItem from "./CartItem"

const CartItems = ({ items, checkoutStep }) => {
  return (
    <ListGroup variant="flush">
      {items.map(item => (
        <CartItem key={`${item.product}-${item.qty}`} item={item} productId={item.product} qty={item.qty} checkoutStep={checkoutStep} />
      ))}
    </ListGroup>
  )
}

export default CartItems // used in CartScreen, CheckoutScreen and PlaceOrderScreen
