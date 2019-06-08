import React from 'react'
import { pure } from 'recompose'
import { Field } from 'redux-form'
import { SelectField } from 'react-semantic-redux-form'

const EventRepeatsSelect = props => {
  const { repeats } = props
  const repeatsOptions = [
    { key: 'never', text: 'never', value: 'never' },
    { key: 'weekly', text: 'weekly', value: 'weekly' },
    { key: 'biweekly', text: 'biweekly', value: 'biweekly' }
  ]
  return (
    <Field
      label='Repeats'
      name='repeats'
      component={SelectField}
      options={repeatsOptions}
      value={repeats}
    />
  )
}

export default pure(EventRepeatsSelect)
