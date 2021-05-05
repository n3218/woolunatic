import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Nav } from "react-bootstrap"
import { logout } from "../../actions/userActions"
import Meta from "../../components/Meta"
import { LinkContainer } from "react-router-bootstrap"

import "react-quill/dist/quill.snow.css"
import "./AdminScreen.css"

const AdminLayout = ({ children, history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      dispatch(logout())
      history.push("/login")
    }
  }, [dispatch, userInfo, history])

  return (
    <>
      <Meta title="Admin | YarnStore" />
      <div className="admin-container">
        <div className="admin-panel bg-gray pl-1">
          <Nav>
            <div className="mt-5">
              <LinkContainer to="/admin">
                <Nav.Link className="text-light">Orders</Nav.Link>
              </LinkContainer>
            </div>
            <div className="text-center">
              <h4 className="ml-2 mt-4 text-medium-gray">Upload</h4>
            </div>
            <LinkContainer to="/admin/productsupload">
              <Nav.Link className="text-light">Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/imagesupload">
              <Nav.Link className="text-light">Images</Nav.Link>
            </LinkContainer>
            <div className="text-center">
              <h4 className="ml-2 mt-4 text-medium-gray">Lists</h4>
            </div>
            <div>
              <LinkContainer to="/admin/textlist">
                <Nav.Link className="text-light">Texts</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/shippinglist">
                <Nav.Link className="text-light">Shippings</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/userlist">
                <Nav.Link className="text-light">Users</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <Nav.Link className="text-light">Products</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/admin/colorlist">
                <Nav.Link className="text-light">Colors</Nav.Link>
              </LinkContainer>
            </div>
          </Nav>
        </div>
        <div className="admin-content px-0">{children}</div>
      </div>
    </>
  )
}

export default AdminLayout
