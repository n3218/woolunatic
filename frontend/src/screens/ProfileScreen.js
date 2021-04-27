import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col, Table, ListGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Message from "../components/Message"
import { getUserDetails, updateUserProfileAction } from "../actions/userActions"
import Loader from "../components/Loader"
import { listMyOrdersAction } from "../actions/orderActions"
import Meta from "../components/Meta"
// import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [country, setCountry] = useState("")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user, successUpdate } = userDetails
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    dispatch(getUserDetails("profile"))
    dispatch(listMyOrdersAction())
  }, [dispatch])

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      // if (successUpdate) dispatch({ type: USER_UPDATE_PROFILE_RESET })
      if (user && user.email) {
        setName(user.name)
        setEmail(user.email)
        setPhone(user.phone)
        setAddress(user.address.address)
        setCity(user.address.city)
        setZipCode(user.address.zipCode)
        setCountry(user.address.country)
      }
    }
  }, [dispatch, history, userInfo, user, successUpdate])

  const updateProfileHandler = e => {
    setMessage("")
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(
        updateUserProfileAction({
          id: user._id,
          name,
          email,
          phone,
          address: { address, city, zipCode, country },
          password
        })
      )
    }
  }

  return (
    <Row>
      <Meta title="Profile | Woolunatics" />
      <Col md={4}>
        <h2>My Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {successUpdate && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="warning">{error}</Message>
        ) : (
          <ListGroup>
            <ListGroup.Item className="h5 text-center">
              <strong>Your Storecredit: €{Number(user.storecredit).toFixed(2)}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form onSubmit={updateProfileHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" value={name} autoComplete="name" onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label required>Email Address</Form.Label>
                  <Form.Control required type="email" placeholder="Enter Email" value={email} autoComplete={email} onChange={e => setEmail(e.target.value)}></Form.Control>
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
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" value={password} autoComplete="new-password" onChange={e => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} autoComplete="new-password" onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" className="btn-block btn-success my-3">
                  Update
                </Button>
              </Form>
            </ListGroup.Item>
          </ListGroup>
        )}
      </Col>
      <Col md={8}>
        <h2>My Orders</h2>
        {loadingOrders && <Loader />}
        {errorOrders && <Message variant="danger">{errorOrders}</Message>}
        {orders && orders.length === 0 ? (
          <Message variant="success">You don't have any orders yet.</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>CREDIT</th>
                <th>PAYMENT</th>
                <th>PAID</th>
                <th>SHIPPED</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map(order => (
                  <tr key={order.orderId}>
                    <td>
                      <Link to={`/orders/${order._id}`}>#{order.orderId}</Link>
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>{order.createdAt.substring(0, 10)}</Link>
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>€{order.totalPrice}</Link>
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>€{order.storecredit}</Link>
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>{order.paymentMethod && order.paymentMethod.split(",")[0]}</Link>
                    </td>
                    <td>{order.isPaid ? <span className="text-success">{order.paidAt.substring(0, 10)}</span> : <i className="fas fa-times text-danger"></i>}</td>
                    <td>{order.isDelivered ? <span className="text-success">{order.deliveredAt.substring(0, 10)}</span> : <i className="fas fa-times text-danger"></i>}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
