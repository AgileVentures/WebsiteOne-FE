import React from 'react'
import { Field } from 'redux-form'
import { SelectField } from 'react-semantic-redux-form'
import { pure } from 'recompose'

const EventCategorySelect = props => {
  const { category } = props
  console.log(category)
  const categoryOptions = [
    { key: 'pp', text: 'PairProgramming', value: 'PairProgramming' },
    { key: 'scrum', text: 'Scrum', value: 'Scrum' },
    { key: 'client', text: 'ClientMeeting', value: 'ClientMeeting' }
  ]
  return (
    <Field
      label='Category'
      name='category'
      component={SelectField}
      options={categoryOptions}
      value={category}
    />
  )
}

export default pure(EventCategorySelect)
