import React from 'react'
import { Form } from 'semantic-ui-react'
import { pure } from 'recompose'

const EventRepeatEndsSelect = props => {
  const { repeatEnds, handleChange } = props
  const repeatEndsOptions = [
    { key: 'on', text: 'on', value: 'on' },
    { key: 'never', text: 'never', value: 'never' }
  ]
  return (
    <Form.Select
      label='Repeat ends'
      name='repeatEnds'
      options={repeatEndsOptions}
      placeholder={'on'}
      value={repeatEnds}
      onChange={handleChange}
    />
  )
}

export default pure(EventRepeatEndsSelect)
