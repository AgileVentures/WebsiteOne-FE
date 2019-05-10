import React from 'react'
import { Button } from 'semantic-ui-react'

const FormButton = props => {
  const handleButtonSecondary = () => {
    if (props.type === 'secondary') {
      return true
    }
    return false
  }

  const handleButtonPrimary = () => {
    if (props.type === 'primary') {
      return true
    }
    return false
  }

  return (
    <Button fluid className={props.className} secondary={handleButtonSecondary()} primary={handleButtonPrimary()} >{props.buttonText}</Button>
  )
}

export default FormButton
