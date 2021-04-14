import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Meta from "../components/Meta"
import { forgotPasswordAction } from "../actions/userActions"

const ForgotPasswordScreen = ({ history, location }) => {
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo, message } = userLogin
  const redirect = location.search ? location.search.split("=")[1] : ""

  useEffect(() => {
    if (userInfo && redirect) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(forgotPasswordAction(email))
  }

  return (
    <FormContainer>
      <Meta title="Reset Password | Woolunatics" />
      <h2>Forgot Password</h2>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <br />
      <br />
      <br />
      {message ? (
        <Message variant="success" className="text-center h4">
          {message}
        </Message>
      ) : (
        <>
          <div className="h4">Enter your email and we will send you a link to reset your password.</div>
          <br />
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" value={email} autoComplete="email" onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" className="btn-success my-3 px-5">
              Send me link to reset password
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  )
}

export default ForgotPasswordScreen
