import React, { PureComponent } from 'react'
import { Form } from 'semantic-ui-react'
import momentTZ from 'moment-timezone'

// import timezonesFixture from '../helpers/timezones'

const timeZonesOptions = momentTZ.tz.names().map((timeZone, i) => {
  return { key: i, text: timeZone, value: timeZone }
})

export default class TimezonesSelect extends PureComponent {
  render () {
    const { timezones } = this.props
    return (
      <Form.Select
        options={timeZonesOptions}
        search
        name='timezones'
        value={timezones}
        onChange={this.handleChange}
        lazyLoad
      />
    )
  }
}
