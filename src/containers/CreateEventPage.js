import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchActiveProjects } from '../actions/fetchActiveProjectsAction'
import { createEvent } from '../actions/createEventAction'
import EventForm from '../components/EventForm'
import momentTZ from 'moment-timezone'
import moment from 'moment'
export class CreateEventPage extends Component {
  state = {
    projects: null,
    startDate: new Date(),
    endDate: new Date(),
    name: '',
    category: 'PairProgramming',
    eventFor: 'All',
    project: null,
    description: '',
    timezone: momentTZ.tz.guess(),
    duration: '',
    repeats: 'never',
    weekdays: [],
    repeatEnds: ''
  };

  componentDidMount () {
    this.props.fetchActiveProjects()
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
      timezone,
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
      timezone,
      duration,
      repeats
    })
  };

  render () {
    const {
      projects,
      startDate,
      endDate,
      name,
      category,
      eventFor,
      project,
      description,
      timezone,
      duration,
      repeats,
      weekdays,
      repeatEnds
    } = this.state
    return (
      <Container>
        <Header as='h1' textAlign='center'>
          Creating a new Event
        </Header>
        <EventForm
          handleSubmit={this.handleSubmit}
          projects={projects || []}
          startDate={startDate}
          endDate={endDate}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          name={name}
          category={category}
          eventFor={eventFor}
          project={project}
          description={description}
          timezone={timezone}
          duration={duration}
          repeats={repeats}
          weekdays={weekdays}
          repeatEnds={repeatEnds}
        />
      </Container>
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
)(CreateEventPage)
