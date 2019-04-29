import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import EventForm from '../components/EventForm'
import { fetchActiveProjects } from '../actions/fetchActiveProjectsAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { createEvent } from '../actions/createEventAction'
import moment from 'moment'
import momentTZ from 'moment-timezone'

export class CreateEventPage extends Component {
  state = {
    projects: null,
    startDate: new Date(),
    endDate: new Date(),
    name: '',
    category: 'PairProgramming',
    eventFor: 'All',
    projectId: 64,
    description: '',
    timezones: momentTZ.tz.guess(),
    duration: 30,
    repeats: 'never',
    weekdays: [],
    repeatEnds: ''
  };

  componentDidMount () {
    const path = this.props.location.pathname
    this.props.setLastLocation(path)
    if (!this.props.cookies.get(process.env.SESSION || 'WebsiteOne_session') && !this.props.loggedInUser.data) {
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
      projectId,
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
    const startDateFormatted = moment(startDate).format('YYYYMMDD')
    const weekdaysLowerCase = weekdays.map(day => day.toLowerCase())
    const { history, createEvent } = this.props
    const headers = this.props.cookies.get(process.env.SESSION || 'WebsiteOne_session')
    createEvent({
      headers,
      history,
      name,
      category,
      eventFor,
      projectId,
      description,
      startDate,
      startDateFormatted,
      startTime,
      timezones,
      duration,
      repeats,
      weekdaysLowerCase,
      repeatEnds,
      endDate
    })
  };

  render () {
    const {
      name,
      category,
      eventFor,
      projectId,
      description,
      startDate,
      timezones,
      duration,
      repeats,
      weekdays,
      repeatEnds,
      endDate
    } = this.state
    return (
      <Fragment>
        <Header as='h1' textAlign='center'>
          Creating a new Event
        </Header>
        <EventForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
          name={name}
          category={category}
          eventFor={eventFor}
          projectId={projectId}
          description={description}
          startDate={startDate}
          timezones={timezones}
          duration={duration}
          repeats={repeats}
          weekdays={weekdays}
          repeatEnds={repeatEnds}
          endDate={endDate}
        />
      </Fragment>
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
)(CreateEventPage)
