import {
  //
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_UPDATE_ITEM
} from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload
      const existItem = state.cartItems.find(x => x.product === item.product && x.color === item.color)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => (x.product === existItem.product && x.color === existItem.color ? item : x))
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    case CART_UPDATE_ITEM:
      const { product, qty, color } = action.payload
      const updatingItem = state.cartItems.filter(el => el.product === product && el.color === color)[0]
      return {
        ...state,
        cartItems: [...state.cartItems.map(el => (el.product === updatingItem.product && el.color === updatingItem.color ? { ...updatingItem, qty } : el))]
      }

    case CART_REMOVE_ITEM:
      console.log("cartReducer:")
      console.log("action.payload.color: ", action.payload.color)
      console.log("action.payload.id: ", action.payload.id)
      return {
        ...state,
        cartItems: state.cartItems.filter(item => !(item.color === action.payload.color && item.product === action.payload.id))
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
    default:
      return state
  }
}
