import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ListGroup, Form, Button, Row, Col, Card } from "react-bootstrap"
import CartLayout from "./CartLayout"
import ShippingSection from "../../components/ShippingSection"
import { savePaymentMethodAction, saveShippingAddressAction } from "../../actions/cartActions"

import { getShippingAction } from "../../actions/shippingActions"
import Loader from "../../components/Loader"
import { calculateWeight } from "../../components/Utils"
import Message from "../../components/Message"
import { set } from "mongoose"

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()
  const checkoutStep = "shipping"
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const shipping = useSelector(state => state.shipping)
  const { loading, success, error, shippings } = shipping

  const cart = useSelector(state => state.cart)

  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : "")
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "")
  const [zipCode, setZipCode] = useState(shippingAddress ? shippingAddress.zipCode : "")
  const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : "")

  const [shippingOption, setShippingOption] = useState({ cost: 0 })
  const [shippingPrice, setShippingPrice] = useState(0)
  const [weight, setWeight] = useState(0)

  useEffect(() => {
    if (!success) {
      dispatch(getShippingAction())
    }
    if (cart.items) {
      const { totalWeight } = calculateWeight(cart.items)
      setWeight(totalWeight)
    }
  }, [dispatch, cart.items, success])

  useEffect(() => {
    if (country && shippings && weight) {
      const initialShippingOption = shippings.filter(el => el.country === country)[0].options.filter(op => weight < op.maxWeight && weight > op.minWeight)[0]
      setShippingPrice(initialShippingOption.cost)
      setShippingOption(initialShippingOption)
    }
  }, [country, shippings, weight])

  const submitShippingHandler = e => {
    e.preventDefault()
    dispatch(saveShippingAddressAction({ address, city, zipCode, country, shippingOption }))
    dispatch(savePaymentMethodAction(""))
    history.push("/checkout/payment")
  }

  const onChangeCountryHandler = e => {
    setCountry(e.target.value)
  }

  const onChangeShippingHandler = op => {
    setShippingPrice(op.cost)
    setShippingOption(op)
  }

  return (
    <CartLayout history={history} checkoutStep={checkoutStep} title="Shipping" shippingPrice={shippingPrice}>
      <ListGroup variant="flush">
        <ShippingSection cart={cart} checkoutStep={checkoutStep} userInfo={userInfo}>
          <Form onSubmit={submitShippingHandler}>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            {success && (
              <>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control as="select" className="order-select" value={country} onChange={onChangeCountryHandler} required>
                    <option key="0" value="">
                      Select country...
                    </option>
                    {shippings.map(el => (
                      <option key={el._id} value={el.country}>
                        {el.country}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                {country && (
                  <>
                    <h4 className="mt-4">
                      Calculated package weight: <strong>{weight / 1000}kg</strong>
                    </h4>
                    <h6>Shipping cost for selected country: </h6>
                  </>
                )}

                <Row>
                  {country && (
                    <>
                      {shippings
                        .filter(el => el.country === country)[0]
                        .options.map(op => (
                          <Col xs={6} lg={4} md={4} xl={3} key={op._id}>
                            <Card bg="light" text={(weight > op.maxWeight || weight < op.minWeight) && "muted"}>
                              <Card.Header className="text-center px-1">
                                <img src={`/assets/carriers/${op.operator}.png`} alt={op.operator} width={100} />
                              </Card.Header>
                              <Card.Body className="text-center">
                                <Card.Title>{`${Math.round(op.minWeight / 1000)}kg - ${op.maxWeight / 1000}kg`}</Card.Title>
                                <Form.Check //
                                  type="radio"
                                  label={`€${op.cost}`}
                                  id={`${op.minWeight} - ${op.maxWeight}`}
                                  name="shippingOption"
                                  value="ship"
                                  checked={op === shippingOption}
                                  disabled={weight > op.maxWeight || weight < op.minWeight}
                                  onChange={() => onChangeShippingHandler(op)}
                                ></Form.Check>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}

                      <Col xs={6} lg={4} md={4} xl={3}>
                        <Card bg="light">
                          <Card.Header className="text-center px-1">
                            <small>
                              no shipment
                              <br /> or self pick up
                            </small>
                          </Card.Header>
                          <Card.Body className="text-center">
                            <Card.Title>{`0kg - 20kg`}</Card.Title>
                            <Form.Check //
                              type="radio"
                              label="no cost"
                              id="nocost"
                              name="shippingOption"
                              value="noship"
                              checked={shippingOption.cost === 0}
                              onChange={() => onChangeShippingHandler({ cost: 0 })}
                            ></Form.Check>
                          </Card.Body>
                        </Card>
                      </Col>
                    </>
                  )}
                </Row>
                {country && (
                  <>
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
                    <Button type="submit" className="btn-success my-3 px-5">
                      Continue
                    </Button>
                  </>
                )}
              </>
            )}
          </Form>
        </ShippingSection>
      </ListGroup>
    </CartLayout>
  )
}

export default ShippingScreen
