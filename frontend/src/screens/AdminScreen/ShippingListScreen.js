import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Button, Table } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Meta from "../../components/Meta"
import { getShippingListAction, shippingCreateAction, shippingDeleteAction } from "../../actions/shippingActions"

const ShippingListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const shippingList = useSelector(state => state.shippingList)
  const { loading, error, shippings, createsuccess, shipping, deletesuccess, message } = shippingList

  useEffect(() => {
    dispatch(getShippingListAction())
  }, [dispatch, deletesuccess])

  useEffect(() => {
    if (createsuccess && shipping) {
      history.push(`/admin/shipping/${shipping._id}/edit`)
    }
  }, [history, shipping, createsuccess])

  const shippingCreateHandler = () => {
    dispatch(shippingCreateAction())
  }

  const shippingDeleteHandler = id => {
    if (window.confirm("Are you sure?")) {
      dispatch(shippingDeleteAction(id))
    }
  }

  return (
    <>
      <Meta title="Admin | Shippings | YarnStore" />
      <h2>Shippings {shippings && shippings.length > 0 && ` - ${shippings.length}`}</h2>

      <div className="submenu">
        <Button className="btn btn-success bg-blue my-3 px-5" onClick={shippingCreateHandler}>
          <i className="fas fa-plus mr-1"></i> Create Shipping
        </Button>
      </div>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="success">{message}</Message>}
      {shippings && (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>COUNTRY</th>
                <th>LOCAL</th>
                <th>OPTIONS</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {shippings &&
                shippings.length > 0 &&
                shippings.map(shipping => (
                  <tr key={shipping._id}>
                    <td>
                      <Link to={`/admin/shipping/${shipping._id}/edit`}>{shipping.country}</Link>
                    </td>
                    <td>
                      <Link to={`/admin/shipping/${shipping._id}/edit`}>{shipping.local}</Link>
                    </td>
                    <td>
                      {shipping.options.map(opt => (
                        <div key={opt._id}>
                          <Link to={`/admin/shipping/${shipping._id}/edit`}>{`${(opt.minWeight / 1000).toFixed(0)} - ${(opt.maxWeight / 1000).toFixed(0)}kg - ${opt.operator} - €${opt.cost.toFixed(2)}`}</Link>
                        </div>
                      ))}
                    </td>
                    <td>
                      <div onClick={() => shippingDeleteHandler(shipping._id)} className="px-2 cursor-pointer">
                        <i className="fas fa-trash text-danger"></i>
                      </div>
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

export default ShippingListScreen
