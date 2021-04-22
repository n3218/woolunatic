import React from "react"
import { ListGroup, Row, Col } from "react-bootstrap"
import Message from "./Message"
import { OrderDetailsRow } from "./Utils"

const ShippingSection = ({ children, checkoutStep, userInfo, order }) => {
  const op = order && order.shippingAddress && order.shippingAddress.shippingOption && order.shippingAddress.shippingOption
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
              {order && order.shippingAddress && (
                <>
                  {order.shippingAddress.phone && <div>{order.shippingAddress.phone}</div>}
                  <div>{userInfo.name}</div>
                  {order.shippingAddress.address && <div>{order.shippingAddress.address}</div>}
                  <div>
                    {order.shippingAddress.city && order.shippingAddress.city + ", "}
                    {order.shippingAddress.zipCode && order.shippingAddress.zipCode + ", "}
                    {order.shippingAddress.country !== "" && order.shippingAddress.country}
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
                  {checkoutStep === "order" && (
                    <div className="my-3">
                      {order.isDelivered ? (
                        <>
                          <Message variant="success">Shipped on {new Date(order.deliveredAt).toString()}</Message>
                          {order.shippingAddress.shippingOption.shippingCode && <OrderDetailsRow name="Shipping Code">{order.shippingAddress.shippingOption.shippingCode}</OrderDetailsRow>}
                          {order.shippingAddress.shippingOption.shippingLink && (
                            <OrderDetailsRow name="Shipping Link">
                              <a href={order.shippingAddress.shippingOption.shippingLink} target="_blank" rel="noreferrer">
                                {order.shippingAddress.shippingOption.shippingLink}
                              </a>
                            </OrderDetailsRow>
                          )}
                        </>
                      ) : (
                        <Message variant="warning">Not shipped</Message>
                      )}
                    </div>
                  )}
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
