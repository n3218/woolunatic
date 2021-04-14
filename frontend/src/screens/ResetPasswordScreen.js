import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import Meta from "../components/Meta"
import { resetPasswordAction } from "../actions/userActions"
import Loader from "../components/Loader"

const ResetPasswordScreen = ({ history, location, match }) => {
  const { id, token } = match.params
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [warning, setWarning] = useState("")
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
    setWarning("")
    e.preventDefault()
    if (password !== confirmPassword) {
      setWarning("Passwords do not match")
    } else {
      dispatch(resetPasswordAction(id, token, password))
    }
  }

  return (
    <FormContainer>
      <Meta title="Reset Password | Woolunatics" />
      <h2>Reset Password</h2>
      {loading && <Loader />}
      {(error || warning) && <Message variant="danger">{error || warning}</Message>}
      <br />
      <br />
      <br />
      {message ? (
        <>
          <Message variant="success" className="text-center h4">
            {message}
          </Message>
          <br />
          <br />
          <br />
          <Row className="py-3">
            <Col className="text-center px-2">
              <Link to="/yarns" className="btn btn-success px-5 btn-block ">
                Go Shopping
              </Link>
            </Col>
            <Col className="text-center px-2">
              <Link to="/cart" className="btn btn-success px-5 btn-block ">
                Go To Cart
              </Link>
            </Col>
            <Col className="text-center px-2">
              <Link to="/profile" className="btn btn-success px-5 btn-block ">
                Go To Profile
              </Link>
            </Col>
          </Row>
        </>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Control type="hidden" name="id" value={id}></Form.Control>
          <Form.Control type="hidden" name="token" value={token}></Form.Control>

          <Form.Group controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" placeholder="New Password" autoComplete="New Password" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" autoComplete="New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type="submit" className="btn-success my-3 px-5">
            Reset Password
          </Button>
        </Form>
      )}
    </FormContainer>
  )
}

export default ResetPasswordScreen
