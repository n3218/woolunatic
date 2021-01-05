import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Button, Table } from "react-bootstrap"
import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { getOrderDetailsAction, payOrderAction, deliverOrderAction } from "../actions/orderActions"
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstants"
import Meta from "../components/Meta"
import OrderSummary from "../components/OrderSummary"

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const [sdkReady, setSdkReady] = useState(false)
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
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetailsAction(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo])

  const successPaymentHandler = paymentResult => {
    dispatch(payOrderAction(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrderAction(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message>{error}</Message>
  ) : (
    <>
      <Meta title={`Order #${order._id} | Woolunatics`} />
      <h2>Order #{order._id}</h2>
      <Row>
        <Col md={9}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col lg={4} md={5} sm={6}>
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
                  {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt.substring(0, 10)}</Message> : <Message variant="warning">Not Delivered</Message>}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col lg={4} md={5} sm={6}>
                  <h4>
                    <nobr>PAYMENT METHOD</nobr>
                  </h4>
                </Col>
                <Col>
                  {order.isPaid && (
                    <>
                      <div>{order.paymentMethod}</div>
                      <div>ID: {order.paymentResult.id}</div>
                      <div>Status: {order.paymentResult.status}</div>
                      <div>email: {order.paymentResult.email_address}</div>{" "}
                    </>
                  )}
                  {order.isPaid ? <Message variant="success">Paid on {order.paidAt.substring(0, 10)}</Message> : <Message variant="warning">Not Paid</Message>}
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
                            <Link target="_blank" to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </td>
                          <td>{item.color.replace(/_+/g, " ")}</td>
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
        </Col>

        <OrderSummary cart={order} items={order.orderItems} error={error}>
          {!order.isPaid && (
            <>
              {loadingPay && <Loader />}
              {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
            </>
          )}

          {loadingDeliver && <Loader />}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <Button type="button" className="btn btn-block" onClick={deliverHandler}>
              Mark as delivered
            </Button>
          )}
        </OrderSummary>
      </Row>
    </>
  )
}

export default OrderScreen
