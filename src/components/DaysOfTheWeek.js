import React from 'react'
import { Form } from 'semantic-ui-react'
import moment from 'moment'
import { pure } from 'recompose'

const DaysOfTheWeek = props => {
  const { handleChange } = props
  const daysOfTheWeek = moment.weekdays().map(weekday => {
    return { key: weekday, text: weekday, value: weekday }
  })
  return (
    <Form.Select
      label='Each'
      name='weekdays'
      options={daysOfTheWeek}
      multiple
      onChange={handleChange}
    />
  )
}

export default pure(DaysOfTheWeek)
