import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import Message from "../components/Message"
import { getUserDetails, updateUserAction } from "../actions/userActions"
import Loader from "../components/Loader"
import { USER_UPDATE_RESET } from "../constants/userConstants"
import Meta from "../components/Meta"

const UserEditScreen = ({ history, match }) => {
  const userId = match.params.id
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails
  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push("/admin/userList")
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [user, dispatch, userId, successUpdate, history])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(updateUserAction({ _id: userId, name, email, isAdmin }))
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
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check type="checkbox" className="custom-checkbox" label="isAdmin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" className="btn-success my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
