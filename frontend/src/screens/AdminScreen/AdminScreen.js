import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import Meta from "../../components/Meta"
import ImageBulkUpload from "../../components/ImagesBulkUpload"
import { deleteAllProductsDataAction, deleteAllProductsImagesAction } from "../../actions/productActions"
import { DELETE_ALL_PRODUCTS_DATA_RESET, DELETE_ALL_PRODUCTS_IMAGES_RESET } from "../../constants/productConstants"
import ProductsBulkUpload from "../../components/ProductsBulkUpload"
import "react-quill/dist/quill.snow.css"
import "./AdminScreen.css"

const AdminScreen = ({ history }) => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const deleteAllProductsImages = useSelector(state => state.deleteAllProductsImages)
  const { success: deleteAllProductsImagesSuccess, loading: deleteAllProductsImagesLoading, error: deleteAllProductsImagesError, message: deleteAllProductsImagesMessage } = deleteAllProductsImages
  const deleteAllProductsData = useSelector(state => state.deleteAllProductsData)
  const { success: deleteAllProductsSuccess, loading: deleteAllProductsLoading, error: deleteAllProductsError, message: deleteAllProductsMessage } = deleteAllProductsData

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login")
    }
  }, [history, userInfo])

  const deleteAllProductsImagesHandler = () => {
    dispatch(deleteAllProductsImagesAction())
    setTimeout(() => dispatch({ type: DELETE_ALL_PRODUCTS_IMAGES_RESET }), 15000)
  }

  const deleteAllProductsDataHandler = () => {
    dispatch(deleteAllProductsDataAction())
    setTimeout(() => dispatch({ type: DELETE_ALL_PRODUCTS_DATA_RESET }), 5000)
  }

  return (
    <>
      <Meta title="Admin | Woolunatics" />
      <Row>
        <Col md={2} sm={1}>
          <div className="color-example bg-super-dark-gray">super-dark-gray</div>
          <div className="color-example bg-dark-gray">dark-gray</div>
          <div className="color-example bg-gray">gray</div>
          <div className="color-example bg-medium-gray">medium-gray</div>
          <div className="color-example bg-light-gray">light-gray</div>
          <div className="color-example bg-super-light-gray">super-light-gray</div>
          <div className="color-example bg-super-dark-green">super-dark-green</div>
          <div className="color-example bg-dark-green">dark-green</div>
          <div className="color-example bg-green">green</div>
          <div className="color-example bg-light-green">light-green</div>
          <div className="color-example bg-super-light-green">super-light-green</div>
          <div className="color-example bg-red">red</div>
          <div className="color-example bg-orange">orange</div>
          <div className="color-example bg-blue">blue</div>
        </Col>
        <Col md={10}>
          <h2>Admin Interface</h2>

          <ProductsBulkUpload />

          <ImageBulkUpload />

          {deleteAllProductsImagesLoading && <Loader />}
          {deleteAllProductsImagesError && <Message variant="danger">{deleteAllProductsImagesError}</Message>}
          {deleteAllProductsImagesSuccess && <Message variant="success">{deleteAllProductsImagesMessage}</Message>}
          {deleteAllProductsLoading && <Loader />}
          {deleteAllProductsError && <Message variant="danger">{deleteAllProductsError}</Message>}
          {deleteAllProductsSuccess && <Message variant="success">{deleteAllProductsMessage}</Message>}

          <div className="submenu">
            <Button onClick={deleteAllProductsImagesHandler} className="btn btn-danger bg-red my-3 py-3 px-4 mx-1">
              <i className="fas fa-trash text-white"></i> Delete
              <br /> all Images
            </Button>
            <Button onClick={deleteAllProductsDataHandler} className="btn btn-danger bg-red py-3 px-4 mx-1">
              <i className="fas fa-trash text-white"></i> Delete
              <br /> all Data
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AdminScreen
