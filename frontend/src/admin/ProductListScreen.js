import React, { useEffect } from "react"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listProducts, productCreateAction } from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"
import Paginate from "../components/Paginate"
import Meta from "../components/Meta"
import ProductListItem from "../components/ProductListItem"
import { Route } from "react-router-dom"

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector(state => state.productList)
  const { loading, error, products, page, pages } = productList
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const productDelete = useSelector(state => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete
  const productCreate = useSelector(state => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts("", pageNumber))
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

  const createProductHandler = () => {
    dispatch(productCreateAction())
  }

  return (
    <>
      <h2>Products</h2>

      <div className="submenu">
        <Button variant="success" className="my-3" onClick={createProductHandler}>
          <i className="fas fa-plus"></i> Create Product
        </Button>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && <Message variant="success">Product was deleted</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title="Admin | Product List | Woolunatics" />
          <Table striped hover responsive className="table-sm product-list">
            <thead>
              <tr>
                <th className="product-list-min">image</th>
                <th>brand</th>
                <th>name</th>
                <th>color</th>
                <th>colorWay</th>
                <th>category</th>
                <th>fibers</th>
                <th>nm</th>
                <th>meterage</th>
                <th>price</th>
                <th className="product-list-max">inStock</th>
                <th className="product-list-min">minimum</th>
                <th className="product-list-min">regular</th>
                <th className="product-list-min">novelty</th>
                <th className="product-list-min">inSale</th>
                <th className="product-list-min">outOfStock</th>
                <th className="product-list-min">edit</th>
                <th className="product-list-min">delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <Route key={product._id} render={({ history }) => <ProductListItem history={history} key={product._id} product={product} />} />
              ))}
            </tbody>
          </Table>
          <Paginate isAdmin list="productlist" pages={pages} page={page} />
        </>
      )}
    </>
  )
}

export default ProductListScreen
