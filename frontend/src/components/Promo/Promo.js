import React from "react"
import { Link } from "react-router-dom"
import { Image, Jumbotron } from "react-bootstrap"
import "./Promo.css"
import FormContainer from "../FormContainer"

const Promo = () => {
  return (
    <>
      <h2>Всех с Новым Годом и Рождеством!</h2>
      <div className="promo-block">
        <div id="promo-1" className="overflow-hidden">
          <Image src="/assets/promo/80331473_184683979321816_1434081165030083279_n.webp" alt="Promo Block" />
        </div>
        <div id="promo-2" className="promo-block-button-container overflow-hidden">
          <Link to="/products/5fe6eb0e187920f33697b6dd" target="_blank">
            <Image src="/uploads/image-1608969334624.jpg" alt="Promo Block" />
            <div className="promo-block-text-container">
              <div className="promo-block-text">
                <div>B.Modesto</div>
                <div>UPSALA</div>
              </div>
            </div>
            <div className="promo-block-button">ПОДРОБНЕЕ</div>
          </Link>
        </div>
        <div id="promo-3" className="promo-block-button-container overflow-hidden">
          <Link to="/products/5fd9c80930203c1975431952" target="_blank">
            <Image src="/uploads/image-1608189301093.jpg" alt="Promo Block" />
            <div className="promo-block-text">
              <div>
                <nobr>Monteluce (Japan)</nobr>
              </div>
              <div>JUPITER</div>
            </div>
            <div className="promo-block-button">ПОДРОБНЕЕ</div>
          </Link>
        </div>
        <div id="promo-4" className="overflow-hidden">
          <Image src="/assets/promo/76877129_631712434302829_2274931547804815072_n.webp" alt="Promo Block" />
        </div>
        <div id="promo-5" className="promo-block-button-container overflow-hidden">
          <Link to="/products/5fe6e7e760af6cf2331164c9" target="_blank">
            <Image src="/uploads/image-1608968725901.jpg" alt="Millefili COUSCOUS" />
            <div className="promo-block-text">
              <div>Millefili</div>
              <div>COUSCOUS</div>
            </div>
            <div className="promo-block-button">ПОДРОБНЕЕ</div>
          </Link>
        </div>
        <div id="promo-6" className="promo-block-button-container overflow-hidden">
          <Link to="/products/5fe8146bef583024233dbd5e" target="_blank">
            <Image src="/uploads/image-1609045453112.jpg" alt="Lineapiu Ghost" />
            <div className="promo-block-text">
              <div className="text-center">
                <small>Filati Naturali</small>
              </div>
              <div className="text-center">
                <small>BABY YAK</small>
              </div>
            </div>
            <div className="promo-block-button">ПОДРОБНЕЕ</div>
          </Link>
        </div>
        <div id="promo-7" className="overflow-hidden">
          <Image src="/assets/promo/79645455_172311820520261_3764907917497880995_n.webp" alt="Promo Block" />
        </div>

        <div id="promo-8" className="promo-block-button-container overflow-hidden">
          <Link to="/products/5fe7f934be9ee90017f179c4" target="_blank">
            <Image src="/uploads/image-1608189301100.jpg" alt="Lineapiu Ghost" />
            <div className="promo-block-text">
              <div>Lineapiu</div>
              <div>GHOST</div>
            </div>
            <div className="promo-block-button">ПОДРОБНЕЕ</div>
          </Link>
        </div>
        <div id="promo-9" className="overflow-hidden">
          <Image src="/uploads/image-1609038711626.jpg" alt="Promo Block" />
        </div>
      </div>
      <Jumbotron>
        <FormContainer>
          <h3 className="promo-welcome-header text-center mb-3">Добро пожaловать в коллекцию WOOLUNATICS</h3>
          <div>Здесь вы найдете много эксклюзивных текстур и составов. В основном бобинная пряжа и в основном натуральные составы. Пряжа в этой коллекции - сток текстильного производства, у вас есть шанс преобрести редкие и снятые с производства наименования. Пряжа тонкая, толстая - как для ручного вязания, так и для машинного.</div>
        </FormContainer>
      </Jumbotron>
    </>
  )
}

export default Promo
