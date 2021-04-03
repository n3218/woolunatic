import {
  //
  GET_SHIPPING_LIST_REQUEST,
  GET_SHIPPING_LIST_SUCCESS,
  GET_SHIPPING_LIST_FAIL,
  GET_SHIPPING_LIST_RESET,
  SHIPPING_CREATE_REQUEST,
  SHIPPING_CREATE_SUCCESS,
  SHIPPING_CREATE_FAIL,
  SHIPPING_CREATE_RESET,
  SHIPPING_UPDATE_REQUEST,
  SHIPPING_UPDATE_SUCCESS,
  SHIPPING_UPDATE_FAIL,
  SHIPPING_UPDATE_RESET,
  SHIPPING_DELETE_REQUEST,
  SHIPPING_DELETE_SUCCESS,
  SHIPPING_DELETE_FAIL,
  SHIPPING_DELETE_RESET,
  GET_SHIPPING_BY_ID_REQUEST,
  GET_SHIPPING_BY_ID_SUCCESS,
  GET_SHIPPING_BY_ID_FAIL,
  GET_SHIPPING_BY_ID_RESET
} from "../constants/shippingConstants"

export const shippingReducer = (state = { shippings: [], shipping: {} }, action) => {
  switch (action.type) {
    case GET_SHIPPING_LIST_REQUEST:
      return {
        loading: true
      }
    case GET_SHIPPING_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        shippings: [...action.payload]
      }
    case GET_SHIPPING_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case GET_SHIPPING_LIST_RESET:
      return {
        shippings: []
      }

    case GET_SHIPPING_BY_ID_REQUEST:
      return {
        loading: true
      }
    case GET_SHIPPING_BY_ID_SUCCESS:
      return {
        loading: false,
        getbyidsuccess: true,
        shipping: action.payload
      }
    case GET_SHIPPING_BY_ID_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case GET_SHIPPING_BY_ID_RESET:
      return {
        getbyidsuccess: false,
        shipping: {}
      }

    case SHIPPING_CREATE_REQUEST:
      return {
        loading: true
      }
    case SHIPPING_CREATE_SUCCESS:
      return {
        loading: false,
        createsuccess: true,
        shipping: action.payload
      }
    case SHIPPING_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case SHIPPING_CREATE_RESET:
      return {
        createsuccess: false,
        shipping: {}
      }

    case SHIPPING_UPDATE_REQUEST:
      return {
        loading: true
      }
    case SHIPPING_UPDATE_SUCCESS:
      return {
        loading: false,
        updatesuccess: true,
        shipping: action.payload
      }
    case SHIPPING_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case SHIPPING_UPDATE_RESET:
      return {
        updatesuccess: false,
        shipping: {}
      }

    case SHIPPING_DELETE_REQUEST:
      return {
        loading: true
      }
    case SHIPPING_DELETE_SUCCESS:
      return {
        loading: false,
        deletesuccess: true,
        ...action.payload
      }
    case SHIPPING_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case SHIPPING_DELETE_RESET:
      return {
        deletesuccess: false,
        shippings: []
      }

    default:
      return state
  }
}
