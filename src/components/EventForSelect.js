import React from 'react'
import { Form } from 'semantic-ui-react'
import { pure } from 'recompose'

const EventForSelect = props => {
  const { eventFor, handleChange } = props
  const eventForOptions = [
    { key: 'all', text: 'All', value: 'All' },
    {
      key: 'premium',
      text: 'Premium Mob Members',
      value: 'Premium Mob Members'
    }
  ]
  return (
    <Form.Select
      label='For'
      name='eventFor'
      options={eventForOptions}
      value={eventFor}
      onChange={handleChange}
    />
  )
}

export default pure(EventForSelect)
