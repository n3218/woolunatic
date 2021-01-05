import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col, Accordion } from "react-bootstrap"
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
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [outOfStock, setOutOfStock] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [fibers, setFibers] = useState("")
  const [meterage, setMeterage] = useState(0)
  const [minimum, setMinimum] = useState(0)
  const defaultColor = [
    {
      name: "",
      inStock: ""
    }
  ]
  const [color, setColor] = useState(defaultColor)
  const [newColorName, setNewColorName] = useState("")
  const [newColorInStock, setNewColorInStock] = useState("")

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      history.push("/admin/productlist")
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
        setOutOfStock(product.outOfStock)
        setFibers(product.fibers)
        setMeterage(product.meterage)
        setMinimum(product.minimum)
        setColor(product.color)
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
        outOfStock,
        fibers,
        meterage,
        minimum,
        color
      })
    )
  }

  const addColorHandler = e => {
    e.preventDefault()
    setColor([
      ...color,
      {
        name: newColorName,
        images: [],
        inStock: newColorInStock
      }
    ])
    setNewColorName("")
    setNewColorInStock("")
  }

  const changeColorHandler = name => e => {
    let copy = color
    copy.filter(el => el.name === name)[0][e.target.id] = e.target.value
    setColor([...copy])
  }

  const thumbs = colorObject => {
    const setColorHandler = img => {
      let copy = color
      let colorImages = copy.filter(col => col.name === colorObject.name)[0].images
      if (colorImages.includes(img)) {
        colorImages.splice(colorImages.indexOf(img), 1)
        colorImages = [...colorImages.filter(col => col !== img)]
      } else {
        colorImages.push(img)
      }
      setColor([...copy])
    }

    return (
      <div>
        {image &&
          image.map(img => (
            <div key={img} className="color-picture">
              <Form.Label>
                <img src={img} alt="Color Preview" width="80" />
              </Form.Label>
              <Form.Check //
                className="checkboxImg"
                type="checkbox"
                value={img}
                checked={color.filter(col => col.name === colorObject.name)[0].images.includes(img)}
                onChange={() => setColorHandler(img)}
              ></Form.Check>
            </div>
          ))}
      </div>
    )
  }

  const deleteColorHandler = colorName => {
    let copy = color
    if (window.confirm("You want to delete color " + colorName + ". Are you sure?")) {
      let filteredColors = copy.filter(col => col.name !== colorName)
      setColor([...filteredColors])
    }
    console.log("deleteColorHandler")
  }

  return (
    <>
      <Meta title="Admin | Edit Product | Woolunatics" />
      <div className="submenu">
        <Link to={`/products/${productId}`} className="btn btn-success">
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
              <FormFieldAsRow value={name} label="Name" onChange={setName} />
              <FormFieldAsRow value={brand} label="Brand" onChange={setBrand} />
              <FormFieldAsRow value={category} label="Category" onChange={setCategory} />
              <FormFieldAsRow value={fibers} label="Fibers" onChange={setFibers} />
              <FormFieldAsRow value={meterage} label="Meterage" onChange={setMeterage} />
              <FormFieldAsRow value={price} comment="Число с точкой" label="Price" onChange={setPrice} />
              <FormFieldAsRow value={minimum} comment="'0' если без отмота" label="Minimum" onChange={setMinimum} />
              <Form.Group controlId="Description">
                <Row>
                  <Col sm="2">
                    <Form.Label>Description:</Form.Label>
                    <div className="label-comment">По этому полю происходит поиск, поэтому вся информация по товару и все возможные варианты для поиска должны присутствовать</div>
                  </Col>
                  <Col>
                    <ReactQuill value={description} onChange={setDescription} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="Color">
                <Row>
                  <Col sm={2} xs={12}>
                    <Form.Label>Colors in Stock:</Form.Label>
                    <div className="label-comment">Можно изменить название цвета, отредактировать вес бобин в наличии, привязать фото к цвету, удалить цвет</div>
                  </Col>
                  <Col>
                    {color &&
                      color.map((col, i) => (
                        <div key={i}>
                          <Accordion defaultActiveKey="0">
                            <Row>
                              <Col xs={4} md={4} xl={5}>
                                <input type="text" id="name" className="form-control" value={col.name} placeholder="Color" onChange={changeColorHandler(col.name)} />
                              </Col>
                              <Col xs={4} md={4} xl={5}>
                                <input type="text" id="inStock" className="form-control" value={col.inStock} placeholder="inStock" onChange={changeColorHandler(col.name)} />
                              </Col>
                              <Col xs={4} md={4} xl={2}>
                                <Row>
                                  <Col xs={6} xl={6}>
                                    <Accordion.Toggle as={Button} variant="outline-success" eventKey={`thumbs-${col.name}`}>
                                      <i className="fas fa-images" title="Link a Pictures"></i>
                                    </Accordion.Toggle>
                                  </Col>
                                  <Col xs={6} xl={6}>
                                    <Button variant="outline-danger" title="Delete Color" onClick={() => deleteColorHandler(col.name)}>
                                      <i className="fas fa-trash"></i>
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            <Accordion.Collapse eventKey={`thumbs-${col.name}`}>{thumbs(col)}</Accordion.Collapse>
                          </Accordion>
                        </div>
                      ))}
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="newColor">
                <Row>
                  <Col sm="2">
                    <Form.Label>New Color:</Form.Label>
                  </Col>
                  <Col>
                    <Row>
                      <Col xs={4} md={4} xl={5}>
                        <input type="text" id="newColorName" className="form-control" name="newColorName" value={newColorName} onChange={e => setNewColorName(e.target.value)} placeholder="Color" />
                      </Col>
                      <Col xs={4} md={4} xl={5}>
                        <input type="text" id="newColorInStock" className="form-control" name="newColorInStock" value={newColorInStock} onChange={e => setNewColorInStock(e.target.value)} placeholder="inStock" />
                        <div className="label-comment pt-3">Вес бобин через запятую</div>
                      </Col>
                      <Col xs={4} md={4} xl={2}>
                        <Button type="button" variant="success" className="btn-block" onClick={addColorHandler}>
                          Add Color
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form.Group>

              <ImageUpload image={image} setUploading={setUploading} setImage={setImage} uploading={uploading} />
              <FormFieldAsRowCheckbox value={outOfStock} label="Out Of Stock" onChange={setOutOfStock} />
              <Row>
                <Col sm="2"></Col>
                <Col>
                  <Button type="submit" variant="dark">
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
