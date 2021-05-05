import React, { useEffect } from "react"
import Meta from "../../components/Meta"
import FormContainer from "../../components/FormContainer"
import { useDispatch, useSelector } from "react-redux"
import { getTextByUrlAction } from "../../actions/textActions"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import ReactHtmlParser from "react-html-parser"
import { Link } from "react-router-dom"
import "./content-styles.css"

const InfoScreen = ({ match }) => {
  const dispatch = useDispatch()
  const textUrl = match.params.textUrl
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const textList = useSelector(state => state.textList)
  const { loading, error, text } = textList

  console.log("InfoScreen: match.params: ", match.params)
  console.log("InfoScreen: textUrl: ", textUrl)

  useEffect(() => {
    if (!text || text.url !== textUrl) {
      dispatch(getTextByUrlAction(textUrl))
    }
  }, [dispatch, textUrl, text])

  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {text && (
        <>
          <Meta title={`${text.title} | YarnStore`} />
          {userInfo && userInfo.isAdmin && (
            <div className="submenu">
              <Link to={`/admin/text/${text._id}/edit`} className="btn btn-success bg-blue my-3 px-5">
                <i className="fas fa-edit text-white"></i> Edit
              </Link>
            </div>
          )}
          <FormContainer className="pb-5">
            <h1>{text.title}</h1>
            <br />
            <div className="ck-content">{text.description && ReactHtmlParser(text.description)}</div>
          </FormContainer>
        </>
      )}
    </>
  )
}

export default InfoScreen
