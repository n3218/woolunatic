import React from "react"
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
          <Form.Control as={as} rows={rows} sm="10" type="text" placeholder={`Enter ${label}`} value={value} onChange={e => onChange(e.target.value)}></Form.Control>
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

export default FormField
