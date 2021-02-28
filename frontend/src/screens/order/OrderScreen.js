import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Button, Table } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { getOrderDetailsAction, deliverOrderAction } from "../../actions/orderActions"
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../constants/orderConstants"
import Meta from "../../components/Meta"
import OrderSummary from "../../components/OrderSummary"
import OrderWeightsSummary from "../../components/OrderWeightsSummary"
import ShippingSection from "../../components/ShippingSection"
import PaymentSection from "../../components/PaymentSection/PaymentSection"

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id
  const dispatch = useDispatch()
  const checkoutStep = "order"

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector(state => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector(state => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo) {
      history.pushState("/login")
    }
    if (!order || order._id !== orderId || successDeliver || successPay) {
      dispatch(getOrderDetailsAction(orderId))
    }
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET })
    }
    if (successPay) {
      dispatch({ type: ORDER_PAY_RESET })
    }
  }, [dispatch, order, orderId, successDeliver, successPay, history, userInfo])

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
        <Col md={9} xs={12}>
          <ListGroup variant="flush">
            <ShippingSection cart={order} history={history} checkoutStep={checkoutStep} userInfo={userInfo} />
            <PaymentSection order={order} history={history} checkoutStep={checkoutStep} userInfo={userInfo} />

            <ListGroup.Item>
              <h4>ORDER ITEMS</h4>
            </ListGroup.Item>
          </ListGroup>
          {order.orderItems.length === 0 ? (
            <Message>Order is empty.</Message>
          ) : (
            <>
              <Table bordered hover responsive className="table-sm order-summary-table mb-0">
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
                        <Link target="_blank" rel="noreferrer" to={`/products/${item.product}`} className="text-capitalize">
                          {item.name}
                        </Link>
                      </td>
                      <td className="text-capitalize">{item.color.replace(/_+/g, " ")}</td>
                      <td>{item.fibers}</td>
                      <td>{item.qty}</td>
                      <td>{item.meterage}</td>
                      <td>€{item.price.toFixed(2)}</td>
                      <td>€{((item.qty * item.price) / 100).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <OrderWeightsSummary order={order} />
            </>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="jumbotron text-right">
              <h5>Test user for PayPal payments : sb-k30x54012881@personal.example.com</h5>
              <h5>Test password for PayPal payments : {`RHU*Oy6{`}</h5>
            </div>
          )}
        </Col>
        <Col>
          <OrderSummary cart={order} items={order.orderItems} error={error}>
            {!order.isPaid && order.paymentMethod && (
              <ListGroup.Item>
                <Button className="btn-success btn-block" onClick={() => history.push(`/checkout/payorder/${order._id}`)}>
                  Pay Order
                </Button>
              </ListGroup.Item>
            )}

            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button type="button" className="btn-success btn-block bg-blue" onClick={deliverHandler}>
                  Mark as shipped
                </Button>
              </ListGroup.Item>
            )}
          </OrderSummary>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
