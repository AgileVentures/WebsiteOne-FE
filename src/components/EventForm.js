import React, { Fragment } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import momentTZ from 'moment-timezone'
import { Link } from 'react-router-dom'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

const EventForm = props => {
  const categoryOptions = [
    { key: 'pp', text: 'PairProgramming', value: 'PairProgramming' },
    { key: 'scrum', text: 'Scrum', value: 'Scrum' },
    { key: 'client', text: 'ClientMeeting', value: 'ClientMeeting' }
  ]
  const eventForOptions = [
    { key: 'all', text: 'All', value: 'All' },
    {
      key: 'premium',
      text: 'Premium Mob Members',
      value: 'Premium Mob Members'
    }
  ]
  const projectOptions = props.projects.map(project => {
    return { key: project.id, text: project.title, value: project.id }
  })
  const timeZonesOptions = momentTZ.tz.names().map(timeZone => {
    return { key: timeZone, text: timeZone, value: timeZone }
  })
  const repeatsOptions = [
    { key: 'never', text: 'never', value: 'never' },
    { key: 'weekly', text: 'weekly', value: 'weekly' },
    { key: 'biweekly', text: 'biweekly', value: 'biweekly' }
  ]
  const daysOfTheWeek = moment.weekdays().map(weekday => {
    return { key: weekday, text: weekday, value: weekday }
  })
  const repeatEndsOptions = [
    { key: 'on', text: 'on', value: 'on' },
    { key: 'never', text: 'never', value: 'never' }
  ]
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Input
        label='Name'
        name='name'
        value={props.name}
        onChange={props.handleChange}
      />
      <Form.Select
        label='Category'
        name='category'
        options={categoryOptions}
        placeholder={categoryOptions[0].text}
        value={categoryOptions.value}
        onChange={props.handleChange}
      />
      <Form.Select
        label='For'
        name='eventFor'
        options={eventForOptions}
        placeholder={eventForOptions[0].text}
        value={eventForOptions.value}
        onChange={props.handleChange}
      />
      <Form.Select
        label='Project'
        name='project'
        options={projectOptions}
        placeholder={''}
        value={projectOptions.value}
        onChange={props.handleChange}
        search
      />
      <Form.TextArea
        label='Description'
        name='description'
        value={props.description}
        onChange={props.handleChange}
      />
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <label>Start Date</label>
            <br />
            <DatePicker
              selected={props.startDate}
              onChange={props.handleDateChange}
            />
          </Grid.Column>
          <Grid.Column>
            <label>Start Time</label>
            <br />
            <DatePicker
              selected={props.startDate}
              onChange={props.handleDateChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat='h:mm aa'
              timeCaption='Time'
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Form.Select
        options={timeZonesOptions}
        search
        name='timezone'
        value={props.timezone}
        onChange={props.handleChange}
      />
      <Form.Input
        label='Duration'
        name='duration'
        type='number'
        value={props.duration}
        onChange={props.handleChange}
      />
      <Form.Select
        label='Repeats'
        name='repeats'
        options={repeatsOptions}
        placeholder={repeatsOptions[0].text}
        value={repeatsOptions.value}
        onChange={props.handleChange}
      />
      {props.repeats && props.repeats !== 'never' ? (
        <Fragment>
          <Form.Select
            label='Each'
            name='weekdays'
            options={daysOfTheWeek}
            multiple
            onChange={props.handleChange}
          />
          <Form.Select
            label='Repeat ends'
            name='repeatEnds'
            options={repeatEndsOptions}
            placeholder={'on'}
            value={props.repeatsEnd}
            onChange={props.handleChange}
          />
        </Fragment>
      ) : null}
      {props.repeats && props.repeatEnds === 'on' ? (
        <Fragment>
          <label>End Date</label>
          <br />
          <DatePicker
            selected={props.endDate}
            onChange={props.handleDateChange}
          />
        </Fragment>
      ) : null}
      <br />
      <Link to={'/events'}>
        <Button>Cancel</Button>
      </Link>
      <Button type='submit'>Save</Button>
    </Form>
  )
}

export default EventForm
