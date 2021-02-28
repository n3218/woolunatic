import {
  //
  CART_ADD_ITEM_REQUEST,
  CART_ADD_ITEM_SUCCESS,
  CART_ADD_ITEM_FAIL,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  GET_CART_RESET,
  CART_REMOVE_ITEM_REQUEST,
  CART_REMOVE_ITEM_SUCCESS,
  CART_REMOVE_ITEM_FAIL,
  START_CHECKOUT_REQUEST,
  START_CHECKOUT_SUCCESS,
  START_CHECKOUT_FAIL,
  START_CHECKOUT_RESET,
  //
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAN_ITEMS,
  CART_CLEAR_ITEMS
} from "../constants/cartConstants"

export const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM_REQUEST:
      return {
        loading: true
      }
    case CART_ADD_ITEM_SUCCESS:
      return {
        loading: false,
        ...action.payload
      }
    case CART_ADD_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case GET_CART_REQUEST:
      return {
        loading: true
      }
    case GET_CART_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload
      }
    case GET_CART_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case GET_CART_RESET:
      return {
        items: []
      }

    case CART_REMOVE_ITEM_REQUEST:
      return {
        loading: true
      }
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        loading: false,
        ...action.payload
      }
    case CART_REMOVE_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case START_CHECKOUT_REQUEST:
      return {
        loading: true
      }
    case START_CHECKOUT_SUCCESS:
      return {
        loading: false,
        ...action.payload
      }
    case START_CHECKOUT_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case START_CHECKOUT_RESET:
      return {
        items: []
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: []
      }
    case CART_CLEAN_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => !item.message || item.message === "")
      }

    default:
      return state
  }
}
