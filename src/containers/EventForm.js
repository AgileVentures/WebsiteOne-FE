import React, { Fragment, Component } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import moment from 'moment'
import momentTZ from 'moment-timezone'
import { connect } from 'react-redux'
import { fetchActiveProjects } from '../actions/fetchActiveProjectsAction'
import { createEvent } from '../actions/createEventAction'
import TimezonesSelect from '../components/TimezonesSelect'
import ProjectsSelect from '../components/ProjectsSelect'
import EventCategorySelect from '../components/EventCategorySelect'
import EventForSelect from '../components/EventForSelect'
import EventRepeats from '../components/EventRepeats'
import DaysOfTheWeek from '../components/DaysOfTheWeek'

import 'react-datepicker/dist/react-datepicker.css'

const repeatEndsOptions = [
  { key: 'on', text: 'on', value: 'on' },
  { key: 'never', text: 'never', value: 'never' }
]
export class EventForm extends Component {
  state = {
    projects: null,
    startDate: new Date(),
    endDate: new Date(),
    name: '',
    category: 'PairProgramming',
    eventFor: 'All',
    project: null,
    description: '',
    timezones: momentTZ.tz.guess(),
    duration: '',
    repeats: 'never',
    weekdays: [],
    repeatEnds: ''
  };

  componentDidMount () {
    if (!this.props.projects.length) {
      this.props.fetchActiveProjects()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.projects !== nextProps.projects) {
      this.setState({ projects: nextProps.projects })
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleDateChange = date => {
    this.setState({ startDate: date })
  };

  handleSubmit = event => {
    event.preventDefault()
    const {
      name,
      category,
      eventFor,
      project,
      description,
      startDate,
      timezones,
      duration,
      repeats
    } = this.state
    const startTime = moment(startDate).format('h:mm a')
    const { history, createEvent } = this.props
    const headers = this.props.cookies.get('_WebsiteOne_session')
    createEvent({
      headers,
      history,
      name,
      category,
      eventFor,
      project,
      description,
      startDate,
      startTime,
      timezones,
      duration,
      repeats
    })
  };

  render () {
    const {
      name,
      category,
      eventFor,
      projects,
      description,
      startDate,
      endDate,
      timezones,
      duration,
      repeats,
      repeatEnds
    } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          label='Name'
          name='name'
          value={name}
          onChange={this.handleChange}
        />
        <EventCategorySelect category={category} handleChange={this.handleChange} />
        <EventForSelect eventFor={eventFor} handleChange={this.handleChange} />
        <ProjectsSelect projects={projects} handleChange={this.handleChange} />
        <Form.TextArea
          label='Description'
          name='description'
          value={description}
          onChange={this.handleChange}
        />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <label>Start Date</label>
              <br />
              <DatePicker
                selected={startDate}
                onChange={this.handleDateChange}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Start Time</label>
              <br />
              <DatePicker
                selected={startDate}
                onChange={this.handleDateChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat='h:mm aa'
                timeCaption='Time'
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <TimezonesSelect timezones={timezones} handleChange={this.handleChange} />
        <Form.Input
          label='Duration'
          name='duration'
          type='number'
          value={duration}
          onChange={this.handleChange}
        />
        <EventRepeats repeats={repeats} handleChange={this.handleChange} />
        {repeats && repeats !== 'never' ? (
          <Fragment>
            <DaysOfTheWeek handleChange={this.handleChange} />
            <Form.Select
              label='Repeat ends'
              name='repeatEnds'
              options={repeatEndsOptions}
              placeholder={'on'}
              value={repeatEnds}
              onChange={this.handleChange}
            />
          </Fragment>
        ) : null}
        {repeats && repeatEnds === 'on' ? (
          <Fragment>
            <label>End Date</label>
            <br />
            <DatePicker
              selected={endDate}
              onChange={this.handleDateChange}
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
}

const mapStateToProps = (store, ownProps) => ({
  projects: store.projects,
  cookies: ownProps.cookies
})
export default connect(
  mapStateToProps,
  { fetchActiveProjects, createEvent }
)(EventForm)
