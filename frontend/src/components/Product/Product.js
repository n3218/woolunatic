import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { thumbPath } from "../../constants/commonConstans"
import Rating from "../Rating/Rating"
import "./Product.css"

const Product = ({ product }) => {
  return (
    <Card className="product-card">
      <div className="product-card_badges">
        {product.outOfStock && <div className="badge badge-pill badge-secondary">out Of Stock</div>}
        {product.regular && <div className="badge badge-pill badge-primary">regular</div>}
        {product.novelty && <div className="badge badge-pill badge-success">new</div>}
        {product.inSale && <div className="badge badge-pill badge-danger">sale</div>}
      </div>
      <div className="product-card_img-container">
        <Link to={`/products/${product._id}`}>
          <Card.Img src={thumbPath + product.image[0]} variant="top" alt={product.name} className="product-card_img" />
        </Link>
      </div>

      <Card.Body className="product-card_body">
        {product.brand && (
          <Card.Text className="product-card_brand">
            <nobr>{product.brand}</nobr>
          </Card.Text>
        )}
        {product.name && (
          <Card.Title className="product-card_name">
            <Link to={`/products/${product._id}`}>
              <nobr className="text-capitalize">{product.name}</nobr>
            </Link>
          </Card.Title>
        )}
        {product.color && (
          <Card.Subtitle as="div" className="product-card_color">
            <nobr>
              <span className="text-capitalize">{product.color}</span>
            </nobr>
          </Card.Subtitle>
        )}

        {product.fibers && (
          <Card.Text as="div" className="product-card_fibers">
            {product.fibers}
          </Card.Text>
        )}

        {product.numReviews > 0 && (
          <Card.Text as="div">
            <Rating value={product.rating} text={`${product.numReviews} ${product.numReviews === 1 ? "review" : "reviews"}`} />
          </Card.Text>
        )}

        <Card.Text as="div">
          {product.meterage && (
            <Card.Text as="div" className="product-card_meterage">
              <nobr>{product.meterage}m/100g</nobr>
            </Card.Text>
          )}
          {product.price && (
            <Card.Text as="div" className="product-card_price">
              <nobr>
                €{product.price}/<small>100g</small>
              </nobr>
            </Card.Text>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
