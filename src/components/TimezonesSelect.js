import React from 'react'
import momentTZ from 'moment-timezone'
import { pure } from 'recompose'
import { Field } from 'redux-form'
import { SelectField } from 'react-semantic-redux-form'

const TimezonesSelect = props => {
  const timeZonesOptions = momentTZ.tz.names().map((timeZone, i) => {
    return { key: i, text: timeZone, value: timeZone }
  })
  const { timezones } = props
  return (
    <Field
      options={timeZonesOptions}
      search
      name='timezones'
      value={timezones}
      component={SelectField}
    />
  )
}

export default pure(TimezonesSelect)
