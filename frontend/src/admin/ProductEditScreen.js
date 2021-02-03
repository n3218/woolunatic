import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import ReactQuill from "react-quill"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { FormFieldAsRow, FormFieldAsRowCheckbox } from "../components/FormField"
import { productDetailsAction, productUpdateAction } from "../actions/productActions"
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import Meta from "../components/Meta"
import ImageLarge from "../components/ImageLarge"
import ImageUpload from "../components/ImageUpload"
import "react-quill/dist/quill.snow.css"

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id
  const dispatch = useDispatch()
  const [brand, setBrand] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [outOfStock, setOutOfStock] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fibers, setFibers] = useState("")
  const [meterage, setMeterage] = useState(0)
  const [minimum, setMinimum] = useState(0)
  const [color, setColor] = useState("")
  const [colorWay, setColorWay] = useState("")
  const [inStock, setInStock] = useState("") //here is string
  const [art, setArt] = useState("")
  const [nm, setNm] = useState("")
  const [novelty, setNovelty] = useState(false)
  const [inSale, setInSale] = useState(false)
  const [regular, setRegular] = useState(false)

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      history.push(`/products/${productId}`)
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(productDetailsAction(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setDescription(product.description)
        setInStock(product.inStock)
        setOutOfStock(product.outOfStock)
        setFibers(product.fibers)
        setMeterage(product.meterage)
        setMinimum(product.minimum)
        setColor(product.color)
        setColorWay(product.colorWay)
        setArt(product.art)
        setNm(product.nm)
        setNovelty(product.novelty)
        setInSale(product.inSale)
        setRegular(product.regular)
      }
    }
  }, [product, dispatch, productId, history, successUpdate])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      productUpdateAction({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        inStock,
        outOfStock,
        fibers,
        meterage,
        minimum,
        color,
        colorWay,
        art,
        nm,
        novelty,
        inSale,
        regular
      })
    )
  }

  console.log("===================inSale: ", inSale)
  console.log("===================novelty: ", novelty)
  console.log("===================regular: ", regular)
  console.log("===================outOfStock: ", outOfStock)
  return (
    <>
      <Meta title="Admin | Edit Product | Woolunatics" />
      <div className="submenu">
        <Link to={`/products/${productId}`} className="btn btn-success my-3 px-5">
          Preview
        </Link>
      </div>

      <Row>
        <Col md={4} sm={12}>
          <ImageLarge image={image} name={`${brand} ${name}`} />
        </Col>
        <Col md={8}>
          <h2>Edit Product</h2>
          {loadingUpdate && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler} id="ProductEditForm">
              <FormFieldAsRow value={art} label="Art." onChange={setArt} />
              <FormFieldAsRow value={name} label="Name" onChange={setName} />
              <FormFieldAsRow value={brand} label="Brand" onChange={setBrand} />
              <FormFieldAsRow value={color} label="Color" onChange={setColor} />
              <FormFieldAsRow value={colorWay} label="ColorWay" onChange={setColorWay} />
              <FormFieldAsRow value={category} label="Category" onChange={setCategory} />
              <FormFieldAsRow value={fibers} label="Fibers" onChange={setFibers} />
              <FormFieldAsRow value={nm} label="Nm" onChange={setNm} />
              <FormFieldAsRow value={meterage} label="Meterage" onChange={setMeterage} />
              <FormFieldAsRow value={price} comment="Whole number or separated by dot" label="Price" onChange={setPrice} />
              <FormFieldAsRow value={minimum} comment="'0' if no winding" label="Minimum" onChange={setMinimum} />
              <FormFieldAsRow value={inStock} comment="Cones weights, separated by commas" label="In Stock" onChange={setInStock} />
              <FormFieldAsRowCheckbox value={regular} label="Regular" onChange={setRegular} />
              <FormFieldAsRowCheckbox value={novelty} label="Novelty" onChange={setNovelty} />
              <FormFieldAsRowCheckbox value={inSale} label="inSale" onChange={setInSale} />
              <FormFieldAsRowCheckbox value={outOfStock} label="OutOfStock" onChange={setOutOfStock} />

              <ImageUpload color={color} setColor={setColor} image={image} setUploading={setUploading} setImage={setImage} uploading={uploading} />

              <Form.Group controlId="Description">
                <Row>
                  <Col sm="2">
                    <Form.Label>Description:</Form.Label>
                  </Col>
                  <Col>
                    <ReactQuill value={description} onChange={setDescription} />
                  </Col>
                </Row>
              </Form.Group>

              <Row>
                <Col sm="2"></Col>
                <Col>
                  <Button type="submit" className="btn-success my-3 px-5">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProductEditScreen
