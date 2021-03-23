import {
  //
  GET_SHIPPING_REQUEST,
  GET_SHIPPING_SUCCESS,
  GET_SHIPPING_FAIL,
  GET_SHIPPING_RESET
} from "../constants/shippingConstants"

export const shippingReducer = (state = { shippings: [] }, action) => {
  switch (action.type) {
    case GET_SHIPPING_REQUEST:
      return {
        loading: true
      }
    case GET_SHIPPING_SUCCESS:
      return {
        loading: false,
        success: true,
        shippings: [...action.payload]
      }
    case GET_SHIPPING_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case GET_SHIPPING_RESET:
      return {
        items: []
      }

    default:
      return state
  }
}
