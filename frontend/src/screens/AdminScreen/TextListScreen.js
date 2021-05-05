import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Meta from "../../components/Meta"
import { textListAction, textCreateAction, textDeleteAction } from "../../actions/textActions"

const TextListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const textList = useSelector(state => state.textList)
  const { loading, error, texts, text, createsuccess, deletesuccess } = textList

  useEffect(() => {
    dispatch(textListAction())
  }, [dispatch, deletesuccess])

  useEffect(() => {
    if (createsuccess && text) {
      history.push(`/admin/text/${text._id}/edit`)
    }
  }, [dispatch, history, createsuccess, text])

  const createTextHandler = () => {
    dispatch(textCreateAction())
  }

  const deleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(textDeleteAction(id))
    }
  }

  return (
    <>
      <Meta title="Admin | Text Pages | YarnStore" />
      <h2>Text Pages {texts && texts.length > 0 && ` - ${texts.length}`}</h2>

      <div className="submenu">
        <Button className="btn btn-success bg-blue my-3 px-5" onClick={createTextHandler}>
          <i className="fas fa-plus mr-1"></i> Create Text
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>URL</th>
                <th>SORT</th>
                <th>DESCRIPTION</th>
                <th>IMAGE</th>
                <th>LAST MODIFIED</th>
                <th>HIDE</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {texts &&
                texts.length > 0 &&
                texts.map(text => (
                  <tr key={text._id}>
                    <td>
                      <Link to={`/admin/text/${text._id}/edit`}>{text.title}</Link>
                    </td>
                    <td>
                      <Link to={`/admin/text/${text._id}/edit`}>{text.url}</Link>
                    </td>
                    <td>
                      <Link to={`/admin/text/${text._id}/edit`}>{text.sort}</Link>
                    </td>
                    <td>
                      <Link to={`/admin/text/${text._id}/edit`}>...</Link>
                    </td>
                    <td>
                      <Link to={`/admin/text/${text._id}/edit`}>{text.image}</Link>
                    </td>
                    <td>
                      <Link to={`/admin/text/${text._id}/edit`}>{text.createdAt.substring(0, 10)}</Link>
                    </td>
                    <td>{text.hide ? <i className="fas fa-check text-danger font-weight-bold"></i> : <i className="fas fa-times text-success"></i>}</td>
                    <td>
                      <Link to="#" onClick={() => deleteHandler(text._id)} className="px-2">
                        <i className="fas fa-trash text-danger"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default TextListScreen
