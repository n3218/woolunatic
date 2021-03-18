import React from "react"
import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"
import { UPLOADS } from "../../constants/commonConstans"
import "./Promo.css"

const Promo = () => {
  return (
    <div className="promo-block columns-3">
      <div className="overflow-hidden">
        <Image src={`${UPLOADS}/promo/coral-tulips.jpg`} alt="Promo Block" />
      </div>

      <div className="overflow-hidden position-relative">
        <Link to="/products/5fd9c80930203c1975431952" target="_blank">
          <Image src={`${UPLOADS}/promo/coral-ball.jpg`} alt="Promo Block" />
          <div className="blured-container-text blured-container">
            <nobr>Monteluce (Japan)</nobr>
            <div className="h1">Jupiter</div>
          </div>
        </Link>
      </div>
      <div className="overflow-hidden">
        <Image src={`${UPLOADS}/promo/amsterdam.jpg`} alt="Promo Block" />
      </div>
    </div>
  )
}

export default Promo
