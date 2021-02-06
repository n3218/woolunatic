import {
  //
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_UPDATE_ITEM,
  CART_CLEAN_ITEMS
} from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(x => x.product === item.product && x.qty === item.qty)
      if (existItem) {
        return {
          ...state
          // cartItems: state.cartItems.map(x => (x.product === existItem.product && x.qty === existItem.qty ? item : x))
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    case CART_UPDATE_ITEM:
      const { product, qty, message } = action.payload
      const updatingItem = state.cartItems.filter(el => el.product === product && el.qty === qty)[0]
      return {
        ...state,
        cartItems: [...state.cartItems.map(el => (el.product === updatingItem.product && el.qty === updatingItem.qty ? { ...updatingItem, qty, message } : el))]
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => !(item.qty === action.payload.qty && item.product === action.payload.id))
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
        cartItems: state.cartItems.filter(item => item.message === "")
      }
    default:
      return state
  }
}
