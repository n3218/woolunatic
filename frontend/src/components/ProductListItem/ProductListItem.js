import React, { memo } from "react"
import { useDispatch } from "react-redux"
import { Image } from "react-bootstrap"
import { productDeleteAction } from "../../actions/productActions"
import { minithumbPath, noimage } from "../../constants/commonConstans"
import "./ProductListItem.css"
import { Link } from "react-router-dom"

const ProductListItem = memo(({ product, history }) => {
  const dispatch = useDispatch()

  const deleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(productDeleteAction(id))
    }
  }

  const detailsHandler = () => history.push(`/admin/product/${product._id}/edit`)

  return (
    <tr key={product._id} className={`product-list-item ${product.outOfStock && "font-weight-light"}`}>
      <td onClick={detailsHandler}>{product.art}</td>
      <td onClick={detailsHandler} className="product-list-item_image">
        {product.image.length === 0 ? <Image src={noimage} alt={product.name} fluid className="product-list-image" /> : <Image src={minithumbPath + product.image[0]} alt={product.name} fluid className="product-list-image" />}
      </td>
      <td onClick={detailsHandler}>
        {product.brand}
        <div className="text-capitalize">{product.name}</div>
      </td>
      <td onClick={detailsHandler}>
        {product.color && product.color}
        <br />
        {product.colorWay && product.colorWay}
      </td>
      <td onClick={detailsHandler}>
        {product.category}
        <br />
        {product.fibers}
      </td>
      <td onClick={detailsHandler}>
        {product.nm}
        <br />
        {product.meterage}
      </td>
      <td onClick={detailsHandler}>€{product.price}</td>
      <td onClick={detailsHandler} className="product-list-max">
        {product.inStock}
      </td>
      <td>{product.minimum > 0 && product.minimum}</td>
      <td>
        {product.novelty && (
          <div className="p-0 m-0">
            <span className="badge badge-pill badge-success m-0">new</span>
          </div>
        )}
        {product.regular && (
          <div className="p-0 m-0">
            <span className="badge badge-pill badge-primary m-0">regular</span>
          </div>
        )}
        {product.inSale && (
          <div className="p-0 m-0">
            <span className="badge badge-pill badge-danger m-0">sale</span>
          </div>
        )}
      </td>
      <td>
        <div onClick={() => deleteHandler(product._id)} className="px-2 cursor-pointer">
          <i className="fas fa-trash text-danger"></i>
        </div>
      </td>
      <td className="px-3">{product.outOfStock && <i className="fas fa-check text-danger font-weight-bold"></i>}</td>
    </tr>
  )
})

export default ProductListItem
