import {
  CART_ADD_ITEM, //
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_UPDATE_ITEM,
  CART_CLEAN_ITEMS
} from "../constants/cartConstants"
import axios from "axios"

export const cartAddItemAction = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      art: data.art,
      name: data.name,
      brand: data.brand,
      fibers: data.fibers,
      meterage: data.meterage,
      minimum: data.minimum,
      image: data.image[0],
      price: data.price,
      color: data.color,
      qty
    }
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const cartUpdateItemAction = (product, qty) => async (dispatch, getState) => {
  var message = ""
  try {
    const { data } = await axios.get(`/api/products/${product}`)
    if (data.outOfStock) {
      message = "Product out of stock"
    }
    if (data.inStock) {
      const arr = data.inStock
        .split(",")
        .map(el => Number(el.trim()))
        .sort((a, b) => a - b)

      if (arr.includes(qty)) {
      } else {
        if (data.minimum > 0) {
          let minLeftover = Math.ceil(((1500 / data.meterage) * 100) / 100) * 100
          let maxVal = arr[arr.length - 1] - minLeftover
          if (qty >= data.minimum && qty <= maxVal) {
            message = ""
          } else {
            message = "Weight not found"
          }
        } else {
          message = "Weight not found"
        }
      }
    }
  } catch (err) {
    message = "Product not found"
  }
  dispatch({
    type: CART_UPDATE_ITEM,
    payload: {
      product,
      qty,
      message: message
    }
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const cartRemoveItemAction = (id, qty) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: { id, qty }
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddressAction = data => async dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })
  localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethodAction = data => async dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })
  localStorage.setItem("paymentMethod", JSON.stringify(data))
}

export const cartCleanItemsAction = () => async (dispatch, getState) => {
  dispatch({
    type: CART_CLEAN_ITEMS
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
