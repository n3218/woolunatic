import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Row, Col, Image, Button, ListGroup } from "react-bootstrap"
import { cartRemoveItemAction, cartLocalRemoveItemAction } from "../actions/cartActions"
import { noimage, thumbPath } from "../constants/commonConstans"

const CartItem = ({ item, qty, setCheckout, checkoutStep, userInfo }) => {
  const dispatch = useDispatch()
  const productId = item.product._id || item.product

  const removeFromCartHandler = item => {
    console.log("removeFromCartHandler: item: ", item)
    if (userInfo) {
      dispatch(cartRemoveItemAction(item.qty, item.product._id))
    } else {
      dispatch(cartLocalRemoveItemAction(item))
    }
    setCheckout(false)
  }

  return (
    <ListGroup.Item className={item.message && "bg-light"}>
      <Row>
        <Col xl={2} xs={2}>
          {typeof item.product === "object" && (
            <div className="product-card_badges ">
              {item.product.outOfStock && <div className="badge badge-pill badge-secondary">out Of Stock</div>}
              {item.product.regular && <div className="badge badge-pill badge-primary">regular</div>}
              {item.product.novelty && <div className="badge badge-pill badge-success">new</div>}
              {item.product.inSale && <div className="badge badge-pill badge-danger">sale</div>}
            </div>
          )}
          <Link to={`/products/${productId}`} className="text-capitalize">
            {item.image && item.image.length === 0 ? <Image src={noimage} alt={item.name} fluid thumbnail /> : <Image src={thumbPath + item.image} alt={item.name} fluid thumbnail />}
          </Link>
        </Col>
        <Col>
          <div>
            <i className="h5">{item.brand}</i>{" "}
            <span className="text-capitalize h5">
              {" "}
              <strong> {item.name}</strong>
            </span>
          </div>
          <div className="text-capitalize">
            <b>Color: </b>{" "}
            <span className="text-capitalize h5">
              <strong>{item.color && item.color}</strong>
            </span>
          </div>
          <div className="text-capitalize">
            <b>art: </b> <Link to={`/products/${productId}`}>{item.art && item.art}</Link>
          </div>
          {item.meterage && (
            <div className="text-capitalize">
              <b>meterage: </b> {item.meterage}m / 100g
            </div>
          )}
          {item.fibers && (
            <div>
              <b>Fibers: </b>
              <>{item.fibers}</>
            </div>
          )}
        </Col>
        <Col>
          {item.message && <div className="badge badge-pill badge-danger">{item.message}</div>}
          <div>
            <strong>Price: </strong> €{item.price} / 100g
          </div>
          <div>
            <strong>Item price: </strong> €{(item.price * item.qty * 0.01).toFixed(2)}
          </div>
          <div>
            <strong>Item weight: </strong> {item.qty}g
          </div>
          <div>
            <strong>Item meterage: </strong> {(item.meterage * item.qty * 0.01).toFixed(0)}m
          </div>
          {checkoutStep === "cart" && (
            <div>
              <Button variant="link" className="text-danger py-2 px-0" onClick={() => removeFromCartHandler(item)}>
                <small>delete...</small>
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default CartItem // used in CartLayout
