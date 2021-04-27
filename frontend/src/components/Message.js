import React, { useEffect, useState } from "react"
import { Alert } from "react-bootstrap"

const Message = ({ variant, children, header, onClose, className }) => {
  const [show, setShow] = useState(true)

  const onCloseHandler = onClose => {
    setShow(false)
    if (onClose) {
      onClose()
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (show) {
        setShow(false)
      }
    }, 6000)
  }, [show])

  if (show) {
    return (
      <Alert variant={variant} onClose={() => onCloseHandler(onClose)} dismissible={onClose} className={`py-3 ${className}`}>
        {header && <Alert.Heading>{header}</Alert.Heading>}
        {children}
      </Alert>
    )
  } else {
    return <></>
  }
}
Message.defaultProps = {
  variant: "info",
  onClose: null,
  className: ""
}

export default Message
