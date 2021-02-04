import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { Row, Col, Button, Card, ListGroup } from "react-bootstrap"
import { cartAddItemAction } from "../actions/cartActions"
import { useEffect } from "react"
import Meta from "../components/Meta"
import CartItems from "../components/CartItems"

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split("=")[1].split("&")[0]) : 1
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
    if (productId) {
      dispatch(cartAddItemAction(productId, qty))
    }
  }, [dispatch, productId, qty, history, userInfo])

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping")
  }

  return (
    <>
      <Meta title="Shopping Cart | Woolunatics" />
      <h2>Shopping Cart</h2>
      <Row>
        <Col md={9} xs={12}>
          {cartItems.length === 0 ? (
            <Message variant="success">
              {" "}
              Your cart is empty <br /> <Link to="/">Go Shopping</Link>
            </Message>
          ) : (
            <CartItems cartItems={cartItems} />
          )}
        </Col>
        <Col md={3}>
          <Card border="light">
            <Card.Header className="card-header text-center">
              <h4>Subtotal ({cartItems.length}) items</h4>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>Items price: </strong>
                  </Col>
                  <Col className="text-right">€{cartItems.reduce((acc, item) => acc + item.qty * item.price * 0.01, 0).toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>
                    <strong>Items weight: </strong>
                  </Col>
                  <Col className="text-right">{cartItems.reduce((acc, item) => acc + item.qty, 0)}g</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block btn-success my-3" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                  Checkout
                </Button>
                <Button type="button" className="btn-block btn-success bg-blue my-3" onClick={() => history.push("/yarns")}>
                  Continue shopping
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartScreen
