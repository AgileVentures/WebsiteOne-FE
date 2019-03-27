import React, { Fragment, Component } from 'react'
import { Button, Form, Grid, Container } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import moment from 'moment'
import momentTZ from 'moment-timezone'
import { connect } from 'react-redux'
import { setLastLocation } from '../actions/setLastLocationAction'
import { fetchActiveProjects } from '../actions/fetchActiveProjectsAction'
import { createEvent } from '../actions/createEventAction'
import CreateEventPage from '../components/CreateEventPage'
import TimezonesSelect from '../components/TimezonesSelect'
import ProjectsSelect from '../components/ProjectsSelect'
import EventCategorySelect from '../components/EventCategorySelect'
import EventForSelect from '../components/EventForSelect'
import EventRepeatsSelect from '../components/EventRepeatsSelect'
import DaysOfTheWeekSelect from '../components/DaysOfTheWeekSelect'
import EventRepeatEndsSelect from '../components/EventRepeatEndsSelect'

import 'react-datepicker/dist/react-datepicker.css'
import '../assets/eventForm.css'
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
    const path = this.props.location.pathname
    this.props.setLastLocation(path)
    if (!this.props.cookies.get('_WebsiteOne_session') && !this.props.loggedInUser.data) {
      this.props.history.push({ pathname: '/login' })
    }
    if (!this.props.projects.length) {
      this.props.fetchActiveProjects()
    } else {
      this.setState({ projects: this.props.projects })
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

  handleStartDateChange = date => {
    this.setState({ startDate: date })
  };

  handleEndDateChange = date => {
    this.setState({ endDate: date })
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
      repeats,
      weekdays,
      repeatEnds,
      endDate
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
      repeats,
      weekdays,
      repeatEnds,
      endDate
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
      <Container>
        <CreateEventPage />
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
                <div className='field'>
                  <label>Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={this.handleStartDateChange}
                  />
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className='field'>
                  <label>Start Time</label>
                  <DatePicker
                    selected={startDate}
                    onChange={this.handleStartDateChange}
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
          <TimezonesSelect timezones={timezones} handleChange={this.handleChange} />
          <Form.Input
            label='Duration'
            name='duration'
            type='number'
            value={duration}
            onChange={this.handleChange}
          />
          <EventRepeatsSelect repeats={repeats} handleChange={this.handleChange} />
          {repeats && repeats !== 'never' ? (
            <Fragment>
              <DaysOfTheWeekSelect handleChange={this.handleChange} />
              <EventRepeatEndsSelect handleChange={this.handleChange} />
            </Fragment>
          ) : null}
          {repeats && repeatEnds === 'on' ? (
            <Fragment>
              <div className='field'>
                <label>End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={this.handleEndDateChange}
                />
              </div>
            </Fragment>
          ) : null}
          <br />
          <Link to={'/events'}>
            <Button fluid className='event-cancel-button' primary>Cancel</Button>
          </Link>
          <Button type='submit' fluid className='event-save-button' secondary>Save</Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  projects: store.projects,
  cookies: ownProps.cookies,
  loggedInUser: store.loggedInUser
})
export default connect(
  mapStateToProps,
  { fetchActiveProjects, createEvent, setLastLocation }
)(EventForm)
