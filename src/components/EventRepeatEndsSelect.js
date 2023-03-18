import React from 'react'
import { Field } from 'redux-form'
import { SelectField } from 'react-semantic-redux-form'
import { pure } from 'recompose'

const EventRepeatEndsSelect = props => {
  const { repeatEnds } = props
  const repeatEndsOptions = [
    { key: 'on', text: 'on', value: 'on' },
    { key: 'never', text: 'never', value: 'never' }
  ]
  return (
    <Field
      label='Repeat ends'
      name='repeatEnds'
      component={SelectField}
      options={repeatEndsOptions}
      placeholder='on'
      value={repeatEnds}
    />
  )
}

export default pure(EventRepeatEndsSelect)
