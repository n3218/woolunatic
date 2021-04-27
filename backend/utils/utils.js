// @desc
export const checkQtyInMinMax = (qty, product) => {
  let arrayInStock =
    product.arrayInStock ||
    product.inStock
      .split(",")
      .map(el => Number(el.trim()))
      .sort((a, b) => a - b)
  let largestCone = arrayInStock[arrayInStock.length - 1]
  console.log("largestCone: ", largestCone)
  let minLeftover = product.minimum //---- If Minimum
  // let minLeftover = Math.ceil(((1500 / product.meterage) * 100) / 100) * 100 //---- If Minimum
  let maxVal = largestCone - minLeftover
  console.log("maxVal: ", maxVal)
  console.log("IF QTY BETWEEN MIN and MAX: ", `${product.minimum} <= ${qty} <= ${maxVal}`)
  if (qty >= product.minimum && qty <= maxVal) {
    return true
  } else {
    return false
  }
}

export const checkQtyInHolds = (qty, product, user) => {
  console.log("qty: ", qty)
  console.log("product._id: ", product._id)
  console.log("user: ", user)
  let check = product.onHold.filter(hold => String(hold.user) === String(user) && Number(hold.qty) === Number(qty))
  console.log("check: ", check)
  if (check) {
    return true
  } else {
    return false
  }
}

export const fillProductWithTotalInStockAndArrayInStock = product => {
  product.totalInStock = product.inStock.split(",").reduce((acc, el) => Number(acc) + Number(el.trim()), 0) // to Product add totalInStock field
  product.arrayInStock = product.inStock
    .split(",")
    .map(el => Number(el.trim()))
    .sort((a, b) => a - b) // to Product add arrayInStock field
  // console.log("fillProductWithTotalInStockAndArrayInStock: product.totalInStock: ", product.totalInStock)
  // console.log("fillProductWithTotalInStockAndArrayInStock: product.arrayInStock: ", product.arrayInStock)
  return product
}

export const checkIfHoldBelongsCurrentUser = (cart, user, product, qty) => {
  let totalInStock = product.inStock.split(",").reduce((acc, el) => acc + Number(el.trim()))
  console.log("totalInStock: ", totalInStock)
}
