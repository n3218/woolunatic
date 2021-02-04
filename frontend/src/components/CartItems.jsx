import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Row, Col, Image, Button, ListGroup } from "react-bootstrap"
import { cartRemoveItemAction } from "../actions/cartActions"

const CartItems = ({ cartItems }) => {
  const dispatch = useDispatch()

  const removeFromCartHandler = (id, color) => {
    dispatch(cartRemoveItemAction(id, color))
  }

  return (
    <ListGroup variant="flush">
      {cartItems.map(item => (
        <ListGroup.Item key={`${item.product}-${item.qty}`}>
          <Row>
            <Col xl={2} xs={2}>
              <Image src={item.image ? item.image : "/uploads/noimage/noimage.webp"} alt={item.name} fluid thumbnail />
            </Col>
            <Col>
              <div>
                <small>{item.brand}</small>{" "}
                <Link to={`/products/${item.product}`} className="text-capitalize">
                  {item.name}
                </Link>
              </div>
              {item.meterage && <div>{item.meterage}m / 100g</div>}
              {item.fibers && (
                <div>
                  <b>Fibers: </b>
                  <small>{item.fibers}</small>
                </div>
              )}
              <div className="text-capitalize">
                <b>Color: </b> {item.color && item.color}
              </div>
              <div>
                <strong>Price: </strong> €{item.price} / 100g
              </div>
            </Col>
            <Col>
              <Row>
                <Col>
                  <div>
                    <strong>Item price: </strong> €{(item.price * item.qty * 0.01).toFixed(2)}
                  </div>
                  <div>
                    <strong>Item weight: </strong> {item.qty}g
                  </div>
                  <div>
                    <strong>Item meterage: </strong> {item.meterage * item.qty * 0.01}m
                  </div>

                  <div>
                    <Button variant="link" className="text-danger py-2 px-0" onClick={() => removeFromCartHandler(item.product, item.qty)}>
                      <small>delete...</small>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

export default CartItems // used in CartScreen and PlaceOrderScreen
