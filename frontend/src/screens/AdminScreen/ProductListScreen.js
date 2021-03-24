import React, { useEffect } from "react"
import { Route } from "react-router-dom"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { listProducts, productCreateAction } from "../../actions/productActions"
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from "../../constants/productConstants"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Paginate from "../../components/Paginate"
import Meta from "../../components/Meta"
import ProductListItem from "../../components/ProductListItem/ProductListItem"

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
    if (successDelete) {
      setTimeout(() => {
        dispatch({ type: PRODUCT_DELETE_RESET })
      }, 3000)
    }
    dispatch(listProducts("", pageNumber))
  }, [dispatch, pageNumber, successDelete])

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    }
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push(`/admin/product/${createdProduct._id}/edit`)
    }
  }, [dispatch, history, userInfo, successCreate, createdProduct])

  const createProductHandler = () => {
    dispatch(productCreateAction())
  }

  return (
    <>
      <h2>Products</h2>

      <div className="submenu">
        <Button className="btn btn-success bg-blue my-3 px-5" onClick={createProductHandler}>
          <i className="fas fa-plus mr-1"></i> Create Product
        </Button>
      </div>
      {(loadingDelete || loadingCreate) && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && <Message variant="success">Product was deleted</Message>}
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
                <th>art</th>
                <th className="product-list-item_image">image</th>
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
                <th>minimum</th>
                <th>tag</th>
                <th>delete</th>
                <th>outOfStock</th>
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
