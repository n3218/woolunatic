import React, { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
// import ReactQuill from "react-quill"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { FormFieldAsRow, FormFieldAsRowCheckbox } from "../../components/FormField"
import { getTextAction, textUpdateAction } from "../../actions/textActions"
import Meta from "../../components/Meta"
// import ImageUpload from "../../components/ImageUpload"
// import "react-quill/dist/quill.snow.css"

import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

const TextEditScreen = ({ history, match }) => {
  const dispatch = useDispatch()
  const textId = match.params.id
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [image, setImage] = useState([])
  const [description, setDescription] = useState("")
  const [sort, setSort] = useState(0)
  const [hide, setHide] = useState(false)
  const textList = useSelector(state => state.textList)
  const { loading, error, text, updatesuccess } = textList

  useEffect(() => {
    if (updatesuccess) {
      history.push(`/admin/textlist`)
    }
  }, [history, updatesuccess])

  useEffect(() => {
    dispatch(getTextAction(textId))
  }, [dispatch, textId])

  useEffect(() => {
    if (text) {
      setTitle(text.title)
      setUrl(text.url)
      setDescription(text.description)
      setImage(text.image)
      setSort(text.sort)
      setHide(text.hide)
    }
  }, [text])

  const submitHandler = e => {
    e.preventDefault()
    collectDataAndDispatch()
  }

  const previewHandler = () => {
    collectDataAndDispatch()
    history.push(`/info/${url}`)
  }

  const collectDataAndDispatch = () => {
    const newText = {
      _id: textId,
      title,
      url,
      description,
      image,
      sort,
      hide
    }
    dispatch(textUpdateAction(newText))
  }

  return (
    <>
      <Meta title="Admin | Edit Text Page | Woolunatics" />

      <div className="submenu">
        <div onClick={previewHandler} className="btn btn-success bg-blue my-3 px-5">
          <i className="fas fa-eye text-white"></i> Preview
        </div>
      </div>

      <Row>
        <Col>
          <h2>Edit Text Page</h2>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {text && (
            <Form onSubmit={submitHandler} id="TextEditForm">
              <FormFieldAsRow value={title} label="Title" onChange={setTitle} />
              <FormFieldAsRow value={url} label="URL" onChange={setUrl} />

              {/* <ImageUpload image={image} setImage={setImage} uploading={uploading} setUploading={setUploading} /> */}

              <Form.Group controlId="Description">
                <Row>
                  <Col sm="2">
                    <Form.Label>Description:</Form.Label>
                  </Col>
                  <Col className="mt-1">
                    <CKEditor
                      editor={ClassicEditor}
                      data={description}
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor)
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setDescription(data)
                        console.log({ event, editor, data })
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor)
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor)
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <FormFieldAsRow value={sort} label="Sort" onChange={setSort} />
              <FormFieldAsRowCheckbox value={hide} label="Hide" onChange={setHide} />
              <Row>
                <Col sm="2"></Col>
                <Col>
                  <Button type="submit" className="btn-success my-3 px-5">
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
    </>
  )
}

export default TextEditScreen
