import React from 'react'
import { Form } from 'semantic-ui-react'
import { pure } from 'recompose'

const EventCategorySelect = props => {
  const { handleChange } = props
  const categoryOptions = [
    { key: 'pp', text: 'PairProgramming', value: 'PairProgramming' },
    { key: 'scrum', text: 'Scrum', value: 'Scrum' },
    { key: 'client', text: 'ClientMeeting', value: 'ClientMeeting' }
  ]
  return (
    <Form.Select
      label='Category'
      name='category'
      options={categoryOptions}
      placeholder={categoryOptions[0].text}
      value={categoryOptions.value}
      onChange={handleChange}
    />
  )
}

export default pure(EventCategorySelect)
