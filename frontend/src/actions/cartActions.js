import {
  CART_ADD_ITEM, //
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_UPDATE_ITEM,
  CART_CLEAN_ITEMS,
  CART_CHECK_ITEMS_REQUEST,
  CART_CHECK_ITEMS_SUCCESS,
  CART_CHECK_ITEMS_FAIL,
  REMOVE_CART_ITEMS_FROM_DB_REQUEST,
  REMOVE_CART_ITEMS_FROM_DB_SUCCESS,
  REMOVE_CART_ITEMS_FROM_DB_FAIL
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

export const cartCheckItemsAction = cartItems => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_CHECK_ITEMS_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(`/api/products/check`, cartItems, config)
    if (data) {
      dispatch({ type: CART_CHECK_ITEMS_SUCCESS, payload: data })
    }
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    console.error(message)
    dispatch({ type: CART_CHECK_ITEMS_FAIL, payload: message })
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const cartRemoveItemsFromDBAction = cartItems => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_CART_ITEMS_FROM_DB_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(`/api/products/removefromdb`, cartItems, config)
    if (data) {
      console.log("=========================REMOVEProductsFromDBAction:data: ", data)
      dispatch({ type: REMOVE_CART_ITEMS_FROM_DB_SUCCESS, payload: data })
    }
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    console.error(message)
    dispatch({ type: REMOVE_CART_ITEMS_FROM_DB_FAIL, payload: message })
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
