import React from "react"

const PaymentStatus = ({ paymentStatus }) => {
  return <div className="badge badge-success text-uppercase">{paymentStatus}</div>
}

export default PaymentStatus
