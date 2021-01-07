import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from "react-router-dom"
import { Button, Image } from "react-bootstrap"
import { productDeleteAction } from "../actions/productActions"

const ProductListItem = ({ product }) => {
  const noimage = "/assets/noimage.webp"
  const dispatch = useDispatch()
  const [imgSrc, setImgSrc] = useState(noimage)

  const deleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(productDeleteAction(id))
    }
  }

  fetch(product.image[0]).then(res => {
    if (res.ok) {
      setImgSrc(product.image[0])
    } else {
      setImgSrc(noimage)
    }
  })

  return (
    <tr key={product._id} className={`${product.outOfStock && "font-weight-light"}`}>
      <td width="50px">
        {product.image.length === 0 ? (
          <div>
            <Image src={noimage} alt={product.name} fluid />
          </div>
        ) : (
          <Image src={imgSrc} alt={product.name} fluid />
        )}
      </td>
      <td>{product.brand}</td>
      <td>
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      </td>
      <td>{product.category}</td>
      <td>{product.fibers}</td>
      <td>{product.meterage}</td>
      <td>{product.minimum}</td>
      <td>€{product.price}</td>
      <td>
        {product.color &&
          product.color.map((col, i) =>
            col.inStock !== "" ? (
              <div key={col.name}>
                <i>{col.name}</i> : {col.inStock}
              </div>
            ) : (
              <span key={col.name}>
                <i>{col.name}</i>
                {i !== product.color.length - 1 && ", "}
              </span>
            )
          )}
      </td>
      <td>{product.outOfStock && <i className="fas fa-check text-danger font-weight-bold"></i>}</td>
      <td>
        <LinkContainer to={`/admin/product/${product._id}/edit`}>
          <Button variant="link" title="Edit">
            <i className="fas fa-edit text-success"></i>
          </Button>
        </LinkContainer>
      </td>
      <td>
        <Button variant="link" title="Delete" onClick={() => deleteHandler(product._id)}>
          <i className="fas fa-trash text-danger"></i>
        </Button>
      </td>
    </tr>
  )
}

export default ProductListItem
