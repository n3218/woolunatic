import React from "react"
import { Jumbotron } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import Loader from "../components/Loader"

const HideScreen = () => {
  return (
    <Jumbotron>
      <FormContainer>
        <Loader />
      </FormContainer>
    </Jumbotron>
  )
}

export default HideScreen
