import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { productTopAction } from "../actions/productActions"
import Promo from "../components/Promo/Promo"
import Meta from "../components/Meta"
import { Link } from "react-router-dom"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productTop = useSelector(state => state.productTop)
  const { loading, error, products } = productTop

  useEffect(() => {
    dispatch(productTopAction())
  }, [dispatch])

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Promo />
          <h1>Latest from my Yarn Collection</h1>
          <Meta />
          <Row>
            {products &&
              products.map(product => (
                <Col key={product._id} xs={4} sm={3} md={3} lg={2} xl={2} className="product-card-block">
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          <Row className="justify-content-center my-5">
            <Link to="/yarns" className="btn btn-success px-5 py-2">
              SEE COLLECTION
            </Link>
          </Row>
        </>
      )}
    </div>
  )
}

export default HomeScreen
