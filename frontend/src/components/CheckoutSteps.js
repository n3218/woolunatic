import React from "react"
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <ol className="breadcrumb justify-content-center">
        <li className="breadcrumb-item">
          <Nav.Item>
            {step1 ? (
              <LinkContainer to="/cart">
                <Nav.Link>Cart</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Shipping</Nav.Link>
            )}
          </Nav.Item>
        </li>
        <li className="breadcrumb-item">
          <Nav.Item>
            {step2 ? (
              <LinkContainer to="/shipping">
                <Nav.Link>Shipping</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Shipping</Nav.Link>
            )}
          </Nav.Item>
        </li>
        <li className="breadcrumb-item active">
          <Nav.Item>
            {step3 ? (
              <LinkContainer to="/payment">
                <Nav.Link>Payment Type</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Payment Type</Nav.Link>
            )}
          </Nav.Item>
        </li>
        <li className="breadcrumb-item active">
          <Nav.Item>
            {step4 ? (
              <LinkContainer to="/placeorder">
                <Nav.Link>Review Order</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Review Order</Nav.Link>
            )}
          </Nav.Item>
        </li>
      </ol>
    </>
  )
}

export default CheckoutSteps
