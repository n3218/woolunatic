import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Card, ListGroup, Button } from "react-bootstrap"
import { cartCleanItemsAction, cartCheckItemsAction, cartRemoveItemsFromDBAction, getCartAction } from "../actions/cartActions"
import { createOrderAction } from "../actions/orderActions"
import Message from "../components/Message"

const OrderSummary = ({ cart, items, error, checkoutStep, history, summary, userInfo, children }) => {
  const dispatch = useDispatch()

  const placeOrderHandler = () => {
    // OK
    // dispatch(cartCheckItemsAction(items))
    // dispatch(cartCleanItemsAction())
    dispatch(
      createOrderAction({
        orderItems: cart.items,
        shippingAddress: cart.shippingAddress,
        // paymentMethod: paymentMethod,
        itemsPrice: summary.itemsPrice,
        taxPrice: summary.taxPrice,
        shippingPrice: summary.shippingPrice,
        totalPrice: summary.totalPrice,
        itemsWeight: summary.itemsWeight,
        totalWeight: summary.totalWeight
      })
    )
    dispatch(cartRemoveItemsFromDBAction(items))
  }

  return (
    <Card className="mx-1">
      <Card.Header className="card-header text-center">
        <h3>Order Summary</h3>
      </Card.Header>

      <ListGroup variant="flush">
        <ListGroup.Item>
          <h4>Total ({items.length}) items</h4>
          <Row>
            <Col>
              <strong>Items price: </strong>
            </Col>
            <Col className="text-right">€{(items && cart.itemsPrice) || 0}</Col>
          </Row>

          <Row>
            <Col>
              <strong>Tax</strong>
            </Col>
            <Col className="text-right">€{cart.taxPrice || 0}</Col>
          </Row>
          <Row>
            <Col>
              <strong>Shipping price: </strong>
            </Col>
            <Col className="text-right">€{cart.shippingPrice || 0}</Col>
          </Row>
        </ListGroup.Item>

        {cart.totalPrice && (
          <ListGroup.Item>
            <Row>
              <Col>
                <h5>Order total:</h5>
              </Col>
              <Col>
                <h5>€{cart.totalPrice}</h5>
              </Col>
            </Row>
          </ListGroup.Item>
        )}

        {checkoutStep !== "shipping" && (
          <ListGroup.Item>
            <div id="payment-buttons">
              {children && children}
              {/* {checkoutStep === "cart" && (
                <>
                  <Button type="button" className="btn-block btn-success my-3" disabled={items.length === 0} onClick={checkoutHandler}>
                    Checkout
                  </Button>
                  <Button type="button" className="btn-block btn-success bg-blue my-3" onClick={() => history.push("/yarns")}>
                    Continue shopping
                  </Button>
                </>
              )} */}
              {checkoutStep === "payment" && (
                <Button className="btn-success btn-block" onClick={() => placeOrderHandler()}>
                  Continue
                </Button>
              )}
            </div>
          </ListGroup.Item>
        )}

        {error && (
          <ListGroup.Item>
            <Message>{error}</Message>
          </ListGroup.Item>
        )}
      </ListGroup>
    </Card>
  )
}

export default OrderSummary // used in CartScreen, ShippingScreen, PaymentScreen
