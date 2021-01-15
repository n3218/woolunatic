import React, { useState, useEffect, useMemo } from "react"
import { Card, Form, Button } from "react-bootstrap"
import "./Filter.css"
//
const Filter = ({ products, filteredProducts, setFilteredProducts }) => {
  const initialFilter = {
    category: [],
    brand: [],
    priceBy: 0,
    lengthBy: 0,
    color: []
  }
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [lengthMin, setLengthMin] = useState(0)
  const [lengthMax, setLengthMax] = useState(0)
  const [filterState, setFilterState] = useState(initialFilter)
  const [initialProducts, setInitialProducts] = useState([])
  const [category, setCategory] = useState("")
  const [color, setColor] = useState("")
  const [brand, setBrand] = useState("")
  const [frozen, setFrozen] = useState("")

  useEffect(() => {
    if (initialProducts.length === 0) {
      setInitialProducts([...filteredProducts])
    }

    const brandMap = {}
    const brandArr = []
    const categoryMap = {}
    const categoryArr = []
    const colorMap = { white: 0, natural: 0, beige: 0, yellow: 0, orange: 0, red: 0, pink: 0, purple: 0, blue: 0, green: 0, gray: 0, brown: 0, black: 0, multicolor: 0 }
    const colorArr = []
    let priceMinVar = 0
    let priceMaxVar = 0
    let lengthMinVar = 0
    let lengthMaxVar = 0

    filteredProducts.map(product => {
      if (priceMinVar === 0) priceMinVar = Number(product.price)
      if (Number(product.price) < Number(priceMinVar)) priceMinVar = Number(product.price)
      if (product.price > priceMaxVar) priceMaxVar = product.price

      if (lengthMinVar === 0) lengthMinVar = Number(product.meterage)
      if (Number(product.meterage) < Number(lengthMinVar)) lengthMinVar = Number(product.meterage)
      if (product.meterage > lengthMaxVar) lengthMaxVar = product.meterage

      checkIfExists(colorMap, product.colorWay.trim().toLowerCase())
      checkIfExists(brandMap, product.brand.trim())
      product.category.split(",").map(cat => {
        checkIfExists(categoryMap, cat.trim().toLowerCase())
      })
    })

    setPriceMin(priceMinVar)
    setPriceMax(priceMaxVar)
    setLengthMin(lengthMinVar)
    setLengthMax(lengthMaxVar)

    Object.keys(brandMap).map(key => brandArr.push([key, brandMap[key]]))
    let brandArrSorted = brandArr.sort((a, b) => (a[0] > b[0] ? 1 : -1))

    Object.keys(categoryMap).map(key => categoryArr.push([key, categoryMap[key]]))
    let categoryArrSorted = categoryArr.sort((a, b) => (a[0] > b[0] ? 1 : -1))

    Object.keys(colorMap).map(key => colorArr.push([key, colorMap[key]]))

    console.log("colorArr:", colorArr)
    setCategory(categoryArrSorted)
    setColor(colorArr)
    setBrand(brandArrSorted)

    setFilterState({ ...filterState, priceBy: priceMaxVar, lengthBy: lengthMaxVar })
  }, [filteredProducts])

  const checkIfExists = (mapOfValues, value) => {
    if (mapOfValues[value]) {
      mapOfValues[value] = mapOfValues[value] + 1
    } else if (value === "") {
      if (mapOfValues["others"]) {
        mapOfValues["others"] = mapOfValues["others"] + 1
      } else {
        mapOfValues["others"] = 1
      }
    } else {
      mapOfValues[value] = 1
    }
  }

  // useEffect(() => {}, [filterState])

  const onChangePriceHandler = e => {
    setFilterState({ ...filterState, priceBy: e.target.value })
    // setFilteredProducts(filteredProducts.filter(prod => prod.price <= e.target.value))
  }

  const onChangeLengthHandler = e => {
    setFilterState({ ...filterState, lengthBy: e.target.value })
    // setFilteredProducts(filteredProducts.filter(prod => prod.price <= e.target.value))
  }

  const clearFilterHandler = () => {
    setFilterState({ ...initialFilter })
    setFilteredProducts([...initialProducts])
  }

  const handleToggle = (value, cat) => {
    setFrozen(cat)
    const currentIndex = filterState[cat].indexOf(value)
    const copyFilterState = [...filterState[cat]]
    if (currentIndex === -1) {
      copyFilterState.push(value)
    } else {
      copyFilterState.splice(currentIndex, 1)
    }
    let newFilterState = { ...filterState, [cat]: copyFilterState }
    setFilterState(newFilterState)

    let copyFilteredProducts = filteredProducts.filter(prod => {
      if (cat === "category") {
        return newFilterState[cat].some(el => prod[cat].includes(el))
      } else {
        return newFilterState[cat].includes(prod[cat])
      }
    })
    console.log("copyFilteredProducts: ", copyFilteredProducts)
    setFilteredProducts(copyFilteredProducts)
  }

  console.log("Filter: filter: ", filterState)
  // console.log("Filter: filteredProducts: ", filteredProducts)
  console.log("color: ", color)
  return (
    <>
      <Card className="filter px-3">
        <Card.Body>
          <Button onClick={clearFilterHandler} variant="primary" className="my-3 px-5">
            Clear filter
          </Button>

          <Card.Subtitle className="my-1">total ( {products.length} ) yarns</Card.Subtitle>
          <Card.Title as="h4">Filter Yarns by</Card.Title>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Price, €/100g</Form.Label>
              <Form.Control min={priceMin} max={priceMax} step={0.5} type="range" onChange={onChangePriceHandler} value={filterState.priceBy} />
              <div className="label-comment">
                <div>€{priceMin}</div>
                <div>
                  {priceMin} - {filterState.priceBy}
                </div>
                <div>€{priceMax}</div>
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Fiber Content</Form.Label>
              {category &&
                category.map(fib => (
                  <div key={fib[0]}>
                    <Form.Check //
                      type="checkbox"
                      id={fib[0]}
                      label={`${fib[0]} (${fib[1]})`}
                      onChange={() => handleToggle(fib[0], "category")}
                      checked={filterState.category.includes(fib[0])}
                    />
                  </div>
                ))}
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Length, m/100g</Form.Label>
              <Form.Control min={lengthMin} max={lengthMax} step={10} type="range" onChange={onChangeLengthHandler} value={filterState.lengthBy} />
              <div className="label-comment">
                <div>{lengthMin}m</div>
                <div>
                  {lengthMin} - {filterState.lengthBy}
                </div>
                <div>{lengthMax}m</div>
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Color</Form.Label>
              <div className="color">
                {color &&
                  color.map(col => (
                    <Form.Check //
                      key={col[0]}
                      className={col[0]}
                      type="checkbox"
                      id={col[0]}
                      title={`${col[0]} (${col[1]})`}
                      label={`${col[0]} (${col[1]})`}
                      disabled={col[1] === 0}
                      onChange={() => handleToggle(col[0], "color")}
                      checked={filterState.color.includes(col[0])}
                    />
                  ))}
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Brand</Form.Label>
              {brand &&
                brand.map(brand => (
                  <div key={brand[0]}>
                    <Form.Check //
                      type="checkbox"
                      id={brand[0]}
                      label={`${brand[0]} (${brand[1]})`}
                      onChange={() => handleToggle(brand[0], "brand")}
                      checked={filterState.brand.includes(brand[0])}
                    />
                  </div>
                ))}
            </Form.Group>
          </Form>

          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
      </Card>
    </>
  )
}

export default Filter
