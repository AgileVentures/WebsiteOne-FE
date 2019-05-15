import React from 'react'
import { Button, Popup, Icon } from 'semantic-ui-react'

const NewButton = (props) => {
  return (
    <a href={props.href}>
      <Popup
        position='right center'
        trigger={
          <Button basic style={{ marginTop: '25px' }}>
            <Icon name='plus' id={props.iconId} />
          </Button>
        }
        content={props.content}
      />
    </a>
  )
}

export default NewButton
