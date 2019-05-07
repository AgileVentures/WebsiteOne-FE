import React from 'react'
import { Button } from 'semantic-ui-react'

const FormButton = props => {
  const handleClass = () => {
    if (props.type === 'submit') {
      return 'event-save-button'
    }
    return 'event-cancel-button'
  }

  return (
    <Button fluid className={handleClass()} primary>{props.buttonText}</Button>
  )
}

export default FormButton
