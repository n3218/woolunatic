import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Form, Row, Col, Card } from "react-bootstrap"
import { getShippingListAction } from "../actions/shippingActions"
import { calculateWeight } from "./Utils"
import Message from "./Message"
import Loader from "./Loader"

const ShippingOptions = ({ country, setCountry, cart, checkoutStep, shippingPrice, setShippingPrice, shippingOption, setShippingOption }) => {
  const dispatch = useDispatch()
  const shippingList = useSelector(state => state.shippingList)
  const { loading, success, error, shippings } = shippingList
  const [weight, setWeight] = useState(0)
  const initialShippingOption = { cost: 0, operator: "PICKUP" }

  useEffect(() => {
    if (cart && cart.items) {
      const { totalWeight } = calculateWeight(cart.items)
      setWeight(totalWeight)
    }
  }, [cart])

  useEffect(() => {
    if (!success) dispatch(getShippingListAction())
  }, [dispatch, cart, success])

  useEffect(() => {
    if (country && shippings && weight) {
      const initialShippingOption = shippings.filter(el => el.country === country)[0].options.filter(op => weight < op.maxWeight && weight > op.minWeight)[0]
      setShippingPrice(initialShippingOption.cost)
      setShippingOption(initialShippingOption)
    }
  }, [country, shippings, weight, setShippingPrice, setShippingOption])

  const onChangeCountryHandler = e => {
    setCountry(e.target.value)
    if (e.target.value === "") {
      setShippingPrice(0)
      setShippingOption(initialShippingOption)
    }
  }

  const onChangeShippingHandler = op => {
    setShippingPrice(op.cost)
    setShippingOption(op)
  }

  const selfPickUpHandler = () => {
    setShippingPrice(0)
    setShippingOption(initialShippingOption)
  }

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {success && (
        <>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control as="select" className="order-select" value={country} onChange={onChangeCountryHandler}>
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
          {country && weight > 0 && (
            <>
              <h4 className="mt-4">
                Calculated package weight: <strong>{weight / 1000}kg</strong>
              </h4>
              <div>Shipping cost for selected country: </div>
            </>
          )}

          <Row>
            {country && (
              <>
                {shippings
                  .filter(el => el.country === country)[0]
                  .options.map(op => (
                    <Col xs={6} lg={4} md={4} xl={3} key={op._id} className="mt-4">
                      <Card bg="light" text={weight && (weight > op.maxWeight || weight < op.minWeight) && "muted"}>
                        <Card.Header className="text-center px-1">
                          <img src={`/assets/carriers/${op.operator}.png`} alt={op.operator} width={100} />
                        </Card.Header>
                        <Card.Body className="text-center">
                          <Card.Title>{`${Math.round(op.minWeight / 1000)}kg - ${op.maxWeight / 1000}kg`}</Card.Title>
                          {checkoutStep === "shipping" ? (
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
                          ) : (
                            <Card.Text>€{op.cost}</Card.Text>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </>
            )}
            <Col xs={6} lg={4} md={4} xl={3} className="mt-4">
              <Card bg="light">
                <Card.Header className="text-center">
                  <div style={{ height: "60px", width: "100px", margin: "auto", paddingTop: "7px" }}>
                    <h5 className="mt-2">self pick up</h5>
                  </div>
                </Card.Header>
                <Card.Body className="text-center">
                  <Card.Title>{`0kg - 20kg`}</Card.Title>
                  {checkoutStep === "shipping" ? (
                    <Form.Check //
                      type="radio"
                      label="no cost"
                      id="pickup"
                      name="shippingOption"
                      value="pickup"
                      checked={shippingOption.cost === 0 || shippingPrice === 0}
                      onChange={selfPickUpHandler}
                    ></Form.Check>
                  ) : (
                    <Card.Text>no cost</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ShippingOptions
