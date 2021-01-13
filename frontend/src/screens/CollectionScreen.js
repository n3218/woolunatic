import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Button } from "react-bootstrap"
import Product from "../components/Product/Product"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts } from "../actions/productActions"
import Paginate from "../components/Paginate"
import Meta from "../components/Meta"
import Filter from "../components/Filter/Filter"

const CollectionScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = Number(match.params.pageNumber) || 1
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages, success } = productList

  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (success) {
      setFilteredProducts([...filteredProducts, ...products])
    }
  }, [products])

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const handleFilters = (filters, category) => {
    console.log("handleFilters:filters: ", filters)
  }

  console.log("keyword: ", keyword)
  console.log("pageNumber: ", pageNumber)
  console.log("filteredProducts: ", filteredProducts)
  return (
    <div>
      {error && <Message variant="danger">{error}</Message>}
      <>
        {keyword ? <h2>{keyword.split("|").join(" | ")}</h2> : <h2>MY YARN COLLECTION</h2>}
        <Meta />
        <Row>
          <Col xs={2} xl={2}>
            {filteredProducts && <Filter handleFilters={filters => handleFilters(filters, "category")} products={products} filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />}
          </Col>
          <Col xs={10} xl={10}>
            <Row>
              {filteredProducts &&
                filteredProducts.map(product => (
                  <Col key={product._id} xs={6} sm={6} md={4} lg={3} xl={2} className="product-card-block">
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
            {loading ? (
              <Loader />
            ) : (
              <div className="text-center">
                <Button onClick={() => dispatch(listProducts(keyword, pageNumber + 1))} variant="primary" className="my-3 px-5">
                  Load More
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </>
    </div>
  )
}

export default CollectionScreen
