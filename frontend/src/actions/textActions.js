import axios from "axios"
import {
  //
  TEXT_UPDATE_FAIL,
  TEXT_UPDATE_REQUEST,
  TEXT_UPDATE_SUCCESS,
  TEXT_CREATE_FAIL,
  TEXT_CREATE_REQUEST,
  TEXT_CREATE_SUCCESS,
  TEXT_LIST_FAIL,
  TEXT_LIST_REQUEST,
  TEXT_LIST_SUCCESS,
  GET_TEXT_REQUEST,
  GET_TEXT_SUCCESS,
  GET_TEXT_FAIL,
  TEXT_DELETE_REQUEST,
  TEXT_DELETE_SUCCESS,
  TEXT_DELETE_FAIL
} from "../constants/textConstants"
import { logout } from "./userActions"

export const textCreateAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TEXT_CREATE_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const user = userInfo._id
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.post(`/api/texts`, { user }, config)
    dispatch({ type: TEXT_CREATE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === "Not authorized, token failed") {
      dispatch(logout())
    }
    dispatch({
      type: TEXT_CREATE_FAIL,
      payload: message
    })
  }
}

export const textUpdateAction = text => async (dispatch, getState) => {
  console.log("textUpdateAction")
  console.log("textUpdateAction: text: ", text)
  try {
    dispatch({ type: TEXT_UPDATE_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.put(`/api/texts/${text._id}`, { ...text, user: userInfo._id }, config)
    console.log("textUpdateAction: data: ", data)
    dispatch({ type: TEXT_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === "Not authorized, token failed") {
      dispatch(logout())
    }
    dispatch({
      type: TEXT_UPDATE_FAIL,
      payload: message
    })
  }
}

export const getTextAction = textId => async dispatch => {
  console.log("getTextAction: textId", textId)
  try {
    dispatch({ type: GET_TEXT_REQUEST })
    const { data } = await axios.get(`/api/texts/${textId}`)
    console.log("getTextAction: data", data)
    dispatch({ type: GET_TEXT_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: GET_TEXT_FAIL, payload: message })
  }
}

export const getTextByUrlAction = textUrl => async dispatch => {
  console.log("getTextByUrlAction: textUrl", textUrl)
  try {
    dispatch({ type: GET_TEXT_REQUEST })
    const { data } = await axios.get(`/api/texts/url/${textUrl}`)
    console.log("getTextByUrlAction: data", data)
    dispatch({ type: GET_TEXT_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: GET_TEXT_FAIL, payload: message })
  }
}

export const textListAction = () => async dispatch => {
  try {
    dispatch({ type: TEXT_LIST_REQUEST })
    const { data } = await axios.get(`/api/texts`)
    console.log("textListAction: data", data)
    dispatch({ type: TEXT_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    dispatch({ type: TEXT_LIST_FAIL, payload: message })
  }
}

export const textDeleteAction = id => async (dispatch, getState) => {
  try {
    dispatch({ type: TEXT_DELETE_REQUEST })
    const {
      userLogin: { userInfo }
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }
    const { data } = await axios.delete(`/api/texts/${id}`, config)
    console.log("data: ", data)
    dispatch({ type: TEXT_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    if (message === "Not authorized, token failed") {
      dispatch(logout())
    }
    dispatch({
      type: TEXT_DELETE_FAIL,
      payload: message
    })
  }
}
