import React, { useEffect } from "react"
import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { listUsersAction, deleteUserAction } from "../../actions/userActions"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Meta from "../../components/Meta"
import { Link } from "react-router-dom"

const UserListScreen = () => {
  const dispatch = useDispatch()
  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList
  const userDelete = useSelector(state => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    dispatch(listUsersAction())
  }, [dispatch, successDelete])

  const deleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUserAction(id))
    }
  }

  return (
    <>
      <Meta title="Admin | User List | Woolunatics" />
      <h2>Users {users && ` - ${users.length}`}</h2>
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
              <th>STORECREDIT</th>
              <th>ADMIN</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`} variant="link" title="Edit">
                    {user._id}
                  </Link>
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`} variant="link" title="Edit">
                    {user.name}
                  </Link>
                </td>
                <td>
                  <a href={`mailto:${user.email}`}>
                    <i>{user.email}</i>
                  </a>
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`} variant="link" title="Edit">
                    {user.storecredit && Number(user.storecredit).toFixed(2)}
                  </Link>
                </td>
                <td>
                  {user.isAdmin ? ( //
                    <i className="fas fa-check text-success"></i>
                  ) : (
                    <i className="fas fa-times text-danger"></i>
                  )}
                </td>
                <td>
                  <Link title="Delete" onClick={() => deleteHandler(user._id)}>
                    <i className="fas fa-trash text-danger"></i>
                  </Link>
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
