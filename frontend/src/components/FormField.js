import React, { useEffect, useState } from "react"
import { Form, Row, Col } from "react-bootstrap"

const FormField = ({ value, label, onChange }) => {
  return (
    <Form.Group controlId={value}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type="text" placeholder={`Enter ${label}`} value={value} onChange={e => onChange(e.target.value)}></Form.Control>
    </Form.Group>
  )
}

export const FormFieldAsRow = ({ comment, value, label, onChange, as, rows }) => {
  return (
    <Form.Group controlId={label}>
      <Row>
        <Col sm="2">
          <Form.Label>{label}</Form.Label>
          <div className="label-comment">{comment}</div>
        </Col>
        <Col>
          <Form.Control as={as} onFocus={e => e.target.value === e.target.placeholder && onChange("")} rows={rows} sm="10" type="text" placeholder={`Enter ${label}`} value={value} onChange={e => onChange(e.target.value)}></Form.Control>
        </Col>
      </Row>
    </Form.Group>
  )
}

export const FormFieldAsRowCheckbox = ({ value, label, onChange }) => {
  return (
    <Form.Group controlId={label}>
      <Row>
        <Col sm="2">
          <Form.Label>{label}</Form.Label>
        </Col>
        <Col>
          <Form.Check type="checkbox" className="custom-checkbox" label={label} checked={value} onChange={e => onChange(e.target.checked)}></Form.Check>
        </Col>
      </Row>
    </Form.Group>
  )
}

export const FormFieldForShippingOption = ({ option, setOptions, options }) => {
  const operatorsData = ["postnl", "parcelnl", "dpd", "dhl", "ups"]
  const delta = `${Math.round(option.minWeight / 1000)}-${Math.round(option.maxWeight / 1000)} kg`

  const [operator, setOperator] = useState(option.operator || "")
  const [cost, setCost] = useState(option.cost.toFixed(2) || 0)

  useEffect(() => {
    if (options) {
      const newOption = { ...option, operator, cost }
      const newOptions = [...options.filter(op => op._id !== newOption._id), newOption].sort((a, b) => Number(a.minWeight) - Number(b.minWeight))
      setOptions(newOptions)
    }
  }, [cost, operator])

  return (
    <Form.Group controlId={delta}>
      <Row>
        <Col xs={2} xl={2}>
          <Form.Label>
            <nobr>{delta}</nobr>
          </Form.Label>
        </Col>
        <Col>
          <Row>
            <div style={{ width: "70px" }}>
              <img src={`/assets/carriers/${operator}.png`} alt={operator} width={60} />
            </div>
            <div style={{ width: "100px", marginRight: "40px" }}>
              <Form.Control as="select" value={operator} onChange={e => setOperator(e.target.value)}>
                <option key="0" value="">
                  Operator...
                </option>
                {operatorsData.map(el => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </Form.Control>
            </div>
            <div style={{ width: "10px", paddingTop: "8px" }}>€</div>
            <div style={{ width: "60px" }}>
              <Form.Control type="number" placeholder="Enter Cost" value={cost} onChange={e => setCost(e.target.value)}></Form.Control>
            </div>
          </Row>
        </Col>
      </Row>
    </Form.Group>
  )
}

export default FormField
