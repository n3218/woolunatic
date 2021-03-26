import axios from "axios"
import { GET_SHIPPING_FAIL, GET_SHIPPING_REQUEST, GET_SHIPPING_SUCCESS } from "../constants/shippingConstants"

export const getShippingAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SHIPPING_REQUEST })
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const { data } = await axios.get(`/api/cart/shipping`, config)
    dispatch({ type: GET_SHIPPING_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: GET_SHIPPING_FAIL, payload: message })
  }
}
