import React from 'react'
import { Form } from 'semantic-ui-react'
import { pure } from 'recompose'

const EventRepeats = props => {
  const { repeats, handleChange } = props
  const repeatsOptions = [
    { key: 'never', text: 'never', value: 'never' },
    { key: 'weekly', text: 'weekly', value: 'weekly' },
    { key: 'biweekly', text: 'biweekly', value: 'biweekly' }
  ]
  return (
    <Form.Select
      label='Repeats'
      name='repeats'
      options={repeatsOptions}
      value={repeats}
      onChange={handleChange}
    />
  )
}

export default pure(EventRepeats)
