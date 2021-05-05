import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import Meta from "../../components/Meta"
import { listOrdersAction } from "../../actions/orderActions"
import Paginate from "../../components/Paginate"
import { PaymentStatus } from "../../components/Utils"

const OrderListScreen = ({ match }) => {
  const dispatch = useDispatch()
  const pageNumber = match.params.pageNumber || 1
  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders, page, pages, count = 0 } = orderList

  useEffect(() => {
    dispatch(listOrdersAction(pageNumber))
  }, [dispatch, pageNumber])

  return (
    <>
      <Meta title="Admin | Orders | YarnStore" />
      <h2>Orders - {count}</h2>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Paginate isAdmin={true} list="orderlist" pages={pages} page={page} />
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>CREDIT</th>
                <th>PAYMENT</th>
                <th>STATUS</th>
                <th>PAID</th>
                <th>SHIPPED</th>
                <th>USER</th>
                <th>ADDRESS</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map(order => (
                  <tr key={order._id} className={`product-list-item ${order.cancellation && order.cancellation.cancelled && " text-desabled "}`}>
                    <td>
                      <Link to={`/orders/${order._id}`}>#{order.orderId}</Link>
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>{order.createdAt.substring(0, 10)}</Link>
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>€{order.totalPrice}</Link>
                    </td>
                    <td>
                      <Link to={`/orders/${order._id}`}>€{order.storecredit}</Link>
                    </td>
                    <td className="text-capitalize">
                      <Link to={`/orders/${order._id}`}>{order.paymentMethod && order.paymentMethod}</Link>
                    </td>
                    <td>{order.paymentResult && order.paymentResult.status && <PaymentStatus paymentStatus={order.paymentResult.status} />}</td>
                    <td>{order.isPaid ? <span className="text-success">{order.paidAt.substring(0, 10)}</span> : <i className="fas fa-times text-danger"></i>}</td>
                    <td>{order.isDelivered ? <span className="text-success">{order.deliveredAt.substring(0, 10)}</span> : <i className="fas fa-times text-danger"></i>}</td>

                    <td>
                      <Link to={`/admin/user/${order.user && order.user._id}/edit`}>{order.user && order.user.name}</Link>
                    </td>
                    <td>
                      {order.shippingPrice === 0 ? (
                        <PaymentStatus paymentStatus={order.shippingAddress.shippingOption.operator} />
                      ) : (
                        <span>
                          <Link to={`/orders/${order._id}`}>
                            {order.shippingAddress.city}, {order.shippingAddress.country}
                          </Link>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate isAdmin={true} list="orderlist" pages={pages} page={page} />
        </>
      )}
    </>
  )
}

export default OrderListScreen
