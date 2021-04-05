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
  //
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAN_ITEMS,
  CART_CLEAR_ITEMS
} from "../constants/cartConstants"

export const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case CART_LOCAL_ADD_ITEM:
      const item = action.payload
      if (state.items) {
        // const existItem = state.items.find(x => x.product === item.product && x.qty === item.qty)
        // if (existItem) {
        //   return {
        //     ...state,
        //     loading: false,
        //     items: state.items.map(x => (x.product === existItem.product && x.qty === existItem.qty ? item : x))
        //   }
        // } else {
        return {
          ...state,
          loading: false,
          items: [item, ...state.items]
        }
        // }
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
        ...action.payload,
        items: action.payload.items
      }
    case CART_ADD_ITEM_FAIL:
      return {
        loading: false,
        error: action.payload
      }

    case GET_CART_REQUEST:
      if (state.items) {
        return {
          ...state,
          loading: true
        }
      } else {
        return {
          ...state,
          loading: true
        }
      }
    case GET_CART_SUCCESS:
      console.log("cartReducer: GET_CART_SUCCESS: action.payload: ", action.payload)
      if (state.items) {
        return {
          loading: false,
          success: true,
          ...action.payload
          // items: [...state.items, ...action.payload.items]
        }
      } else {
        return {
          loading: false,
          success: true,
          ...action.payload
          // items: action.payload.items
        }
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

    case CART_LOCAL_REMOVE_ITEM:
      console.log("cartReducer:")
      console.log("action.payload.qty: ", action.payload.qty)
      console.log("action.payload.id: ", action.payload.id)
      return {
        ...state,
        items: state.items.filter(item => !(item.qty === action.payload.qty && item.product === action.payload.id))
      }

    case CART_REMOVE_ITEM_REQUEST:
      return {
        loading: true
      }
    case CART_REMOVE_ITEM_SUCCESS:
      return {
        loading: false,
        ...action.payload,
        items: action.payload.items
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
        ...action.payload,
        items: action.payload.items
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
