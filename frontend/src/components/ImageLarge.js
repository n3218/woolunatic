import React from "react"
import { Image, Row, Col } from "react-bootstrap"

const ImageLarge = ({ image, name }) => {
  return (
    <>
      <Row>
        {image &&
          image.map(i => (
            <Col key={i} lg={12} md={12} sm={3} xs={3} xl={6}>
              <div className="bg-dark text-light">{i}:</div>
              <Image src={i} alt={name} title={name} fluid />
            </Col>
          ))}
      </Row>
    </>
  )
}

export default ImageLarge
