import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts } from "../actions/productActions"
import Meta from "../components/Meta"
import Filter from "../components/Filter/Filter"

const CollectionScreen = ({ match }) => {
  const keyword = match.params.keyword
  const category = match.params.category
  const pageNumber = Number(match.params.pageNumber) || 1
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, success, products } = productList
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, category))
  }, [dispatch, keyword, pageNumber, category])

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <>
          <Meta />
          <h1>{keyword ? keyword.split("|").join(" | ") : match.params.category ? (match.params.category === "cashmix" ? "Cachmere Mixes" : match.params.category.split("-").join(" | ")) : "All Yarns"}</h1>
          <div className="display-flex">
            <div className="filter-container">
              <Filter products={products} setFilteredProducts={setFilteredProducts} />
            </div>
            <div className="filtered-products-container">
              <Row>
                {filteredProducts.map(product => (
                  <Col key={product._id} xs={4} sm={4} md={4} lg={3} xl={2} className="product-card-block">
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              {loading ? <Loader /> : <div className="text-center">{/* <Button onClick={() => dispatch(listProducts(keyword, pageNumber + 1))} className="my-3 px-5 btn-success>
                  Load More
                </Button> */}</div>}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CollectionScreen
