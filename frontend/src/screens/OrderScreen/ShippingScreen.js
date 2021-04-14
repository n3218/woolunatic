import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ListGroup, Form, Button } from "react-bootstrap"
import CartLayout from "./CartLayout"
import { savePaymentMethodAction, saveShippingAddressAction } from "../../actions/cartActions"
import ShippingSection from "../../components/ShippingSection"
import ShippingOptions from "../../components/ShippingOptions"

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch()
  const checkoutStep = "shipping"
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : "")
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "")
  const [zipCode, setZipCode] = useState(shippingAddress ? shippingAddress.zipCode : "")
  const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : "")
  const [phone, setPhone] = useState(userInfo ? userInfo.phone : "")

  const [shippingOption, setShippingOption] = useState({ cost: 0 })
  const [shippingPrice, setShippingPrice] = useState(0)

  const submitShippingHandler = e => {
    e.preventDefault()
    if (country === "") {
      dispatch(saveShippingAddressAction({ address: "H. Hasekampsingel 17", city: "Harkstede", zipCode: "9617EV", country: "The Netherlands", phone, shippingOption }))
    } else {
      dispatch(saveShippingAddressAction({ address, city, zipCode, country, phone, shippingOption }))
    }
    dispatch(savePaymentMethodAction(""))
    history.push("/checkout/payment")
  }

  return (
    <CartLayout history={history} checkoutStep={checkoutStep} title="Shipping" shippingPrice={shippingPrice}>
      <ListGroup variant="flush">
        <ShippingSection cart={cart} checkoutStep={checkoutStep} userInfo={userInfo}>
          <Form onSubmit={submitShippingHandler}>
            <ShippingOptions //
              cart={cart}
              shippingAddress={shippingAddress}
              checkoutStep={checkoutStep}
              shippingPrice={shippingPrice}
              setShippingPrice={setShippingPrice}
              setShippingOption={setShippingOption}
              shippingOption={shippingOption}
              country={country}
              setCountry={setCountry}
            />
            {country && country.length > 0 && (
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
              </>
            )}
            <Form.Group controlId="city">
              <Form.Label>Phone</Form.Label>
              <Form.Control //
                type="text"
                placeholder="Enter Phone"
                value={phone}
                required
                onChange={e => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" className="btn-success my-3 px-5">
              Continue
            </Button>
          </Form>
        </ShippingSection>
      </ListGroup>
    </CartLayout>
  )
}

export default ShippingScreen
