import React, { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Meta from "../../components/Meta"
import { FormFieldAsRow, FormFieldForShippingOption } from "../../components/FormField"
import { getShippingByIdAction, shippingUpdateAction } from "../../actions/shippingActions"

const ShippingEditScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const shippingId = match.params.id
  const localData = ["NL", "EU", "non EU"]

  const [country, setCountry] = useState("")
  const [local, setLocal] = useState("")
  const [options, setOptions] = useState([])

  const shippingList = useSelector(state => state.shippingList)
  const { loading, error, shipping, updatesuccess } = shippingList

  useEffect(() => {
    if (updatesuccess) {
      history.push(`/admin/shippinglist`)
    }
  }, [history, updatesuccess])

  useEffect(() => {
    dispatch(getShippingByIdAction(shippingId))
  }, [dispatch, shippingId])

  useEffect(() => {
    if (shipping) {
      setCountry(shipping.country)
      setLocal(shipping.local)
      setOptions(shipping.options)
    }
  }, [shipping])

  const submitHandler = e => {
    e.preventDefault()
    const updatedShipping = {
      ...shipping,
      country,
      local,
      options
    }
    console.log("updatedShipping: ", updatedShipping)
    dispatch(shippingUpdateAction(updatedShipping))
  }

  return (
    <>
      <Meta title="Admin | Edit Shipping | Woolunatics" />

      <Row>
        <Col>
          <h2>Edit Shipping</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {shipping && (
            <Form onSubmit={submitHandler} id="ShippingEditForm">
              <FormFieldAsRow value={country} label="Country" onChange={setCountry} />

              <Form.Group controlId="local">
                <Row>
                  <Col sm="2">
                    <Form.Label>Local</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control as="select" className="order-select" value={local} onChange={e => setLocal(e.target.value)}>
                      <option key="0" value="">
                        Select local...
                      </option>
                      {localData.map(el => (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>

              {shipping.options && shipping.options.map(opt => <FormFieldForShippingOption key={opt._id} option={opt} setOptions={setOptions} options={options} />)}

              <Row>
                <Col sm="2"></Col>
                <Col>
                  <Button type="submit" className="btn-success my-3 px-5">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ShippingEditScreen
