import React from "react"
import { Link, Route } from "react-router-dom"
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { logout } from "../../actions/userActions"
import SearchBox from "../SearchBox"
import "./Header.css"

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      {userInfo && userInfo.isAdmin && (
        <Navbar id="admin-menu">
          <LinkContainer to="/admin">
            <Nav.Link>Admin</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/userlist">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/productlist">
            <Nav.Link>Products</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/admin/orderlist">
            <Nav.Link>Orders</Nav.Link>
          </LinkContainer>
        </Navbar>
      )}

      <Row>
        <Col>
          <Navbar bg="white" expand="lg" collapseOnSelect>
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img className="logo" alt="Logo" src="/assets/wool.svg" />
                </Navbar.Brand>
              </LinkContainer>
              <Link to="/" className="text-decoration-none">
                <h1 className="text-dark">Woolunatics</h1>
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <LinkContainer to="/about">
                    <Nav.Link className="underlink">About</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/how-to">
                    <Nav.Link className="underlink">How To Order</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/cart" className="text-nowrap">
                    <Nav.Link className="underlink">
                      <i className="fas fa-shopping-cart"></i>({cartItems && cartItems.length})
                    </Nav.Link>
                  </LinkContainer>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fas fa-user"></i>
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  <Route render={({ history }) => <SearchBox history={history} />} />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <Nav className="ml-auto navbar-light bg-light justify-content-center">
            <LinkContainer to="/yarns" exact>
              <Nav.Link className="underlink">All Yarns</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/cashmere">
              <Nav.Link className="underlink">Cashmere</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/cashmix">
              <Nav.Link className="underlink">Cashmere mix</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/merino-wool-lambswool">
              <Nav.Link className="underlink">Merino/Wool</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/mohair-camel-alpaca-yak">
              <Nav.Link className="underlink">Mohairs</Nav.Link>
            </LinkContainer>
            {/* <LinkContainer to="/yarns/angora">
              <Nav.Link className="underlink">Angora</Nav.Link>
            </LinkContainer> */}
            <LinkContainer to="/yarns/cotton-linen">
              <Nav.Link className="underlink">Cotton/Linen</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/silk-viscose">
              <Nav.Link className="underlink">Silk</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/fantasy-pailettes">
              <Nav.Link className="underlink">Fantasy Yarns</Nav.Link>
            </LinkContainer>
          </Nav>
        </Col>
      </Row>
    </header>
  )
}

export default Header
