import React from "react"
import { ListGroup, Row, Col } from "react-bootstrap"
import Message from "./Message"

const ShippingSection = ({ children, checkoutStep, userInfo, cart }) => {
  return (
    <ListGroup.Item>
      <Row>
        <Col lg={3} md={3} sm={3} className="pl-0">
          <h4>SHIPPING ADDRESS</h4>
        </Col>
        <Col>
          {children ? (
            children
          ) : (
            <>
              <div>
                <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
              </div>
              {cart && cart.shippingAddress && (
                <>
                  <div>{cart.shippingAddress.phone}</div>
                  <div>{userInfo.name}</div>
                  <div>{cart.shippingAddress.address}</div>
                  {cart.shippingAddress.country && cart.shippingAddress.country !== "" && (
                    <div>
                      {cart.shippingAddress.city}, {cart.shippingAddress.zipCode}, {cart.shippingAddress.country}
                    </div>
                  )}

                  {checkoutStep === "order" && <div className="my-3">{cart.isDelivered ? <Message variant="success">Shipped on {new Date(cart.deliveredAt).toString()}</Message> : <Message variant="warning">Not shipped</Message>}</div>}
                </>
              )}
            </>
          )}
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default ShippingSection
