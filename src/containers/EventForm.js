import React, { Fragment, Component } from 'react'
import { Button, Form, Grid } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import moment from 'moment'
import momentTZ from 'moment-timezone'
import { connect } from 'react-redux'
import { fetchActiveProjects } from '../actions/fetchActiveProjectsAction'
import { createEvent } from '../actions/createEventAction'
import timezones from '../helpers/timezones'

import 'react-datepicker/dist/react-datepicker.css'

let projectOptions
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
const timeZonesOptions = timezones.map((timeZone, i) => {
  return { key: i, text: timeZone, value: timeZone }
})
// const benchmark = () => {
//   const startTime = new Date()
//   console.log(startTime)
//   momentTZ.tz.names().map(timeZone => {
//     return { key: timeZone, text: timeZone, value: timeZone }
//   })
//   const endTime = new Date()
//   console.log(endTime)
//   console.log(endTime - startTime)
// }
// benchmark()
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
    timezone: momentTZ.tz.guess(),
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
  // shouldComponentUpdate (nextState) {
  //   console.log('nextState', nextState, 'state', this.state)
  //   if (this.state.timezone !== nextState.timezone) {
  //     console.log('true')
  //     return true
  //   }
  //   console('im here')
  //   return true
  // }
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
    projectOptions = this.state.projects ? this.state.projects.map(project => {
      return { key: project.id, text: project.title, value: project.id }
    }) : []
    const {
      name,
      description,
      startDate,
      endDate,
      timezone,
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
        <Form.Select
          label='Category'
          name='category'
          options={categoryOptions}
          placeholder={categoryOptions[0].text}
          value={categoryOptions.value}
          onChange={this.handleChange}
        />
        <Form.Select
          label='For'
          name='eventFor'
          options={eventForOptions}
          placeholder={eventForOptions[0].text}
          value={eventForOptions.value}
          onChange={this.handleChange}
        />
        <Form.Select
          label='Project'
          name='project'
          options={projectOptions}
          placeholder={''}
          value={projectOptions.value}
          onChange={this.handleChange}
          search
        />
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
        <Form.Select
          options={timeZonesOptions}
          search
          name='timezone'
          value={timezone}
          onChange={this.handleChange}
          lazyLoad
        />
        <Form.Input
          label='Duration'
          name='duration'
          type='number'
          value={duration}
          onChange={this.handleChange}
        />
        <Form.Select
          label='Repeats'
          name='repeats'
          options={repeatsOptions}
          placeholder={repeatsOptions[0].text}
          value={repeatsOptions.value}
          onChange={this.handleChange}
        />
        {repeats && repeats !== 'never' ? (
          <Fragment>
            <Form.Select
              label='Each'
              name='weekdays'
              options={daysOfTheWeek}
              multiple
              onChange={this.handleChange}
            />
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
