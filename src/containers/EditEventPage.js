import React, { Component, Fragment } from 'react'
import { fetchEventInfo } from '../actions/getEventInfoAction'
import { fetchActiveProjects } from '../actions/fetchActiveProjectsAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import CustomRingLoader from '../components/CustomRingLoader'
import EventForm from '../components/EventForm'
import { updateEvent } from '../actions/updateEventAction'
import moment from 'moment'
import momentTZ from 'moment-timezone'

export class EditEventPage extends Component {
  state = { event: null }

  componentDidMount () {
    const path = this.props.location.pathname
    this.props.setLastLocation(path)
    if (!this.props.cookies.get(process.env.SESSION || 'WebsiteOne_session') && !this.props.loggedInUser.data) {
      this.props.history.push({ pathname: '/login' })
    }
    if (!this.props.projects.length) {
      this.props.fetchActiveProjects()
      this.props.fetchEventInfo(this.props.match.params.slug)
    }
  }

  componentDidUpdate (prevprops) {
    if (this.props.eventInfo.slug && !this.state.slug) {
      this.setState({
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
        repeatEnds: '',
        ...this.props.eventInfo
      })
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
  handleSubmit= event => {
    event.preventDefault()
    const {
      slug,
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
      endDate } = this.state
    const startTime = moment(startDate).format('h:mm a')
    const startDateFormatted = moment(startDate).format('YYYYMMDD')
    const weekdaysLowerCase = weekdays.map(day => day.toLowerCase())
    const { history, updateEvent } = this.props
    const headers = this.props.cookies.get(process.env.SESSION || 'WebsiteOne_session')
    updateEvent({
      slug,
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
    let { slug, projectId } = this.state
    return (
      slug == null
        ? <CustomRingLoader />
        : <Fragment>
          <Header as='h1' textAlign='center'>
          Creating a new Event
          </Header>
          <EventForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            projects={this.props.projects}
            projectId={projectId}
            {...this.state}
          />
        </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  eventInfo: state.eventInfo,
  projects: state.projects,
  cookies: ownProps.cookies,
  loggedInUser: state.loggedInUser
})

export default connect(
  mapStateToProps,
  { fetchActiveProjects, updateEvent, setLastLocation, fetchEventInfo }
)(EditEventPage)

// export default connect(
//   (state, ownProps) => {
//     return {
//       eventInfo: state.eventInfo,
//       projects: state.projects,
//       cookies: ownProps.cookies,
//       loggedInUser: store.loggedInUser
//     }
//   }
//   ,
//   (dispatch, ownProps) => {
//     let { slug } = ownProps.match.params
//     return {
//       fetchEventInfo: () => dispatch(fetchEventInfo(slug)),
//       updateEvent
//     }
//   }
// )(EditEventPage)
