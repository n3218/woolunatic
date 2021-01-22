import React from "react"
import { useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Button, Image } from "react-bootstrap"
import { productDeleteAction } from "../../actions/productActions"
import "./ProductListItem.css"

const ProductListItem = ({ product, history }) => {
  const noimage = "/uploads/noimage/noimage.webp"
  const dispatch = useDispatch()

  const deleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(productDeleteAction(id))
    }
  }

  const detailsHandler = () => history.push(`/products/${product._id}`)

  return (
    <tr key={product._id} className={`product-list-item ${product.outOfStock && "font-weight-light"}`}>
      <td onClick={detailsHandler} className="product-list-min">
        {Array.isArray(product.image) && product.image.length === 0 ? <Image src={noimage} alt={product.name} fluid className="product-list-image" /> : <Image src={product.image[0]} alt={product.name} fluid className="product-list-image" />}
      </td>
      <td onClick={detailsHandler}>{product.brand}</td>
      <td onClick={detailsHandler}>{product.name}</td>
      <td onClick={detailsHandler}>{product.color && product.color}</td>
      <td onClick={detailsHandler}>{product.colorWay && product.colorWay}</td>
      <td onClick={detailsHandler}>{product.category}</td>
      <td onClick={detailsHandler}>{product.fibers}</td>
      <td onClick={detailsHandler}>{product.nm}</td>
      <td onClick={detailsHandler}>{product.meterage}</td>
      <td onClick={detailsHandler}>€{product.price}</td>
      <td onClick={detailsHandler} className="product-list-max">
        {product.inStock}
      </td>
      <td onClick={detailsHandler} className="product-list-min">
        {product.minimum > 0 && product.minimum}
      </td>
      <td onClick={detailsHandler} className="product-list-min">
        {product.regular && <span className="badge badge-pill badge-success">regular</span>}
      </td>
      <td onClick={detailsHandler} className="product-list-min">
        {product.novelty && <span className="badge badge-pill badge-primary">new</span>}
      </td>
      <td onClick={detailsHandler} className="product-list-min">
        {product.inSale && <span className="badge badge-pill badge-danger">sale</span>}
      </td>
      <td className="product-list-min">{product.outOfStock && <i className="fas fa-check text-danger font-weight-bold"></i>}</td>
      <td className="product-list-min">
        <LinkContainer to={`/admin/product/${product._id}/edit`}>
          <Button variant="link" title="Edit">
            <i className="fas fa-edit text-success"></i>
          </Button>
        </LinkContainer>
      </td>
      <td className="product-list-min">
        <Button variant="link" title="Delete" onClick={() => deleteHandler(product._id)}>
          <i className="fas fa-trash text-danger"></i>
        </Button>
      </td>
    </tr>
  )
}

export default ProductListItem
