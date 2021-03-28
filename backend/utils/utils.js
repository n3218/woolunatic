export const checkQtyInMinMax = (itQty, productMeterage, productMinimum, largestCone) => {
  let minLeftover = Math.ceil(((1500 / productMeterage) * 100) / 100) * 100 //---- If Minimum
  let maxVal = largestCone - minLeftover
  console.log("IF QTY BETWEEN MIN and MAX: ", `${itQty} >= ${productMinimum} && ${itQty} <= ${maxVal}`)
  if (itQty >= productMinimum && itQty <= maxVal) {
    return true
  } else {
    return false
  }
}

export const checkQtyInHolds = (qty, product, user) => {
  console.log("qty: ", qty)
  console.log("product: ", product)
  console.log("user: ", user)
  let check = product.onHold.filter(hold => String(hold.user) === String(user) && Number(hold.qty) === Number(qty))
  console.log("check: ", check)
  if (check) {
    return true
  } else {
    return false
  }
}
