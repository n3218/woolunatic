import React, { useEffect } from "react"
import { withRouter } from "react-router"
import { Route } from "react-router-dom"
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { logout } from "../../actions/userActions"
import SearchBox from "../SearchBox"
import "./Header.css"

const Header = ({ location }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    console.log("-------------------window.scrollTo(0, 0)")
    window.scrollTo(0, 0)
  }, [location])

  return (
    <header>
      <Row>
        <Col className="p-0">
          <LinkContainer to="/">
            <Navbar.Brand>
              <Row>
                <Col>
                  <img className="logo" alt="Logo" src="/assets/logo.png" />
                </Col>
                <Col>
                  <div className="h1 mt-3">Woolunatics</div>
                </Col>
              </Row>
            </Navbar.Brand>
          </LinkContainer>
        </Col>
        <Col className="admin-menu-container">
          {/* ---------------------- Admin Menu ---------------------- */}
          {userInfo && userInfo.isAdmin && (
            <Navbar className="admin-menu">
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
          {/* ---------------------- /Admin Menu ---------------------- */}

          <Navbar expand="md" collapseOnSelect className="info-menu-container">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  <LinkContainer to="/about">
                    <Nav.Link>About</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/how-to">
                    <Nav.Link>
                      <nobr>How To Order</nobr>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/cart" className="text-nowrap">
                    <Nav.Link>
                      <i className="fas fa-shopping-cart"></i>({(cartItems && cartItems.length) || 0})
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
                        <i className="fas fa-user"></i> Login
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
        <Col className="p-0">
          <Nav activeKey={location.pathname} className="ml-auto navbar-light bg-light py-3 justify-content-center">
            <LinkContainer to="/yarns" exact>
              <Nav.Link href="/yarns" className="underlink">
                <span className="underlink-content">All Yarns</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/cashmere" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Cashmere</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/cashmix" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Cashmere mix</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/merino-wool-lambswool" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Merino/Wool</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/angora" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Angora</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/mohair-alpaca" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Mohair/Alpaca</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/camel-yak" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Camel/Yak</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/silk-viscose" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Silk</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/cotton-linen" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Linen/Cotton</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/yarns/fantasy-pailettes" exact>
              <Nav.Link className="underlink">
                <span className="underlink-content">Fantasy Yarns</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Col>
      </Row>
    </header>
  )
}

export default withRouter(Header)
