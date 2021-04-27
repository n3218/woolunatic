import {
  CART_LOCAL_ADD_ITEM,
  CART_LOCAL_REMOVE_ITEM,
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
  CART_SAVE_SHIPPING_ADDRESS,
  CART_RESET_SHIPPING_ADDRESS,
  //
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_START_CHECKOUT,
  CART_CLEAR_ITEMS,
  CART_CLEAN_ITEMS,
  CART_CLEAN_ALL
} from "../constants/cartConstants"

export const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case CART_LOCAL_ADD_ITEM:
      const item = action.payload
      if (state.items) {
        return {
          ...state,
          loading: false,
          items: [item, ...state.items]
        }
      } else {
        return {
          ...state,
          loading: false,
          items: [item]
        }
      }

    case CART_ADD_ITEM_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CART_ADD_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        ...action.payload
        // items: action.payload.items
      }
    case CART_ADD_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
        ...action.payload
      }
    case GET_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case GET_CART_RESET:
      return {
        ...state,
        error: false,
        items: []
      }

    case CART_LOCAL_REMOVE_ITEM:
      console.log("cartReducer:")
      console.log("action.payload.qty: ", action.payload.qty)
      console.log("action.payload.id: ", action.payload.id)
      return {
        ...state,
        items: state.items.filter(item => !item._id && !(item.qty === action.payload.qty && item.product === action.payload.id))
      }

    case CART_REMOVE_ITEM_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        ...action.payload,
        items: action.payload.items
      }
    case CART_REMOVE_ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case START_CHECKOUT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case START_CHECKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        ...action.payload
      }
    case START_CHECKOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case START_CHECKOUT_RESET:
      return {
        ...state,
        items: []
      }

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      }
    case CART_RESET_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: {}
      }
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      }
    case CART_SAVE_START_CHECKOUT:
      return {
        ...state,
        startCheckout: action.payload
      }
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        items: []
      }
    case CART_CLEAN_ALL:
      return {
        items: []
      }
    case CART_CLEAN_ITEMS:
      return {
        ...state,
        items: state.items.filter(item => !item.message || item.message === "")
      }

    default:
      return state
  }
}
