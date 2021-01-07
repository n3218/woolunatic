import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listUsersAction, deleteUserAction } from "../actions/userActions"
import Meta from "../components/Meta"

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsersAction())
    } else {
      history.push("/login")
    }
  }, [dispatch, history, userInfo, successDelete])

  const deleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUserAction(id))
    }
  }

  return (
    <>
      <Meta title="Admin | User List | Woolunatics" />
      <h2>Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? ( //
                    <i className="fas fa-check text-success"></i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="link" title="Edit">
                      <i className="fas fa-edit text-success"></i>
                    </Button>
                  </LinkContainer>
                </td>
                <td>
                  <Button variant="link" title="Delete" onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash text-danger"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
