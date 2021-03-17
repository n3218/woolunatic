import React from "react"
import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"
import "./Promo.css"

const Promo = () => {
  return (
    <>
      <div className="promo-block-3">
        <div id="promo-block-3-1" className="promo-block-button-container overflow-hidden">
          <Image src="/uploads/promo1/coral-tulips.jpg" alt="Promo Block" />
        </div>

        <div id="promo-block-3-2" className="promo-block-button-container overflow-hidden">
          <Link to="/products/5fd9c80930203c1975431952" target="_blank">
            <Image src="/uploads/promo1/coral-ball.jpg" alt="Promo Block" />
            <div className="promo-block-text blured-container">
              <div>
                <nobr>Monteluce (Japan)</nobr>
              </div>
              <div className="h1">Jupiter</div>
            </div>
          </Link>
        </div>
        <div id="promo-block-3-3" className="overflow-hidden">
          <Image src="/uploads/promo1/amsterdam.jpg" alt="Promo Block" />
        </div>
      </div>
    </>
  )
}

export default Promo
