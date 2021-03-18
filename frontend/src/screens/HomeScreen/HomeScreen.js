import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { productTopAction } from "../../actions/productActions"
import Product from "../../components/Product/Product"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Meta from "../../components/Meta"
import Promo from "./Promo"
import Promo2 from "./Promo-2"

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
          <Meta />

          <Promo />

          <div className="promo-new-in-collection">
            <h3>New in Collection</h3>
            <Row>
              {products &&
                products.length > 0 &&
                products.map(product => (
                  <Col key={product._id} xs={4} sm={4} md={4} lg={2} xl={2} className="product-card-block">
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
            <Row className="my-5">
              <Link to="/yarns" className="btn btn-success px-5 py-2">
                SHOP NEW
              </Link>
            </Row>
          </div>

          <Promo2 />
        </>
      )}
    </div>
  )
}

export default HomeScreen
