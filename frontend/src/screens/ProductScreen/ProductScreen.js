import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Col, ListGroup, Row, Card, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import ImageGallery from "react-image-gallery"
import ReactHtmlParser from "react-html-parser"
import Rating from "../../components/Rating/Rating"
import { productDetailsAction, productCreateReviewAction } from "../../actions/productActions"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants"
import Meta from "../../components/Meta"
import "./ProductScreen.css"

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [initialImages, setInitialImages] = useState([])
  const [inStockArr, setInStockArr] = useState([])

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
    if (product.inStock) {
      console.log("product.inStock: ", product.inStock)
      const arr = product.inStock
        .split(",")
        .map(el => parseInt(el.trim()))
        .sort((a, b) => a - b)
      console.log("arr: ", arr)
      setInStockArr([...arr])
    }
    if (product.image) {
      let checkedImgArr = []
      product.image.map(img => {
        return fetch(img)
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
          })
      })
    } else {
      setInitialImages(imagesForGallery([noimage]))
    }
  }, [dispatch, match, successCreateReview, product])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(productCreateReviewAction(match.params.id, { rating, comment }))
  }

  const showOptions = min => {
    let values = []
    let maxVal = inStockArr[inStockArr.length - 1]
    for (let i = min; i <= maxVal; i += 50) {
      values.push(i)
    }
    return values
  }

  const imagesForGallery = imageArray => {
    let currentImages = []
    imageArray.map(img => currentImages.push({ original: img, thumbnail: img }))
    return currentImages
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

            <div id="product-gallery">{product.image && <ImageGallery items={initialImages} showPlayButton={false} showIndex={true} thumbnailPosition="left" />}</div>

            {/* ---------------------------Title--------------------------- */}

            <div id="product-title">
              <h5 className="product-brand">{product.brand}</h5>
              <h2>{product.name}</h2>
              <div className="text-right mr-3">
                <a href="#review-section">
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </a>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Color:</Col>
                    <Col>{product.color}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Basic Color:</Col>
                    <Col>{product.colorWay}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Fibers:</Col>
                    <Col>{product.fibers}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Meterage:</Col>
                    <Col>{product.meterage}m / 100g</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>NM:</Col>
                    <Col>{product.nm}</Col>
                  </Row>
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

                      {!product.outOfStock && (
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Group controlId="qty">
                              <Form.Control as="select" className="order-select" value={qty} onChange={e => setQty(e.target.value)} required>
                                <option key="0" value="">
                                  Select...
                                </option>
                                {product.inStock &&
                                  inStockArr.map((el, i) => (
                                    <option key={i} value={el}>
                                      {el} gr
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
                      )}
                      <Row>
                        <Col xl={12} xs={12}>
                          <Button className="btn-block btn-dark" type="submit" disabled={product.outOfStock}>
                            {!product.outOfStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </Col>
                      </Row>
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
            {/* ---------------------------Reviews-------------------------------- */}

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
