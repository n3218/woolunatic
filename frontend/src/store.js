import { createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { applyMiddleware } from "redux"
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, productTopReducer, productListInCategoryReducer, productImageDeleteReducer, deleteAllProductsImagesReducer, deleteAllProductsDataReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from "./reducers/userReducers"
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducers"
import { shippingReducer } from "./reducers/shippingReducers"
import { textReducer } from "./reducers/textReducers"

const reducer = combineReducers({
  productList: productListReducer,
  productListInCategory: productListInCategoryReducer,
  productDetails: productDetailsReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productCreateReview: productCreateReviewReducer,
  productTop: productTopReducer,
  productImageDelete: productImageDeleteReducer,

  deleteAllProductsImages: deleteAllProductsImagesReducer,
  deleteAllProductsData: deleteAllProductsDataReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  cart: cartReducer,

  shippingList: shippingReducer,

  textList: textReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer
})

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") && localStorage.getItem("cartItems") !== "undefined" ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfoFromLocalStorage = localStorage.getItem("userInfo") && localStorage.getItem("userInfo") !== "undefined" ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") && localStorage.getItem("shippingAddress") !== "undefined" ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod") && localStorage.getItem("paymentMethod") !== "undefined" ? JSON.parse(localStorage.getItem("paymentMethod")) : {}
const startCheckoutFromLocalStorage = localStorage.getItem("startCheckout") && localStorage.getItem("startCheckout") !== "undefined" ? JSON.parse(localStorage.getItem("startCheckout")) : {}

const initialState = {
  cart: {
    items: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
    startCheckout: startCheckoutFromLocalStorage
  },
  userLogin: { userInfo: userInfoFromLocalStorage }
}

const midleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))

export default store
