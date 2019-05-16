import React from 'react'
import { pure } from 'recompose'
import { Field } from 'redux-form'
import { SelectField } from 'react-semantic-redux-form'

const EventForSelect = props => {
  const { eventFor } = props
  const eventForOptions = [
    { key: 'all', text: 'All', value: 'All' },
    {
      key: 'premium',
      text: 'Premium Mob Members',
      value: 'Premium Mob Members'
    }
  ]
  return (
    <Field
      label='For'
      name='eventFor'
      options={eventForOptions}
      value={eventFor}
      component={SelectField}
    />
  )
}

export default pure(EventForSelect)
