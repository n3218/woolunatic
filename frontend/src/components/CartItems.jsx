import React from "react"
import { ListGroup } from "react-bootstrap"
import CartItem from "./CartItem"

const CartItems = ({ items }) => {
  return items && <ListGroup variant="flush">{items.map(item => item && <CartItem key={`${item.product}-${item.qty}`} item={item} productId={item.product} qty={item.qty} />)}</ListGroup>
}

export default CartItems // used in CartScreen
