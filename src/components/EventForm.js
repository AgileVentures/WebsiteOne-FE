import React, { Fragment } from 'react'
import { Form, Grid, Container } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import TimezonesSelect from './TimezonesSelect'
import ProjectsSelect from './ProjectsSelect'
import EventCategorySelect from './EventCategorySelect'
import EventForSelect from './EventForSelect'
import EventRepeatsSelect from './EventRepeatsSelect'
import DaysOfTheWeekSelect from './DaysOfTheWeekSelect'
import EventRepeatEndsSelect from './EventRepeatEndsSelect'
import FormButton from './FormButton'

import 'react-datepicker/dist/react-datepicker.css'
import '../assets/eventForm.css'
export const EventForm = props => {
  const {
    name,
    category,
    eventFor,
    projects,
    projectId,
    description,
    startDate,
    endDate,
    timezones,
    duration,
    repeats,
    repeatEnds,
    handleChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSubmit
  } = props
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Grid columns={2}>
          <Grid.Column width={8}>
            <Form.Input
              label='Name'
              name='name'
              value={name}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label='Description'
              name='description'
              value={description}
              onChange={handleChange}
            />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <div className='field'>
                    <label>Start Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      name='startDate'
                    />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className='field'>
                    <label>Start Time</label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      dateFormat='h:mm aa'
                      timeCaption='Time'
                    />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <TimezonesSelect timezones={timezones} handleChange={handleChange} />
            <Form.Input
              label='Duration'
              name='duration'
              type='number'
              value={duration}
              onChange={handleChange}
              required
            />
          </Grid.Column>
          <Grid.Column width={8} >
            <EventCategorySelect category={category} handleChange={handleChange} />
            <EventForSelect eventFor={eventFor} handleChange={handleChange} />
            <ProjectsSelect projectId={projectId} projects={projects} handleChange={handleChange} />
            <EventRepeatsSelect repeats={repeats} handleChange={handleChange} />
            {repeats && repeats !== 'never' ? (
              <Fragment>
                <DaysOfTheWeekSelect handleChange={handleChange} />
                <EventRepeatEndsSelect handleChange={handleChange} />
              </Fragment>
            ) : null}
            {repeats && repeatEnds === 'on' ? (
              <Fragment>
                <div className='field'>
                  <label>End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    name='endDate'
                  />
                </div>
              </Fragment>
            ) : null}
            <br />
          </Grid.Column>
          <Grid.Column width={8}>
            <Link to={'/events'}>
              <FormButton type='primary' buttonText='Cancel' className='event-cancel-button' />
            </Link>
          </Grid.Column>
          <Grid.Column width={8}>
            <FormButton type='secondary' buttonText='Save' className='event-save-button' />
          </Grid.Column>
        </Grid>
      </Form>
    </Container>
  )
}

export default EventForm
