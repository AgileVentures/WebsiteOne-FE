import React from 'react'
import { Form } from 'semantic-ui-react'
import moment from 'moment'
import { pure } from 'recompose'
import { SelectField } from 'react-semantic-redux-form'

const DaysOfTheWeekSelect = props => {
  const { handleChange } = props
  const daysOfTheWeek = moment.weekdays().map(weekday => {
    return { key: weekday, text: weekday, value: weekday }
  })
  return (
    <Form
      label='Each'
      name='weekdays'
      options={daysOfTheWeek}
      multiple
      onChange={handleChange}
      component={SelectField}
    />
  )
}

export default pure(DaysOfTheWeekSelect)
