import React from "react"

const ColorListScreen = ({ history, match }) => {
  return (
    <>
      <h2>Colors</h2>
      <div className="color-container">
        <div className="color-example bg-super-dark-gray">super-dark-gray</div>
        <div className="color-example bg-dark-gray">dark-gray</div>
        <div className="color-example bg-gray">gray</div>
        <div className="color-example bg-medium-gray">medium-gray</div>
        <div className="color-example bg-light-gray">light-gray</div>
        <div className="color-example bg-super-light-gray">super-light-gray</div>
        <div className="color-example bg-super-dark-green">super-dark-green</div>
        <div className="color-example bg-dark-green">dark-green</div>
        <div className="color-example bg-green">green</div>
        <div className="color-example bg-light-green">light-green</div>
        <div className="color-example bg-super-light-green">super-light-green</div>
        <div className="color-example bg-red">red</div>
        <div className="color-example bg-orange">orange</div>
        <div className="color-example bg-blue">blue</div>
      </div>
    </>
  )
}

export default ColorListScreen
