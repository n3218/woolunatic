import React from "react"
import { ListGroup, Row, Col } from "react-bootstrap"
import Message from "./Message"

const ShippingSection = ({ children, checkoutStep, userInfo, cart }) => {
  const op = cart && cart.shippingAddress && cart.shippingAddress.shippingOption && cart.shippingAddress.shippingOption
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
                  {cart.shippingAddress.phone && <div>{cart.shippingAddress.phone}</div>}
                  <div>{userInfo.name}</div>
                  {cart.shippingAddress.address && <div>{cart.shippingAddress.address}</div>}
                  <div>
                    {cart.shippingAddress.city && cart.shippingAddress.city + ", "}
                    {cart.shippingAddress.zipCode && cart.shippingAddress.zipCode + ", "}
                    {cart.shippingAddress.country !== "" && cart.shippingAddress.country}
                  </div>
                  {op && (
                    <div>
                      {op.cost !== 0 && <img src={`/assets/carriers/${op.operator}.png`} alt={op.operator} height={30} className="mr-3" />}
                      {op.cost !== 0 && `${op.operator}: ${(op.minWeight / 1000).toFixed(0)}  -  ${(op.maxWeight / 1000).toFixed(0)} kg `}
                      {op.cost === 0 && (
                        <div className="badge badge-success text-uppercase my-2">
                          <span className="h5">
                            <strong>{op.operator}</strong>
                          </span>
                        </div>
                      )}
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
