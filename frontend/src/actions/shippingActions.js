import axios from "axios"
import { GET_SHIPPING_BY_ID_FAIL, GET_SHIPPING_BY_ID_REQUEST, GET_SHIPPING_BY_ID_SUCCESS, GET_SHIPPING_LIST_FAIL, GET_SHIPPING_LIST_REQUEST, GET_SHIPPING_LIST_SUCCESS, SHIPPING_CREATE_FAIL, SHIPPING_CREATE_REQUEST, SHIPPING_CREATE_SUCCESS, SHIPPING_DELETE_FAIL, SHIPPING_DELETE_REQUEST, SHIPPING_DELETE_SUCCESS, SHIPPING_UPDATE_FAIL, SHIPPING_UPDATE_REQUEST, SHIPPING_UPDATE_SUCCESS } from "../constants/shippingConstants"

export const getShippingListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SHIPPING_LIST_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.get(`/api/shippings`, config)
    dispatch({ type: GET_SHIPPING_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: GET_SHIPPING_LIST_FAIL, payload: message })
  }
}

export const getShippingByIdAction = shippingId => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SHIPPING_BY_ID_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.get(`/api/shippings/${shippingId}`, config)
    dispatch({ type: GET_SHIPPING_BY_ID_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: GET_SHIPPING_BY_ID_FAIL, payload: message })
  }
}

export const shippingCreateAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SHIPPING_CREATE_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    // const user = userInfo._id
    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    console.log("shippingCreateAction: config: ", config)
    const { data } = await axios.post(`/api/shippings/`, {}, config)
    console.log("shippingCreateAction: data: ", data)

    dispatch({ type: SHIPPING_CREATE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: SHIPPING_CREATE_FAIL, payload: message })
  }
}

export const shippingUpdateAction = shipping => async (dispatch, getState) => {
  try {
    dispatch({ type: SHIPPING_UPDATE_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(`/api/shippings/${shipping._id}`, { shipping }, config)
    dispatch({ type: SHIPPING_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: SHIPPING_UPDATE_FAIL, payload: message })
  }
}

export const shippingDeleteAction = shippingId => async (dispatch, getState) => {
  try {
    dispatch({ type: SHIPPING_DELETE_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    // const user = userInfo._id
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.delete(`/api/shippings/${shippingId}`, config)
    console.log("shippingDeleteAction: data: ", data)
    dispatch({ type: SHIPPING_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: SHIPPING_DELETE_FAIL, payload: message })
  }
}
