import React, { useState, useEffect } from "react"
import { Form, Button, Row, Col, Table, ListGroup } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import Message from "../components/Message"
import { getUserDetails, updateUserProfileAction } from "../actions/userActions"
import Loader from "../components/Loader"
import { listMyOrdersAction } from "../actions/orderActions"
import Meta from "../components/Meta"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"

const ProfileScreen = ({ history, location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile
  const orderListMy = useSelector(state => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails("profile"))
        dispatch(listMyOrdersAction())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const updateProfileHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(
        updateUserProfileAction({
          id: user._id,
          name,
          email,
          password
        })
      )
    }
  }

  return (
    <Row>
      <Meta title="Profile | Woolunatics" />
      <Col md={3}>
        <h2>My Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="warning">{error}</Message>
        ) : (
          <ListGroup>
            <ListGroup.Item>
              <Form onSubmit={updateProfileHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Name" value={name} autoComplete="name" onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter Email" value={email} autoComplete="email" onChange={e => setEmail(e.target.value)}></Form.Control>
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
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="danger">{errorOrders}</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>PAYMENT METHOD</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>SHIPPED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.paymentMethod && order.paymentMethod.split(",")[0]}</td>
                    <td>{order.totalPrice}</td>
                    <td>{order.isPaid ? <span className="text-success">{order.paidAt.substring(0, 10)}</span> : <i className="fas fa-times text-danger"></i>}</td>
                    <td>{order.isDelivered ? <span className="text-success">{order.deliveredAt.substring(0, 10)}</span> : <i className="fas fa-times text-danger"></i>}</td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button className="btn-sm">Details</Button>
                      </LinkContainer>
                    </td>
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
