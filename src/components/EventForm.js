import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import momentTZ from 'moment-timezone'

import 'react-datepicker/dist/react-datepicker.css'

const EventForm = props => {
  const categoryOptions = [
    { key: 'pp', text: 'PairProgramming' },
    { key: 's', text: 'Scrum' },
    { key: 'cm', text: 'ClientMeeting' }
  ]
  const forOptions = [
    { key: 'a', text: 'All' },
    { key: 'pmm', text: 'Premium Mob Members' }
  ]

  const projectOptions = props.projects.map(project => {
    return { key: project.id, text: project.title }
  })
  const timeZonesList = momentTZ.tz.names().map(timeZone => {
    return { key: timeZone, text: timeZone }
  })
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Input label='Name' name='name' />
      <Form.Select label='Category' options={categoryOptions} placeholder={categoryOptions[0].text} />
      <Form.Select label='For' options={forOptions} placeholder={forOptions[0].text} />
      <Form.Select label='Project' options={projectOptions} placeholder={''} />
      <Form.TextArea label='Description' name='description' />
      <p>Start Date</p>
      <DatePicker selected={props.startDate} onChange={props.handleChange} />
      <p>Start Time</p>
      <DatePicker
        selected={props.startDate}
        onChange={props.handleChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat='h:mm aa'
        timeCaption='Time'
      />
      <Form.Select options={timeZonesList} placeholder={momentTZ.tz.guess()} />
      <Button type='submit'>Save</Button>
    </Form>
  )
}

export default EventForm
