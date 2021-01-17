import React, { useState, useEffect } from "react"
import { Card, Form, Button, ListGroup } from "react-bootstrap"
import "./Filter.css"
//
const Filter = ({ products, filteredProducts, setFilteredProducts }) => {
  const initialFilter = {
    category: [],
    brand: [],
    price: 0,
    priceMin: 0,
    priceMax: 0,
    length: 0,
    lengthMin: 0,
    lengthMax: 0,
    colorWay: []
  }
  const [initialFilterData, setInitialFilterData] = useState(initialFilter)
  const [filterState, setFilterState] = useState(initialFilter)
  const [initialProducts, setInitialProducts] = useState([])
  const [showFibers, setShowFibers] = useState(false)
  const [showBrands, setShowBrands] = useState(false)

  useEffect(() => {
    console.log("Filter:useEffect-1")

    // if (!initialProducts.length) {
    setInitialProducts([...products])
    // }
    const brandMap = {}
    const brandArr = []
    const categoryMap = { cashmere: 0, cashmix: 0, merino: 0, wool: 0, lambswool: 0, mohair: 0, camel: 0, alpaca: 0, yak: 0, angora: 0, cotton: 0, linen: 0, silk: 0, fantasy: 0, pailettes: 0 }
    const categoryArr = []
    const colorWayMap = { white: 0, natural: 0, beige: 0, yellow: 0, orange: 0, red: 0, pink: 0, purple: 0, blue: 0, green: 0, gray: 0, brown: 0, black: 0, multicolor: 0 }
    const colorWayArr = []
    let priceMinVar = 0
    let priceMaxVar = 0
    let lengthMinVar = 0
    let lengthMaxVar = 0

    products.map(product => {
      if (priceMinVar === 0) priceMinVar = Number(product.price)
      if (Number(product.price) < Number(priceMinVar)) priceMinVar = Number(product.price)
      if (product.price > priceMaxVar) priceMaxVar = product.price
      if (lengthMinVar === 0) lengthMinVar = Number(product.meterage)
      if (Number(product.meterage) < Number(lengthMinVar)) lengthMinVar = Number(product.meterage)
      if (product.meterage > lengthMaxVar) lengthMaxVar = product.meterage

      checkIfExists(colorWayMap, product.colorWay.trim().toLowerCase())
      checkIfExists(brandMap, product.brand.trim())
      return product.category.split(",").map(cat => {
        return checkIfExists(categoryMap, cat.trim().toLowerCase())
      })
    })

    Object.keys(categoryMap).map(key => categoryArr.push([key, categoryMap[key]]))
    Object.keys(colorWayMap).map(key => colorWayArr.push([key, colorWayMap[key]]))
    Object.keys(brandMap).map(key => brandArr.push([key, brandMap[key]]))
    let brandArrSorted = brandArr.sort((a, b) => (a[0] > b[0] ? 1 : -1))

    setInitialFilterData({
      category: [...categoryArr],
      brand: [...brandArrSorted],
      price: priceMaxVar,
      priceMin: priceMinVar,
      priceMax: priceMaxVar,
      length: lengthMaxVar,
      lengthMin: lengthMinVar,
      lengthMax: lengthMaxVar,
      colorWay: [...colorWayArr]
    })
    setFilterState({ ...filterState, price: priceMaxVar, length: lengthMaxVar })
  }, [products])

  useEffect(() => {
    console.log("Filter:useEffect-2")
    const multiPropsFilter = (productsToFilter, filters) => {
      const filterKeys = Object.keys(filters)
      return productsToFilter.filter(product => {
        return filterKeys.every(key => {
          if (!filters[key].length) return true
          if (key === "price") return product[key] <= filters[key]
          if (key === "length") return product.meterage <= filters[key]
          if (product[key].includes(",")) {
            return product[key].split(",").some(keyEle => filters[key].includes(keyEle))
          }
          return filters[key].includes(product[key])
        })
      })
    }
    let newProds = multiPropsFilter(initialProducts, filterState)
    setFilteredProducts(newProds)
  }, [filterState])

  const checkIfExists = (mapOfValues, value) => {
    if (mapOfValues[value]) {
      mapOfValues[value] = mapOfValues[value] + 1
    } else {
      mapOfValues[value] = 1
    }
  }

  const onChangeStateHandler = (e, field) => {
    setFilterState({ ...filterState, [field]: e.target.value })
  }

  const clearFilterHandler = () => {
    setFilterState({ ...initialFilter, price: initialFilterData.priceMax, length: initialFilterData.lengthMax })
    setFilteredProducts(initialProducts)
  }

  const handleToggle = (value, cat) => {
    const currentIndex = filterState[cat].indexOf(value)
    const copyFilterState = [...filterState[cat]]
    if (currentIndex === -1) {
      copyFilterState.push(value)
    } else {
      copyFilterState.splice(currentIndex, 1)
    }
    setFilterState({
      ...filterState,
      [cat]: [...copyFilterState]
    })
  }
  console.log("filterState: ", filterState)

  return (
    <>
      <div className="text-center">
        <h6>total {products.length} yarns</h6>
      </div>
      <Card className="filter">
        <Card.Header>
          <Button onClick={clearFilterHandler} variant="primary" block>
            <nobr>Clear filter</nobr>
          </Button>
          {/* <Card.Subtitle className="my-1 text-center">total ( {products.length} ) yarns</Card.Subtitle> */}
          <Card.Title as="h4" className="text-center">
            Filter Yarns
          </Card.Title>
        </Card.Header>

        <Form>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Form.Group controlId="formBasicRange">
                <Form.Label as="h6">Price, €/100g</Form.Label>
                <Form.Control min={initialFilterData.priceMin} max={initialFilterData.priceMax} step={0.5} type="range" onChange={e => onChangeStateHandler(e, "price")} value={filterState.price} />
                <div className="label-comment">
                  <div>€{initialFilterData.priceMin}</div>
                  <div>
                    {initialFilterData.priceMin} - {filterState.price}
                  </div>
                  <div>€{initialFilterData.priceMax}</div>
                </div>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId="formBasicRange">
                <Form.Label as="h6">Fiber Content</Form.Label>
                {initialFilterData.category &&
                  initialFilterData.category.map(
                    (fib, i) =>
                      fib[1] > 0 && (
                        <div key={fib[0]} className={i > 5 && !showFibers ? "display-none" : "display-block"}>
                          <Form.Check //
                            type="checkbox"
                            id={fib[0]}
                            label={
                              fib[0] === "cashmix" //
                                ? `cashmere mix (${fib[1]})`
                                : fib[0] === "camel"
                                ? `camel hair (${fib[1]})`
                                : `${fib[0]} (${fib[1]})`
                            }
                            onChange={() => handleToggle(fib[0], "category")}
                            checked={filterState.category.includes(fib[0])}
                          />
                        </div>
                      )
                  )}
                <div>
                  <small>
                    {!showFibers ? (
                      <Button variant="link" onClick={() => setShowFibers(true)}>
                        <small>Show more...</small>
                      </Button>
                    ) : (
                      <Button variant="link" onClick={() => setShowFibers(false)}>
                        <small>Show less...</small>
                      </Button>
                    )}
                  </small>
                </div>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId="formBasicRange">
                <Form.Label as="h6">Length, m/100g</Form.Label>
                <Form.Control min={initialFilterData.lengthMin} max={initialFilterData.lengthMax} step={10} type="range" onChange={e => onChangeStateHandler(e, "length")} value={filterState.length} />
                <div className="label-comment">
                  <div>{initialFilterData.lengthMin}m</div>
                  <div>
                    {initialFilterData.lengthMin} - {filterState.length}
                  </div>
                  <div>{initialFilterData.lengthMax}m</div>
                </div>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId="formBasicRange">
                <Form.Label as="h6">Color</Form.Label>
                <div className="color">
                  {initialFilterData.colorWay &&
                    initialFilterData.colorWay.map(
                      col =>
                        col[1] > 0 && (
                          <Form.Check //
                            key={col[0]}
                            className={col[0]}
                            type="checkbox"
                            id={col[0]}
                            title={`${col[0]} (${col[1]})`}
                            label={`${col[0]} (${col[1]})`}
                            disabled={col[1] === 0}
                            onChange={() => handleToggle(col[0], "colorWay")}
                            checked={filterState.colorWay.includes(col[0])}
                          />
                        )
                    )}
                </div>
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId="formBasicRange">
                <Form.Label as="h6">Brand</Form.Label>
                {initialFilterData.brand &&
                  initialFilterData.brand.map((brand, i) => (
                    <div key={brand[0]} className={i > 5 && !showBrands ? "display-none" : "display-block"}>
                      <Form.Check //
                        type="checkbox"
                        id={brand[0]}
                        label={`${brand[0]} (${brand[1]})`}
                        onChange={() => handleToggle(brand[0], "brand")}
                        checked={filterState.brand.includes(brand[0])}
                      />
                    </div>
                  ))}
                <div>
                  <small>
                    {!showBrands ? (
                      <Button variant="link" onClick={() => setShowBrands(true)}>
                        <small>Show more...</small>
                      </Button>
                    ) : (
                      <Button variant="link" onClick={() => setShowBrands(false)}>
                        <small>Show less...</small>
                      </Button>
                    )}
                  </small>
                </div>
              </Form.Group>
            </ListGroup.Item>
          </ListGroup>
        </Form>
      </Card>
    </>
  )
}

export default Filter
