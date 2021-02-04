import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Button, Table } from "react-bootstrap"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { getOrderDetailsAction, deliverOrderAction } from "../actions/orderActions"
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants"
import Meta from "../components/Meta"
import OrderSummary from "../components/OrderSummary"
import Payment from "../components/Payment/Payment"

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails
  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay
  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    // Calculate prices
    const addDecimals = num => (Math.round(num * 100) / 100).toFixed(2)
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + (item.price * item.qty) / 100, 0))
  }

  useEffect(() => {
    if (!userInfo) {
      history.pushState("/login")
    }
    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetailsAction(orderId))
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo])

  const deliverHandler = () => {
    dispatch(deliverOrderAction(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Meta title={`Order #${order._id} | Woolunatics`} />
      <h2>Order #{order._id}</h2>
      <Row>
        <Col md={9}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col lg={4} md={4} sm={5}>
                  <h4>
                    <nobr>SHIPPING ADDRESS</nobr>
                  </h4>
                </Col>
                <Col>
                  <div>
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </div>
                  <div>{order.user.name}</div>
                  <div>{order.shippingAddress.address}</div>
                  <div className="mb-3">
                    {order.shippingAddress.city}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                  </div>
                  {order.isDelivered ? <Message variant="success">Shipped on {order.deliveredAt.substring(0, 10)}</Message> : <Message variant="warning">Not shipped</Message>}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col lg={4} md={4} sm={5}>
                  <h4>{!order.isPaid && "SELECT "}PAYMENT METHOD</h4>
                </Col>
                <Col>
                  <Payment order={order} userInfo={userInfo} />
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>ORDER ITEMS</h4>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty.</Message>
              ) : (
                <>
                  <Table bordered hover responsive className="table-sm order-summary-table">
                    <thead>
                      <tr>
                        <th>brand</th>
                        <th>name</th>
                        <th>color</th>
                        <th>fibers,%</th>
                        <th>weight,g</th>
                        <th>m/100gr</th>
                        <th>€/100gr</th>
                        <th>price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, i) => (
                        <tr key={i}>
                          <td>{item.brand}</td>
                          <td>
                            <Link target="_blank" to={`/products/${item.product}`} className="text-capitalize">
                              {item.name}
                            </Link>
                          </td>
                          <td className="text-capitalize">{item.color.replace(/_+/g, " ")}</td>
                          <td>{item.fibers}</td>
                          <td>{item.qty}</td>
                          <td>{item.meterage}</td>
                          <td>€{item.price}</td>
                          <td>€{(item.qty * item.price) / 100}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
            </ListGroup.Item>
          </ListGroup>
          <div className="jumbotron text-right">
            <h5>Test user for PayPal payments : sb-k30x54012881@personal.example.com</h5>
            <h5>Test password for PayPal payments : {`RHU*Oy6{`}</h5>
          </div>
        </Col>

        <OrderSummary cart={order} items={order.orderItems} error={error}>
          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <Button type="button" className="btn-success btn-block " onClick={deliverHandler}>
              Mark as shipped
            </Button>
          )}
        </OrderSummary>
      </Row>
    </>
  )
}

export default OrderScreen
