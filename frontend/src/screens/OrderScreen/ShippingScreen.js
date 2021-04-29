import React, { useEffect, useState } from "react"
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
  const { user, shippingAddress } = cart

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("")
  const [phone, setPhone] = useState("")
  const [shippingOption, setShippingOption] = useState({ cost: 0, operator: "PICKUP" })
  const [shippingPrice, setShippingPrice] = useState(0)
  const [comment, setComment] = useState("")

  useEffect(() => {
    setAddress(user && user.address ? user.address.address : "")
    setCity(user && user.address ? user.address.city : "")
    setZipCode(user && user.address ? user.address.zipCode : "")
    setCountry(user && user.address ? user.address.country : "")
    setPhone(user && user.phone ? user.phone : "")
    setComment(shippingAddress && shippingAddress.comment ? shippingAddress.comment : "")
  }, [shippingAddress, user])

  const submitShippingHandler = e => {
    e.preventDefault()
    if (country === "") {
      dispatch(saveShippingAddressAction({ address, city, zipCode, country, phone, shippingOption, comment }))
    } else {
      dispatch(saveShippingAddressAction({ address, city, zipCode, country, phone, shippingOption, comment }))
    }
    dispatch(savePaymentMethodAction(""))
    history.push("/checkout/payment")
  }

  return (
    <CartLayout history={history} checkoutStep={checkoutStep} title="Shipping" shippingPrice={shippingPrice}>
      <ListGroup variant="flush">
        <ShippingSection order={cart} checkoutStep={checkoutStep} userInfo={userInfo}>
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
            {
              <>
                <Form.Group controlId="address">
                  <Form.Label required={shippingPrice > 0}>Address</Form.Label>
                  <Form.Control //
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    required={shippingPrice > 0}
                    onChange={e => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                  <Form.Label required={shippingPrice > 0}>City</Form.Label>
                  <Form.Control //
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    required={shippingPrice > 0}
                    onChange={e => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="zipCode">
                  <Form.Label required={shippingPrice > 0}>Zip Code</Form.Label>
                  <Form.Control //
                    type="text"
                    placeholder="Enter ZipCode"
                    value={zipCode}
                    required={shippingPrice > 0}
                    onChange={e => setZipCode(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </>
            }
            <Form.Group controlId="city">
              <Form.Label required={shippingPrice > 0}>Phone</Form.Label>
              <Form.Control //
                type="text"
                placeholder="Enter Phone"
                value={phone}
                required={shippingPrice > 0}
                onChange={e => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control //
                as="textarea"
                rows={3}
                placeholder="Enter your comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
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
