import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import { register } from "../actions/userActions"
import Loader from "../components/Loader"
import Meta from "../components/Meta"

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitRegisterHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("Passwords do not match")
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <Meta title="Register | YarnStore" />
      <h2>Sign Up</h2>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitRegisterHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label required>Email Address</Form.Label>
          <Form.Control required type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label required>Password</Form.Label>
          <Form.Control required type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label required>Confirm Password</Form.Label>
          <Form.Control required type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" className="btn-success my-3 px-5">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
