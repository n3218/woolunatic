import React from "react"

export const OptionsForCompressingImages = {
  maxWidthOrHeight: 1024,
  maxSizeMB: 0.5,
  useWebWorker: true
}

export const PaymentStatus = ({ paymentStatus }) => {
  const badges = {
    paid: "success",
    expired: "secondary",
    canceled: "danger",
    COMPLETED: "success",
    PICKUP: "success"
  }
  return <div className={`badge badge-${badges[paymentStatus]} text-uppercase`}>{paymentStatus}</div>
}

export const TranslateToWeight = val => {
  const weightValues = {
    1000: "Cobweb",
    800: "Lace",
    600: "Havy Lace",
    500: "Light Fingering",
    400: "Fingering",
    300: "Sport",
    200: "DK",
    150: "Aran",
    100: "Chunky",
    50: "Super Chunky"
  }

  if (val >= 1000) return weightValues[1000]
  if (val >= 800 && val < 1000) return weightValues[800]
  if (val >= 600 && val < 800) return weightValues[600]
  if (val >= 500 && val < 600) return weightValues[500]
  if (val >= 400 && val < 500) return weightValues[400]
  if (val >= 300 && val < 400) return weightValues[300]
  if (val >= 200 && val < 300) return weightValues[200]
  if (val >= 150 && val < 200) return weightValues[150]
  if (val >= 100 && val < 150) return weightValues[100]
  if (val >= 50 && val < 100) return weightValues[50]
}

export const calculateWeight = items => {
  const itemsWeight = items.reduce((acc, item) => acc + item.qty, 0)
  let totalWeight =
    itemsWeight < 2000 //
      ? itemsWeight + 350 + items.length * 45
      : itemsWeight < 5000
      ? itemsWeight + 450 + items.length * 45
      : itemsWeight < 10000
      ? itemsWeight + 600 + items.length * 45
      : itemsWeight < 20000 && itemsWeight + 1200 + items.length * 45
  return { itemsWeight, totalWeight }
}

export const OrderDetailsRow = ({ name, children, className }) => {
  return (
    <div>
      <span className={`mr-2 h6 mb-0 ${className}`}>{name}: </span>
      <span className="p-0 m-0"> {children}</span>
    </div>
  )
}

export const showLink = links => {
  const arr = JSON.parse(links)
  console.log("arr: ", arr)
  return Object.keys(arr).map(key => (
    <div className="ml-5 p-0" key={key}>
      <a href={arr[key].href} target="_blank" rel="noreferrer">
        {key}...
      </a>
    </div>
  ))
}
