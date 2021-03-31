import {
  //
  TEXT_LIST_REQUEST,
  TEXT_LIST_SUCCESS,
  TEXT_LIST_FAIL,
  TEXT_LIST_RESET,
  TEXT_CREATE_REQUEST,
  TEXT_CREATE_SUCCESS,
  TEXT_CREATE_FAIL,
  TEXT_CREATE_RESET,
  TEXT_UPDATE_REQUEST,
  TEXT_UPDATE_SUCCESS,
  TEXT_UPDATE_FAIL,
  TEXT_UPDATE_RESET,
  GET_TEXT_REQUEST,
  GET_TEXT_SUCCESS,
  GET_TEXT_FAIL,
  GET_TEXT_RESET,
  TEXT_DELETE_REQUEST,
  TEXT_DELETE_SUCCESS,
  TEXT_DELETE_FAIL
} from "../constants/textConstants"

export const textReducer = (state = { texts: [], text: {} }, action) => {
  console.log("textReducer: action.payload: ", action.payload)
  switch (action.type) {
    case TEXT_LIST_REQUEST:
      return {
        loading: true
      }
    case TEXT_LIST_SUCCESS:
      return {
        loading: false,
        texts: [...action.payload]
      }
    case TEXT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case TEXT_LIST_RESET:
      return {
        texts: []
      }

    case TEXT_CREATE_REQUEST:
      return {
        loading: true,
        texts: state.texts
      }
    case TEXT_CREATE_SUCCESS:
      return {
        loading: false,
        createsuccess: true,
        texts: state.texts,
        text: action.payload
      }
    case TEXT_CREATE_FAIL:
      return {
        texts: state.texts,
        loading: false,
        error: action.payload
      }
    case TEXT_CREATE_RESET:
      return {
        text: {}
      }

    case TEXT_UPDATE_REQUEST:
      return {
        texts: state.texts,
        loading: true
      }
    case TEXT_UPDATE_SUCCESS:
      return {
        texts: state.texts,
        loading: false,
        updatesuccess: true,
        text: action.payload
      }
    case TEXT_UPDATE_FAIL:
      return {
        texts: state.texts,
        loading: false,
        error: action.payload
      }
    case TEXT_UPDATE_RESET:
      return {
        text: {}
      }

    case GET_TEXT_REQUEST:
      return {
        texts: state.texts,
        loading: true
      }
    case GET_TEXT_SUCCESS:
      return {
        texts: state.texts,
        loading: false,
        text: action.payload
      }
    case GET_TEXT_FAIL:
      return {
        texts: state.texts,
        loading: false,
        error: action.payload
      }
    case GET_TEXT_RESET:
      return {
        text: {}
      }

    case TEXT_DELETE_REQUEST:
      return {
        texts: state.texts,
        loading: true
      }
    case TEXT_DELETE_SUCCESS:
      return {
        texts: state.texts,
        loading: false,
        deletesuccess: true,
        message: action.payload
      }
    case TEXT_DELETE_FAIL:
      return {
        texts: state.texts,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}
