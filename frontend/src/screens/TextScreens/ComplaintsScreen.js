import React from "react"
import { Jumbotron } from "react-bootstrap"
import Meta from "../../components/Meta"
import FormContainer from "../../components/FormContainer"

const ComplaintsScreen = () => {
  return (
    <Jumbotron>
      <Meta title="Complaints | Woolunatics" />
      <FormContainer>
        <h1>Complaints</h1>
        <h3>The goal of Woolunatics.nl</h3>
        <p>The goal of Woolunatics.nl is to be the most customer-friendly online store for exclusive and specialty yarns for knitting and crochet. </p>
        <p>This is why we see a complaint as an opportunity to improve our service and turn a dissatisfied or disappointed customer into a satisfied customer.</p>
        <p>We promise to do our utmost to deal with your complaint appropriately. The offered solution always depends on the type and cause of the complaint.</p>
        <h3>Complaints policy</h3>
        <p>Do you have a complaint about Woolunatics.nl, a product, our service, or a delivery?</p>
        <p>
          Please send an email to <a href="mailto:info@woolunatics.nl">info@woolunatics.nl</a> including:
        </p>
        <ol>
          <li>A clear description of the nature of your complaint;</li>
          <li>Any necessary details concerning your order;</li>
          <li>Your personal details, so that we know where to reach you during office hours.</li>
        </ol>
         <p>We aim for a speedy resolution of any complaints and will reply as soon as possible, but always within 14 office days. For more information, please go to our General Terms and Conditions.</p>
      </FormContainer>
    </Jumbotron>
  )
}

export default ComplaintsScreen
