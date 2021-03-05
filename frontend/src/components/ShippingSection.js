import React, { useState } from "react"
import { Form, Button, ListGroup, Row, Col } from "react-bootstrap"
import { saveShippingAddressAction, savePaymentMethodAction } from "../actions/cartActions"
import { useDispatch } from "react-redux"
import Message from "./Message"

const ShippingSection = ({ history, checkoutStep, userInfo, cart }) => {
  const dispatch = useDispatch()
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : "")
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "")
  const [zipCode, setZipCode] = useState(shippingAddress ? shippingAddress.zipCode : "")
  const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : "")

  const submitShippingHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddressAction({ address, city, zipCode, country }))
    dispatch(savePaymentMethodAction(""))
    history.push("/checkout/payment")
  }

  return (
    <ListGroup.Item>
      <Row>
        <Col lg={3} md={3} sm={6}>
          <h4>SHIPPING ADDRESS</h4>
        </Col>
        <Col>
          {checkoutStep === "shipping" ? (
            <Form onSubmit={submitShippingHandler}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control //
                  type="text"
                  placeholder="Enter Address"
                  value={address}
                  required
                  onChange={e => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control //
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  required
                  onChange={e => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="zipCode">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control //
                  type="text"
                  placeholder="Enter ZipCode"
                  value={zipCode}
                  required
                  onChange={e => setZipCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control //
                  type="text"
                  placeholder="Enter Country"
                  value={country}
                  required
                  onChange={e => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" className="btn-success my-3 px-5">
                Continue
              </Button>
            </Form>
          ) : (
            <>
              <div>
                <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
              </div>
              {cart && cart.shippingAddress && (
                <>
                  <div>{userInfo.name}</div>
                  <div>{cart.shippingAddress.address}</div>
                  <div>
                    {cart.shippingAddress.city}, {cart.shippingAddress.zipCode}, {cart.shippingAddress.country}
                  </div>
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
