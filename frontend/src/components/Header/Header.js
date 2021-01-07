import React from "react"
import { Link, Route } from "react-router-dom"
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap"
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
              <NavDropdown title="Collection" id="basic-nav-dropdown">
                <LinkContainer to="/search/cashmere|кашемир">
                  <NavDropdown.Item>Cashmere</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/cashmix|смесовкакашемир">
                  <NavDropdown.Item>Cashmere Mix</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/merino|меринос">
                  <NavDropdown.Item>Merino</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/camel|верблюд">
                  <NavDropdown.Item>Camel</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/mohair|мохер">
                  <NavDropdown.Item>Mohair</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/silk|шелк">
                  <NavDropdown.Item>Silk</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/alpaca|альпака">
                  <NavDropdown.Item>Alpaca</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/boucle|букле">
                  <NavDropdown.Item>Boucle</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/angora|ангора">
                  <NavDropdown.Item>Angora</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/linen|linnen|_лен">
                  <NavDropdown.Item>Linen</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/search/Пайетки|Paillettes|Sequins">
                  <NavDropdown.Item>Paillettes</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to="/collection">
                  <NavDropdown.Item>All</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
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
    </header>
  )
}

export default Header
