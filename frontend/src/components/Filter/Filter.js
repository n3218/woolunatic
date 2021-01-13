import React, { useState, useEffect, useMemo } from "react"
import { Card, Form, Button } from "react-bootstrap"
import "./Filter.css"

const Filter = ({ products, filteredProducts, setFilteredProducts, handleFilters }) => {
  console.log("Filter: products.length", products.length)
  const data = useMemo(() => products, [products])

  const initialFilter = {
    fibers: [],
    brands: [],
    priceBy: 0,
    lengthBy: 0,
    colors: []
  }

  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(0)
  const [lengthMin, setLengthMin] = useState(0)
  const [lengthMax, setLengthMax] = useState(0)
  const [brands, setBrands] = useState([])
  const [fibers, setFibers] = useState([])
  const [colors, setColors] = useState({})
  const [filterState, setFilterState] = useState(initialFilter)

  // useEffect(() => {
  //   if (filteredProducts.length === 0) setFilteredProducts([...data])
  // }, [data])

  useEffect(() => {
    const brandsMap = []
    const brandsArr = []
    const fibersMap = []
    const fibersArr = []
    const colorsMap = { white: 0, natural: 0, beige: 0, yellow: 0, orange: 0, red: 0, pink: 0, purple: 0, blue: 0, green: 0, gray: 0, brown: 0, black: 0, colormix: 0 }

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

      // brands
      if (brandsMap[product.brand]) {
        brandsMap[product.brand] = brandsMap[product.brand] + 1
      } else if (product.brand === "") {
        if (brandsMap["others"]) {
          brandsMap["others"] = brandsMap["others"] + 1
        } else {
          brandsMap["others"] = 1
        }
      } else {
        brandsMap[product.brand] = 1
      }

      // fibers
      product.fibers
        .replace(/[0-9%,+]/g, "")
        .trim()
        .split(" ")
        .map(fib => {
          if (fibersMap[fib]) {
            fibersMap[fib] = fibersMap[fib] + 1
          } else {
            fibersMap[fib] = 1
          }
        })

      // colors
      let colorVar = product.colorWay.trim().toLowerCase()
      if (colorsMap[colorVar]) {
        colorsMap[colorVar] = colorsMap[colorVar] + 1
      } else if (colorVar === "") {
        if (colorsMap["others"]) {
          colorsMap["others"] = colorsMap["others"] + 1
        } else {
          colorsMap["others"] = 1
        }
      } else {
        colorsMap[colorVar] = 1
      }
    })

    setPriceMin(priceMinVar)
    setPriceMax(priceMaxVar)
    setLengthMin(lengthMinVar)
    setLengthMax(lengthMaxVar)

    Object.keys(brandsMap).map(key => brandsArr.push([key, brandsMap[key]]))
    let brandsMapSorted = brandsArr.sort((a, b) => (a[0] > b[0] ? 1 : -1))
    setBrands(brandsMapSorted)

    Object.keys(fibersMap).map(key => fibersArr.push([key, fibersMap[key]]))
    let fibersMapSorted = fibersArr.sort((a, b) => (a[0] > b[0] ? 1 : -1))
    setFibers(fibersMapSorted)

    setColors(colorsMap)
    setFilterState({ ...filterState, priceBy: priceMaxVar })
  }, [filteredProducts, data, products])

  // onChangeBrandsHandler
  const onChangeBrandsHandler = e => {
    if (filterState.brands.includes(e.target.id)) {
      console.log("filter.brands.includes: ", e.target.id)
      setFilterState({ ...filterState, brands: [...filterState.brands.filter(brand => brand !== e.target.id)] })
    } else {
      console.log("filter.brands.includes.else: ", e.target.id)
      setFilterState({ ...filterState, brands: [...filterState.brands, e.target.id] })
    }
    setFilteredProducts(
      filteredProducts.filter(prod => {
        if (filterState.brands.includes(prod.brand)) return true
      })
    )
  }

  const onChangePriceHandler = e => {
    setFilterState({ ...filterState, priceBy: e.target.value })
    setFilteredProducts(filteredProducts.filter(prod => prod.price <= e.target.value))
  }

  const clearFilterHandler = () => {
    setFilterState(initialFilter)
    setFilteredProducts(products)
  }

  console.log("filter: filter: ", filterState)
  console.log("filter: filteredProducts: ", filteredProducts)

  const onChangeFibersHandler = e => {
    if (filterState.fibers.includes(e.target.id)) {
      setFilterState({ ...filterState, fibers: [...filterState.fibers.filter(fab => fab !== e.target.id)] })
    } else {
      setFilterState({ ...filterState, fibers: [...filterState.fibers, e.target.id] })
    }
    setFilteredProducts(filteredProducts.filter(prod => prod.fibers.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleToggle = (value, cat) => {
    const currentIndex = filterState[cat].indexOf(value)
    const copy = [...filterState[cat]]
    if (currentIndex === -1) {
      copy.push(value)
    } else {
      copy.splice(currentIndex, 1)
    }
    setFilterState({ ...filterState, [cat]: copy })
    handleFilters(filterState)
  }

  return (
    <>
      <Card className="filter px-3">
        <Card.Body>
          <Card.Title>Filter Yarn</Card.Title>
          <Card.Subtitle className="text-right">
            <Button type="button" onClick={clearFilterHandler}>
              Clear filter
            </Button>
          </Card.Subtitle>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Price, €/100g</Form.Label>
              <Form.Control min={priceMin} max={priceMax} step="0.5" type="range" onChange={onChangePriceHandler} value={filterState.priceBy} />
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
              {fibers.map(fib => (
                <div key={fib[0]}>
                  <Form.Check //
                    type="checkbox"
                    id={fib[0]}
                    label={`${fib[0]} (${fib[1]})`}
                    onChange={() => handleToggle(fib[0])}
                    checked={filterState.fibers.indexOf(fib[0]) === -1 ? false : true}
                  />
                </div>
              ))}
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Length, m/100g</Form.Label>
              <Form.Control min="1" max="10000" type="range" />
              <div className="label-comment">
                <div>{lengthMin}m</div>
                <div>0 - 6</div>
                <div>{lengthMax}m</div>
              </div>
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Colors</Form.Label>
              <ol className="colour colour-filter colors">
                {Object.keys(colors).map(key => (
                  <li key={key} className={key}>
                    <a rel="nofollow" className={key} title={key}>
                      {key}
                    </a>
                  </li>
                ))}
              </ol>
            </Form.Group>
            <Form.Group controlId="formBasicRange">
              <Form.Label className="text-primary">Brand</Form.Label>
              {brands.map(brand => (
                <div key={brand[0]}>
                  <Form.Check type="checkbox" id={brand[0]} label={`${brand[0]} (${brand[1]})`} checked={filterState.brands.includes(brand[0])} onChange={onChangeBrandsHandler} />
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
