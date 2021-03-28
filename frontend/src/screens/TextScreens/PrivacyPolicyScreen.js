import React from "react"
import { Jumbotron } from "react-bootstrap"
import Meta from "../../components/Meta"
import FormContainer from "../../components/FormContainer"

const PrivacyPolicyScreen = () => {
  return (
    <Jumbotron>
      <Meta title="Privacy Policy | Woolunatics" />
      <FormContainer>
        <h1>Privacy Policy</h1>

        <h4>Woolunatics respects the privacy of all users of its site and ensures that the personal information you provide is treated confidentially. We use your data to process orders as quickly and easily as possible. For the rest, we will only use this information with your permission. Woolunatics will not sell your personal information to third parties and will only make it available to third parties that are involved in processing your order.</h4>
        <br />
        <h5>Woolunatics uses the collected data to provide its customers with the following services: If you place an order, we need your name, e-mail address, delivery address, telephone number and payment details to process your order and to inform you of its progress. To make shopping at Woolunatics as pleasant as possible, we store with your consent your personal information and the details regarding your order and the use of our services. This allows us to personalize the website.</h5>
        <br />
        <h5>We use your e-mail address to inform you about the development of the website and about special offers and promotions. If you no longer appreciate this, you can send us an email. You can register a username and password so that your name and address, telephone number, e-mail address, delivery and payment details, do not have to be entered with every new order.</h5>
        <br />
        <h5>Information about the use of our site and the feedback we receive from our visitors helps us to further develop and improve our site. If you decide to write a review, you can choose whether to add your name or other personal information. We are curious about the opinions of our visitors, but reserve the right not to publish contributions that do not meet our site conditions. Woolunatics does not sell your information.</h5>
        <br />
        <h5>Woolunatics will not sell your personal information to third parties and will only make it available to third parties that are necessarily involved in processing your order. Our employees and third parties engaged by us are obliged to respect the confidentiality of your data. If you have any questions about the Privacy Policy of Woolunatics, please contact us. Our customer service will help you if you need information about your data or if you want to change it. In the event that changes to our Privacy Policy are necessary, you will always find the most recent information on this page.</h5>
      </FormContainer>
    </Jumbotron>
  )
}

export default PrivacyPolicyScreen
