import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../../components/FormContainer"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Meta from "../../components/Meta"
import { getUserDetails, updateUserAction } from "../../actions/userActions"
import { USER_UPDATE_RESET } from "../../constants/userConstants"

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [storecredit, setStorecredit] = useState(0)

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push("/admin/userList")
    } else {
      if ((user && !user.email) || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setAddress(user.address.address)
        setCity(user.address.city)
        setZipCode(user.address.zipCode)
        setCountry(user.address.country)
        setIsAdmin(user.isAdmin)
        setStorecredit(user.storecredit)
      }
    }
  }, [user, dispatch, userId, successUpdate, history])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUserAction({ _id: userId, name, email, isAdmin, storecredit, address: { address, city, zipCode, country } }))
  }

  return (
    <>
      <Meta title="Admin | Edit User | Woolunatics" />
      <h2>Edit User</h2>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label required>Email Address</Form.Label>
              <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Phone Number" value={phone} autoComplete="phone" onChange={e => setPhone(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Address" value={address} autoComplete="address" onChange={e => setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter City" value={city} autoComplete="city" onChange={e => setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="zipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Enter zipCode" value={zipCode} autoComplete="zipCode" onChange={e => setZipCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Enter Country" value={country} autoComplete="country" onChange={e => setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Store Credit</Form.Label>
              <Form.Control type="text" placeholder="Enter Storecredit" value={storecredit} onChange={e => setStorecredit(Number(e.target.value.replace(/[,]+/g, ".").replace(/[ €Ū]+/g, "")).toFixed(2))}></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check type="checkbox" className="custom-checkbox" label="isAdmin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" className="btn-success my-3 px-5">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
