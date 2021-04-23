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
import { PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DELETE_RESET } from "../../constants/productConstants"
import Meta from "../../components/Meta"
import { TranslateToWeight } from "../../components/Utils"
import { noimage, imagePath, thumbPath } from "../../constants/commonConstans"
import "./ProductScreen.css"

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const productId = match.params.id
  const [qty, setQty] = useState(0)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [initialImages, setInitialImages] = useState([])
  const [inStockArr, setInStockArr] = useState([])

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  const productCreateReview = useSelector(state => state.productCreateReview)
  const { loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview } = productCreateReview
  const cart = useSelector(state => state.cart)
  const { loading: cartLoading, error: errorLoading, items } = cart

  useEffect(() => {
    if (successCreateReview) {
      setRating(0)
      setComment("")
    }
    if (!product || !product._id || product._id !== productId || successCreateReview) {
      dispatch(productDetailsAction(productId))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
      dispatch({ type: PRODUCT_DELETE_RESET })
    }
    if (product && product.inStock) {
      const arr = product.inStock
        .split(",")
        .map(el => Number(el.trim()))
        .sort((a, b) => a - b)
      setInStockArr([...arr])
      if (qty > 0) {
        console.log(`==========if (${arr.length} === 1 && ${!product.minimum})`)

        if (arr.length === 1 && !product.minimum) {
          console.log("==========if (arr.length === 1 && !product.minimum)")
          if (!checkQtyExistsInCart(qty)) {
            console.log("(`==========if (!checkQtyExistsInCart(qty))")
            setQty(arr[0])
          } else {
            console.log("(`==========ELSE")
            console.log("(`==========if (checkQtyExistsInCart(qty))")

            setQty(0)
          }
        }
      }
    }
    if (product && Array.isArray(product.image) && product.image.length > 0) {
      let imagesArray = []
      product.image.map(img => imagesArray.push({ original: imagePath + img, thumbnail: thumbPath + img }))
      setInitialImages([...imagesArray])
    } else {
      setInitialImages([{ original: noimage, thumbnail: noimage }])
    }
  }, [dispatch, successCreateReview, productId, product])

  const addToCartHandler = () => {
    history.push(`/cart/${productId}/${qty}`)
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(productCreateReviewAction(productId, { rating, comment }))
  }

  const showOptions = min => {
    let values = []
    let minLeftover = Math.ceil(((1500 / product.meterage) * 100) / 100) * 100
    let maxVal = inStockArr[inStockArr.length - 1] - minLeftover
    for (let i = min; i <= maxVal; i += 50) {
      if (!inStockArr.includes(i)) {
        values.push(i)
      }
    }
    console.log(
      "total in Stock: ",
      product.inStock.split(",").reduce((acc, el) => acc + Number(el.trim()), 0)
    )
    return values
  }

  const onChangeHandler = e => {
    dispatch(productDetailsAction(productId))
    setQty(e.target.value)
  }

  const checkQtyExistsInCart = qty => {
    console.log("checkQtyExistsInCart: qty: ", qty)
    let exists = items.filter(el => qty === el.qty && (el.product === product._id || el.product._id === product._id))
    console.log("checkQtyExistsInCart: exists: ", exists)

    if (exists.length > 0) {
      return true
    } else {
      return false
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
          {userInfo && userInfo.isAdmin && (
            <div className="submenu">
              <Link to={`/admin/product/${productId}/edit`} className="btn btn-success bg-blue my-3 px-5">
                <i className="fas fa-edit text-white"></i> Edit
              </Link>
            </div>
          )}

          <div id="product-details">
            {/* ---------------------------Gallery--------------------------- */}

            <div id="product-gallery">
              <ImageGallery //
                onErrorImageURL={noimage}
                items={initialImages}
                showPlayButton={false}
                showIndex={true}
                thumbnailPosition="bottom"
              />
            </div>

            {/* ---------------------------Title--------------------------- */}

            <div id="product-title">
              <h5 className="product-brand">
                <Link to={`/search/${product.brand}`}>{product.brand}</Link>
              </h5>
              <h2>{product.name}</h2>
              {product.regular && <div className="badge badge-pill badge-primary">regular</div>}
              {product.novelty && <div className="badge badge-pill badge-success">new</div>}
              {product.inSale && <div className="badge badge-pill badge-danger">sale</div>}
              <div className="text-right mr-3">
                <a href="#review-section">
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </a>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Art:</Col>
                    <Col className="text-capitalize">{product.art}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Color:</Col>
                    <Col className="text-capitalize">{product.color}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Basic Color:</Col>
                    <Col>
                      <div className={`product_color bg-${product.colorWay}`} title={product.colorWay}></div>
                    </Col>
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
                <ListGroup.Item>
                  <Row>
                    <Col>Yarn weight:</Col>
                    <Col>{TranslateToWeight(product.meterage)} weight</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Category:</Col>
                    <Col className="text-capitalize">{product.category && product.category.split(",").join(", ")}</Col>
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
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {!product.outOfStock && (
                        <Row>
                          <Col>Weight:</Col>
                          <Col>
                            <Form.Group controlId="qty">
                              <Form.Control as="select" className="order-select" value={qty} onChange={onChangeHandler} required>
                                <option key="0" value={0}>
                                  Select...
                                </option>
                                {product.inStock &&
                                  inStockArr.map((el, i) => (
                                    <option key={i} value={el} disabled={checkQtyExistsInCart(el)}>
                                      {el}g cone
                                    </option>
                                  ))}

                                {product.minimum &&
                                  showOptions(product.minimum).map(el => (
                                    <option key={el} value={el}>
                                      {el}g
                                    </option>
                                  ))}
                              </Form.Control>
                            </Form.Group>
                          </Col>
                        </Row>
                      )}

                      <Row>
                        <Col xl={12} xs={12}>
                          <Button className="btn-block btn-success my-3" type="submit" disabled={product.outOfStock || qty === 0}>
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
                    <div className="h6">
                      {review.name} | <small>{review.createdAt.substring(0, 10)}</small>
                    </div>

                    <Rating value={review.rating} />
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
                        <Form.Control as="textarea" rows="5" value={comment} onChange={e => setComment(e.target.value)} placeholder="Write your review here..." required></Form.Control>
                      </Form.Group>
                      <Button type="submit" className="btn-block btn-success my-3" disabled={loadingCreateReview}>
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
