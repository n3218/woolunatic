import React from "react"
import { Jumbotron } from "react-bootstrap"
import Meta from "../../components/Meta"
import FormContainer from "../../components/FormContainer"

const DisclaimerScreen = () => {
  return (
    <Jumbotron>
      <Meta title="Disclaimer | Woolunatics" />
      <FormContainer>
        <h1>Disclaimer</h1>
        <br />
        <h5>
          <span className="h4">Website</span>: www.woolunatics.nl and all underlying pages;
        </h5>
        <h5>
          <span className="h4">User</span>: visitors to the website;
        </h5>
        <h5>
          <span className="h4">Company</span>: Woolunatics, the authorized publisher of the web page;
        </h5>

        <h3>The following applies to our website. By using the website you agree to this disclaimer.</h3>
        <p>
          <span className="h4">Woolunatics</span> regularly updates the content of the website and updates the website regularly. Despite these efforts, the content of this website may be incomplete or outdated.
        </p>
        <p>
          <span className="h4">Woolunatics</span> does not in any way guarantee the correctness or completeness of the information consulted on this website.
        </p>
        <p>
          <span className="h4">Woolunatics</span> does not guarantee the security of our website and can therefore not be held liable for any damage suffered directly or indirectly through the use of our website.
        </p>
        <p>
          <span className="h4">Woolunatics</span> is not responsible for pages from external parties to which reference is made;
        </p>
        <p>
          <span className="h4">Woolunatics</span> provides information on its website without any warranty or guarantee. No rights can be derived in any way from the information on the website;
        </p>
        <p>
          <span className="h4">Woolunatics</span> cannot be held liable for any damage whatsoever due to the use of the information on our website;
        </p>
        <p>
          <span className="h4">Woolunatics</span> will change or discontinue the website at its own discretion and at any time.{" "}
        </p>
        <p>
          <span className="h4">Woolunatics</span> cannot be held liable for the consequences of changes or termination on / of its website;
        </p>
        <p>
          <span className="h4">User</span> is responsible for the use of all information provided on our website;
        </p>
      </FormContainer>
    </Jumbotron>
  )
}

export default DisclaimerScreen
