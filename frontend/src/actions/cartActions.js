import {
  CART_LOCAL_ADD_ITEM,
  CART_LOCAL_REMOVE_ITEM,
  ADD_LOCAL_CART_ITEMS_TO_CART_REQUEST,
  //
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_SUCCESS,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  START_CHECKOUT_FAIL,
  START_CHECKOUT_REQUEST,
  START_CHECKOUT_SUCCESS,
  //
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAN_ITEMS
  // CART_CLEAR_REQUEST,
  // CART_CLEAR_SUCCESS,
  // CART_CLEAR_FAIL
} from "../constants/cartConstants"
import axios from "axios"
import { logout } from "./userActions"

const checkIfQtyAlreadyInCart = (cart, product, itemQty) => {
  let totalInStock = product.inStock.split(",").reduce((acc, el) => acc + Number(el.trim()))
  console.log("checkIfQtyAlreadyInCart: totalInStock: ", totalInStock)
  let relevantItems = cart.items.filter(it => it.product === product._id)
  console.log("checkIfQtyAlreadyInCart: relevantItems: ", relevantItems)
  relevantItems.map(it => (totalInStock -= it.qty))
  if (totalInStock > 0) {
    if (totalInStock - itemQty >= product.minimum || totalInStock - itemQty === 0) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const cartLocalAddItemAction = (id, qty) => async (dispatch, getState) => {
  console.log("cartLocalAddItemAction: id, qty: ", id, qty)
  dispatch({ type: CART_ADD_ITEM_REQUEST })
  try {
    const { data } = await axios.get(`/api/products/${id}`)
    const product = data
    console.log("cartLocalAddItemAction: product: ", product)

    let cart = getState().cart
    let itemQty = qty

    if (checkIfQtyAlreadyInCart(cart, product, itemQty)) {
      dispatch({
        type: CART_LOCAL_ADD_ITEM,
        payload: {
          product: product._id,
          art: product.art,
          name: product.name,
          brand: product.brand,
          fibers: product.fibers,
          meterage: product.meterage,
          image: product.image[0],
          price: product.price,
          color: product.color,
          qty
        }
      })
    } else {
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload: "Weight can not be added to the Cart, it is out of total Item weight"
      })
    }

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.items)) // save to Local Storage
  } catch (error) {
    const message = error.response && error.response.product.message ? error.response.product.message : error.message
    dispatch({ type: CART_ADD_ITEM_FAIL, payload: message })
  }
}

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
    const {
      cart: { items }
    } = getState()
    console.log("getCartAction: items: ", items)
    console.log("getCartAction: userInfo: ", userInfo)

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const itemsFromLocalCart = items ? items.filter(el => !el._id) : {}

    console.log("getCartAction: itemsFromLocalCart: ", itemsFromLocalCart)
    const { data } = await axios.post(`/api/cart/${userInfo._id}`, itemsFromLocalCart, config)

    console.log("getCartAction: data: ", data)
    if (data && data.items && data.items.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(data.items)) // save to Local Storage
    }
    dispatch({ type: GET_CART_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: GET_CART_FAIL, payload: message })
    dispatch(logout())
  }
}

export const cartLocalRemoveItemAction = (id, qty) => async (dispatch, getState) => {
  console.log("cartLocalRemoveItemAction: ", id, qty)
  dispatch({
    type: CART_LOCAL_REMOVE_ITEM,
    payload: { id, qty }
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.items))
}

export const cartRemoveItemAction = (productId, qty) => async (dispatch, getState) => {
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
      productId: productId,
      qty: qty
    }
    const { data } = await axios.put(`/api/cart/${userInfo._id}`, item, config)
    localStorage.setItem("cartItems", JSON.stringify(data.items)) // save to Local Storage
    dispatch({ type: CART_REMOVE_ITEM_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: CART_REMOVE_ITEM_FAIL, payload: message })
  }
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
    const userId = {
      user: userInfo._id
    }
    const { data } = await axios.put(`/api/cart/startcheckout`, userId, config)
    console.log("data: ", data)
    localStorage.setItem("startCheckout", JSON.stringify(Date.now())) // save to Local Storage
    dispatch({ type: START_CHECKOUT_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: START_CHECKOUT_FAIL, payload: message })
  }
}

export const savePaymentMethodAction = data => async dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  })
  localStorage.setItem("paymentMethod", JSON.stringify(data))
}

export const saveShippingAddressAction = data => async dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data
  })
  localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const cartCleanItemsAction = () => async (dispatch, getState) => {
  dispatch({
    type: CART_CLEAN_ITEMS
  })
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.items))
}
