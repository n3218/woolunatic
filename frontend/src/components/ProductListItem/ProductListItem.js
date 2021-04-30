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
    <tr key={product._id} className={`product-list-item ${product.outOfStock && " text-desabled "}`}>
      <td>
        <Link to={`/admin/product/${product._id}/edit`}>{product.art}</Link>
      </td>
      <td className="product-list-item_image">
        <Link to={`/admin/product/${product._id}/edit`}>{product.image.length === 0 ? <Image src={noimage} alt={product.name} fluid className="product-list-image" /> : <Image src={minithumbPath + product.image[0]} alt={product.name} fluid className="product-list-image" />}</Link>
      </td>
      <td>
        <Link to={`/admin/product/${product._id}/edit`}>
          {product.brand}
          <div className="text-capitalize">{product.name}</div>
        </Link>
      </td>
      <td>
        <Link to={`/admin/product/${product._id}/edit`}>
          {product.color && product.color}
          <br />
          {product.colorWay && product.colorWay}
        </Link>
      </td>
      <td>
        <Link to={`/admin/product/${product._id}/edit`}>
          {product.category}
          <br />
          {product.fibers}
        </Link>
      </td>
      <td>
        <Link to={`/admin/product/${product._id}/edit`}>
          {product.nm}
          <br />
          {product.meterage}
        </Link>
      </td>
      <td>
        <Link to={`/admin/product/${product._id}/edit`}>€{product.price}</Link>
      </td>
      <td className="product-list-max">
        <Link to={`/admin/product/${product._id}/edit`}>{product.inStock}</Link>
      </td>
      <td>
        <Link to={`/admin/product/${product._id}/edit`}>{product.minimum > 0 && product.minimum}</Link>
      </td>
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
