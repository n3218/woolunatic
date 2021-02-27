import {
  CART_ADD_ITEM_REQUEST, //
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
  REMOVE_CART_ITEMS_FROM_DB_FAIL,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_SUCCESS,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  START_CHECKOUT_FAIL,
  START_CHECKOUT_REQUEST,
  START_CHECKOUT_SUCCESS,
  CART_CLEAR_REQUEST,
  CART_CLEAR_SUCCESS,
  CART_CLEAR_FAIL
} from "../constants/cartConstants"
import axios from "axios"

export const cartAddItemAction = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_ITEM_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const item = {
      user: userInfo._id,
      productId: id,
      qty
    }
    const { data } = await axios.post(`/api/cart`, item, config)
    if (data && data.items && data.items.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(data.items)) // save to Local Storage
    }
    console.log("cartAddItemAction: data: ", data)
    dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: message })
  }
}

export const getCartAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CART_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/cart/${userInfo._id}`, config)
    if (data && data.items && data.items.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(data.items)) // save to Local Storage
    }
    dispatch({ type: GET_CART_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: GET_CART_FAIL, payload: message })
  }
}

export const cartRemoveItemAction = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_ITEM_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const item = {
      user: userInfo._id,
      productId: id,
      qty
    }
    const { data } = await axios.put(`/api/cart/${userInfo._id}`, item, config)
    localStorage.setItem("cartItems", JSON.stringify(data.items)) // save to Local Storage
    dispatch({ type: CART_REMOVE_ITEM_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: CART_REMOVE_ITEM_FAIL, payload: message })
  }
}

export const cartClearAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_CLEAR_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(`/api/cart/${userInfo._id}/clear`, {}, config)
    localStorage.setItem("cartItems", JSON.stringify([])) // save to Local Storage
    dispatch({ type: CART_CLEAR_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: CART_CLEAR_FAIL, payload: message })
  }
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

export const startCheckoutAction = () => async (dispatch, getState) => {
  console.log("startCheckoutAction")
  try {
    dispatch({ type: START_CHECKOUT_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const item = {
      user: userInfo._id
    }
    const { data } = await axios.put(`/api/cart/startcheckout`, item, config)
    console.log("data: ", data)
    // localStorage.setItem("cartItems", JSON.stringify(data.items)) // save to Local Storage
    dispatch({ type: START_CHECKOUT_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: START_CHECKOUT_FAIL, payload: message })
  }
}
