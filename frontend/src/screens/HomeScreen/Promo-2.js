import React from "react"
import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"
import { UPLOADS } from "../../constants/commonConstans"
import "./Promo.css"

const Promo2 = () => {
  return (
    <>
      <div className="promo-block bg-super-light-gray columns-2">
        <div className="columns-2-block-text">
          <h3 className="mb-3">О коллекции YarnStore</h3>
          <div>Здесь вы найдете много эксклюзивных текстур и составов. В основном бобинная пряжа и в основном натуральные составы. Пряжа в этой коллекции - сток текстильного производства, у вас есть шанс преобрести редкие и снятые с производства наименования. Пряжа тонкая, толстая - как для ручного вязания, так и для машинного.</div>
          <div>
            <Link to="/yarns" className="btn btn-success px-5 py-2 my-5">
              <nobr>SEE COLLECTION</nobr>
            </Link>
          </div>
        </div>

        <div className="overflow-hidden">
          <Image src={`${UPLOADS}/promo/red-yarn.jpg`} alt="Promo Block" />
        </div>
      </div>
    </>
  )
}

export default Promo2
