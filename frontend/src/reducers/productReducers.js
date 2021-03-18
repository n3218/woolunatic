import {
  PRODUCT_LIST_REQUEST, //
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_LISTINCATEGORY_REQUEST,
  PRODUCT_LISTINCATEGORY_SUCCESS,
  PRODUCT_LISTINCATEGORY_FAIL,
  PRODUCT_IMAGE_DELETE_REQUEST,
  PRODUCT_IMAGE_DELETE_SUCCESS,
  PRODUCT_IMAGE_DELETE_FAIL,
  PRODUCT_IMAGE_DELETE_RESET,
  PRODUCT_DELETE_RESET,
  DELETE_ALL_PRODUCTS_IMAGES_REQUEST,
  DELETE_ALL_PRODUCTS_IMAGES_SUCCESS,
  DELETE_ALL_PRODUCTS_IMAGES_FAIL,
  DELETE_ALL_PRODUCTS_IMAGES_RESET,
  DELETE_ALL_PRODUCTS_DATA_REQUEST,
  DELETE_ALL_PRODUCTS_DATA_SUCCESS,
  DELETE_ALL_PRODUCTS_DATA_FAIL,
  DELETE_ALL_PRODUCTS_DATA_RESET
} from "../constants/productConstants"

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload
      }
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productListInCategoryReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LISTINCATEGORY_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_LISTINCATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.payload
      }
    case PRODUCT_LISTINCATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DETAILS_RESET:
      return { product: { reviews: [] } }
    default:
      return state
  }
}

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true, message: action.payload.message }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

export const productTopReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] }
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload }
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productImageDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_IMAGE_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_IMAGE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_IMAGE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case PRODUCT_IMAGE_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const deleteAllProductsImagesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ALL_PRODUCTS_IMAGES_REQUEST:
      return { loading: true }
    case DELETE_ALL_PRODUCTS_IMAGES_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case DELETE_ALL_PRODUCTS_IMAGES_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_ALL_PRODUCTS_IMAGES_RESET:
      return {}
    default:
      return state
  }
}

export const deleteAllProductsDataReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ALL_PRODUCTS_DATA_REQUEST:
      return { loading: true }
    case DELETE_ALL_PRODUCTS_DATA_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case DELETE_ALL_PRODUCTS_DATA_FAIL:
      return { loading: false, error: action.payload }
    case DELETE_ALL_PRODUCTS_DATA_RESET:
      return {}
    default:
      return state
  }
}
