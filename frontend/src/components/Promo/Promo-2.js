import React from "react"
import { Link } from "react-router-dom"
import { Image, Jumbotron } from "react-bootstrap"
import "./Promo.css"
import FormContainer from "../FormContainer"
import { UPLOADS } from "../../constants/commonConstans"

const Promo2 = () => {
  return (
    <>
      <div className="promo-block-2 bg-super-light-gray">
        <div>
          <div className="promo2-block-text">
            <div>
              <h3 className="mb-3">Добро пожaловать в коллекцию WOOLUNATICS</h3>
              <div>Здесь вы найдете много эксклюзивных текстур и составов. В основном бобинная пряжа и в основном натуральные составы. Пряжа в этой коллекции - сток текстильного производства, у вас есть шанс преобрести редкие и снятые с производства наименования. Пряжа тонкая, толстая - как для ручного вязания, так и для машинного.</div>
              <Link to="/yarns" className="btn btn-success px-5 py-2 my-5">
                SEE COLLECTION
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Image src="/uploads/promo1/red-yarn.jpg" alt="Promo Block" />
        </div>
      </div>
    </>
  )
}

export default Promo2
