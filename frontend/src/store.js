import { createStore, combineReducers } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { applyMiddleware } from "redux"
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, productTopReducer, productListInCategoryReducer, productImageDeleteReducer, deleteAllProductsImagesReducer, deleteAllProductsDataReducer } from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducers/userReducers"
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer } from "./reducers/orderReducers"

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
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  cart: cartReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer
})

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") && localStorage.getItem("cartItems") !== "undefined" ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfoFromLocalStorage = localStorage.getItem("userInfo") && localStorage.getItem("userInfo") !== "undefined" ? JSON.parse(localStorage.getItem("userInfo")) : null
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") && localStorage.getItem("shippingAddress") !== "undefined" ? JSON.parse(localStorage.getItem("shippingAddress")) : {}
const paymentMethodFromStorage = localStorage.getItem("paymentMethod") && localStorage.getItem("paymentMethod") !== "undefined" ? JSON.parse(localStorage.getItem("paymentMethod")) : {}

const initialState = {
  cart: {
    items: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  },
  userLogin: { userInfo: userInfoFromLocalStorage }
}

const midleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...midleware)))

export default store
