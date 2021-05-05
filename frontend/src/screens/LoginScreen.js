import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import { login } from "../actions/userActions"
import Loader from "../components/Loader"
import Meta from "../components/Meta"

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split("=")[1] : "/"

  useEffect(() => {
    if (userInfo && redirect) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <Meta title="Sign In | YarnStore" />
      <h2>Sign In</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <br />
      <br />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" value={email} autoComplete="email" onChange={e => setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" value={password} autoComplete="password" onChange={e => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type="submit" className="btn-success my-3 px-5">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <div>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
          </div>
          <div>
            <Link to={redirect ? `/forgot-password?redirect=${redirect}` : "/forgot-password"}>Forgot password?</Link>
          </div>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
