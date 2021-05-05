import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Button, Table, Form, Image, Card } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import Meta from "../../components/Meta"
import { getOrderDetailsAction, deliverOrderAction, cancelOrderAction } from "../../actions/orderActions"
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../constants/orderConstants"
import OrderSummary from "../../components/OrderSummary"
import OrderWeightsSummary from "../../components/OrderWeightsSummary"
import ShippingSection from "../../components/ShippingSection"
import PaymentSection from "../../components/PaymentSection/PaymentSection"
import { minithumbPath } from "../../constants/commonConstans"

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
  const method = useSelector(state => state.paymentMethod)

  const [paymentMethod, setPaymentMethod] = useState(method || "")
  const [shippingCode, setShippingCode] = useState("")
  const [shippingLink, setShippingLink] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (!userInfo) {
      history.push("/login")
    }
  }, [history, userInfo])

  useEffect(() => {
    if (!order || order._id !== orderId || successDeliver || successPay) {
      dispatch(getOrderDetailsAction(orderId))
    }
    if (successDeliver) dispatch({ type: ORDER_DELIVER_RESET })
    if (successPay) dispatch({ type: ORDER_PAY_RESET })
  }, [dispatch, order, orderId, successDeliver, successPay])

  const deliverHandler = e => {
    e.preventDefault()
    dispatch(deliverOrderAction(order, shippingCode, shippingLink))
  }
  const cancelHandler = e => {
    e.preventDefault()
    dispatch(cancelOrderAction(order._id, notes))
  }

  return loading || loadingPay ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Meta title={`Order #${order.orderId} | YarnStore`} />
      <h2>Order #{order.orderId}</h2>
      <Row>
        <Col md={8} xs={12}>
          <ListGroup variant="flush">
            <ShippingSection order={order} history={history} checkoutStep={checkoutStep} userInfo={userInfo} />
            <PaymentSection order={order} history={history} checkoutStep={checkoutStep} userInfo={userInfo} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            <ListGroup.Item className="py-3">
              <h4>ORDER ITEMS</h4>
            </ListGroup.Item>
          </ListGroup>
          {order && order.orderItems && order.orderItems.length === 0 ? (
            <Message>Order is empty.</Message>
          ) : (
            <>
              <Table bordered hover responsive className="table-sm order-summary-table mb-0">
                <thead>
                  <tr>
                    <th></th>
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
                  {order &&
                    order.orderItems &&
                    order.orderItems.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <Image src={minithumbPath + item.image} alt={item.name} fluid thumbnail width={40} />
                        </td>
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
        </Col>
        <Col className="px-0 mx-0">
          <OrderSummary cart={order} items={order.orderItems} error={error}>
            {!order.isPaid && paymentMethod && (
              <ListGroup.Item>
                <Button className="btn-success btn-block my-3" onClick={() => history.push(`/checkout/payorder/${order._id}/${paymentMethod}`)}>
                  Pay Order
                </Button>
              </ListGroup.Item>
            )}
          </OrderSummary>

          {order && order.cancellation && order.cancellation.cancelled ? (
            <Card border="light" className="mx-1 my-3 alert-danger">
              <Card.Header className="pb-0 card-header text-center">
                <h3>ORDER CANCELLED</h3>
              </Card.Header>
              <Card.Body className="alert-danger">
                <div className="text-center my-3">on {new Date(order.cancellation.cancelledAt).toLocaleString()}</div>
                {order.cancellation.notes && (
                  <div className="my-3 mx-5">
                    <span className="h6">Notes:</span> {order.cancellation.notes}
                  </div>
                )}
                <div className="p-3">
                  <Button className="btn-success btn-block" onClick={() => history.push(`/admin/user/${order.user && order.user._id}/edit`)}>
                    Edit User Delails
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <>
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <Card border="light" className="mx-1 my-3">
                  <Card.Header className="pb-0 card-header text-center">
                    <h3>Ship it</h3>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Form onSubmit={deliverHandler}>
                        <Form.Group controlId="shippingCode">
                          <Form.Label>Shipping Code</Form.Label>
                          <Form.Control type="text" placeholder="Enter Code" value={shippingCode} autoComplete={shippingCode} onChange={e => setShippingCode(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="shippinhLink">
                          <Form.Label>Shipping Link</Form.Label>
                          <Form.Control type="text" placeholder="Enter Link" value={shippingLink} autoComplete={shippingLink} onChange={e => setShippingLink(e.target.value)}></Form.Control>
                        </Form.Group>
                        <Button type="sybmit" className="btn-success btn-block bg-blue my-3">
                          Mark as shipped
                        </Button>
                      </Form>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              )}

              {userInfo && userInfo.isAdmin && (
                <Card border="light" className="mx-1 my-3">
                  <Card.Header className="pb-0 card-header text-center">
                    <h3>Cancel It</h3>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Form onSubmit={cancelHandler}>
                        <Form.Group controlId="notes">
                          <Form.Label>Notes</Form.Label>
                          <Form.Control //
                            as="textarea"
                            rows={3}
                            placeholder="Notes"
                            value={notes}
                            autoComplete={notes}
                            onChange={e => setNotes(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="sybmit" className="btn-success btn-block bg-blue my-3">
                          Cancel Order
                        </Button>
                      </Form>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              )}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
