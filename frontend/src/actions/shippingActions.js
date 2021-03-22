import axios from "axios"
import { GET_SHIPPING_FAIL, GET_SHIPPING_REQUEST, GET_SHIPPING_SUCCESS } from "../constants/shippingConstants"

export const getShippingAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_SHIPPING_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.get(`/api/cart/shipping`, config)
    // if (data && data.items && data.items.length > 0) {
    //   localStorage.setItem("cartItems", JSON.stringify(data.items)) // save to Local Storage
    // }
    dispatch({ type: GET_SHIPPING_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: GET_SHIPPING_FAIL, payload: message })
  }
}
