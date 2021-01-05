import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Col, ListGroup, Row, Card, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import ImageGallery from "react-image-gallery"
import ReactHtmlParser from "react-html-parser"
import Rating from "../components/Rating/Rating"
import { productDetailsAction, productCreateReviewAction } from "../actions/productActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import Meta from "../components/Meta"
import "./ProductScreen.css"

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [colorId, setColorId] = useState("")
  const [colorImages, setColorImages] = useState([])
  const [initialImages, setInitialImages] = useState([])
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const productCreateReview = useSelector(state => state.productCreateReview)
  const { loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview } = productCreateReview
  const noimage = "/assets/noimage.webp"

  useEffect(() => {
    if (successCreateReview) {
      setRating(0)
      setComment("")
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(productDetailsAction(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    if (product.image) {
      let checkedImgArr = []
      product.image.map(img => {
        fetch(img)
          .then(res => {
            if (res.ok) {
              checkedImgArr.push(img)
            } else {
              checkedImgArr.push(noimage)
            }
          })
          .then(() => {
            let currentImages = imagesForGallery(checkedImgArr)
            setInitialImages([...currentImages])
            setColorImages([...currentImages])
          })
      })
    } else {
      setInitialImages(imagesForGallery([noimage]))
      setColorImages(imagesForGallery([noimage]))
    }
  }, [dispatch, match, successCreateReview, product])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}&color=${colorId}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(productCreateReviewAction(match.params.id, { rating, comment }))
  }

  const showOptions = min => {
    let values = []
    for (let i = min; i <= 1500; i += 50) {
      values.push(i)
    }
    return values
  }

  const imagesForGallery = imageArray => {
    let currentImages = []
    imageArray.map(img => currentImages.push({ original: img, thumbnail: img }))
    return currentImages
  }

  const selectColorHandler = e => {
    setColorId(e.target.value)
    if (e.target.value !== "") {
      let imgs = product.color.filter(col => col._id === e.target.value)[0].images
      if (imgs.length > 0) {
        let currentImages = imagesForGallery(imgs)
        setColorImages([...currentImages])
      } else {
        setColorImages([...initialImages])
      }
    } else {
      setColorImages([...initialImages])
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <div className="submenu">
            {userInfo && userInfo.isAdmin && (
              <Link to={`/admin/product/${match.params.id}/edit`} className="btn btn-primary submenu">
                Edit
              </Link>
            )}
          </div>

          <div id="product-details">
            {/* ---------------------------Gallery--------------------------- */}

            <div id="product-gallery">{product.image && <ImageGallery items={colorImages} showPlayButton={false} showIndex={true} thumbnailPosition="left" />}</div>

            {/* ---------------------------Title--------------------------- */}

            <div id="product-title">
              <h5 className="product-brand">{product.brand}</h5>
              <h2>{product.name}</h2>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div>
                    <a href="#review-section">
                      <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </a>
                  </div>
                  <div>Fibers:</div> {product.fibers}
                </ListGroup.Item>
                <ListGroup.Item>
                  <div>Meterage:</div> {product.meterage}m / 100g
                </ListGroup.Item>
              </ListGroup>
            </div>

            {/* ---------------------------Add--------------------------- */}

            <div id="product-add" className="mx-3">
              <Card>
                <Form onSubmit={addToCartHandler}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price: </Col>
                        <Col>€{product.price} / 100g</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Color</Col>
                        <Col>
                          <Form.Group controlId="color">
                            <Form.Control as="select" className="order-select" value={colorId} onChange={selectColorHandler} required>
                              <option key="0" value="">
                                Select...
                              </option>
                              {product.color &&
                                product.color.map(col => (
                                  <option key={col._id} value={col._id}>
                                    {col.name}
                                  </option>
                                ))}
                            </Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {!product.outOfStock && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Group controlId="qty">
                              <Form.Control as="select" className="order-select" value={qty} onChange={e => setQty(e.target.value)} required>
                                <option key="0" value="">
                                  Select...
                                </option>
                                {colorId &&
                                  product.color &&
                                  product.color.filter(col => col._id === colorId)[0].inStock !== "" &&
                                  product.color
                                    .filter(col => col._id === colorId)[0]
                                    .inStock.split(",")
                                    .map((el, i) => (
                                      <option key={i} value={el}>
                                        {el.trim()} cone
                                      </option>
                                    ))}

                                {product.minimum &&
                                  showOptions(product.minimum).map(el => (
                                    <option key={el} value={el}>
                                      {el}
                                    </option>
                                  ))}
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button className="btn-block btn-dark" type="submit" disabled={product.outOfStock}>
                        {!product.outOfStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Form>
              </Card>
            </div>
            {/* ---------------------------Description--------------------------- */}

            <div id="product-description">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <div>{product.description && ReactHtmlParser(product.description)}</div>
                </ListGroup.Item>
              </ListGroup>
            </div>
            {/* ---------------------------Reviews--------------------------- */}

            <div id="product-reviews">
              <h2 className="my-3" id="review-section">
                Reviews
              </h2>
              {product.reviews.length === 0 && <Message variant="warning">No Reviews for this product</Message>}
              <ListGroup variant="flush">
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            {/* ---------------------------Write a customer Review--------------------------- */}

            <div id="product-write-review" className="mx-3 my-3">
              <ListGroup>
                <ListGroup.Item>
                  <h3>Write a customer Review</h3>
                  {loadingCreateReview && <Loader />}
                  {successCreateReview && <Message variant="success">Review submitted successfully</Message>}
                  {errorCreateReview && <Message variant="danger">{errorCreateReview}</Message>}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <div id="rating">
                          <input type="radio" name="rating" value="5" id="5" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="5">&#9734;</label>
                          <input type="radio" name="rating" value="4" id="4" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="4">&#9734;</label>
                          <input type="radio" name="rating" value="3" id="3" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="3">&#9734;</label>
                          <input type="radio" name="rating" value="2" id="2" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="2">&#9734;</label>
                          <input type="radio" name="rating" value="1" id="1" onChange={e => setRating(e.target.value)} />
                          <label htmlFor="1">&#9734;</label>
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Control as="textarea" row="5" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your review here..."></Form.Control>
                      </Form.Group>
                      <Button type="submit" className="btn-block" disabled={loadingCreateReview}>
                        Submit a review
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="light">
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductScreen
