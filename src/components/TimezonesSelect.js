import React from 'react'
import { Form } from 'semantic-ui-react'
import momentTZ from 'moment-timezone'
import { pure } from 'recompose'

const TimezonesSelect = props => {
  const timeZonesOptions = momentTZ.tz.names().map((timeZone, i) => {
    return { key: i, text: timeZone, value: timeZone }
  })
  const { timezones, handleChange } = props
  return (
    <Form.Select
      options={timeZonesOptions}
      search
      name='timezones'
      value={timezones}
      onChange={handleChange}
      lazyLoad
    />
  )
}

export default pure(TimezonesSelect)
