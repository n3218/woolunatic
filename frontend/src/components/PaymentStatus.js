import React from "react"

const badges = {
  paid: "success",
  expired: "secondary",
  canceled: "danger",
  COMPLETED: "success"
}

const PaymentStatus = ({ paymentStatus }) => {
  return <div className={`badge badge-${badges[paymentStatus]} text-uppercase`}>{paymentStatus}</div>
}

export default PaymentStatus
