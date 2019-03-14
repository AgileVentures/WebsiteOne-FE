import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchActiveProjects } from '../actions/fetchActiveProjectsAction'
import EventForm from '../components/EventForm'

export class CreateEventPage extends Component {
  state = {
    activeProjects: null,
    startDate: new Date(),
    endDate: new Date(),
    category: 'PairProgramming',
    eventFor: 'All',
    project: null,
    repeats: null,
    name: '',
    description: '',
    weekdays: [],
    repeatEnds: 'on'
  }
  componentDidMount () {
    this.props.fetchActiveProjects()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.projects !== nextProps.projects) {
      this.setState({ projects: nextProps.projects })
    }
  }

  handleSubmit = event => {
    console.log(event)
  }

  handleDateChange = date => {
    this.setState({ startDate: date })
  }

  handleChange = (e, { name, value }) => {
    console.log('name', name, 'value', value)
    this.setState({ [name]: value })
  }
  render () {
    const {
      projects,
      startDate,
      endDate,
      category,
      eventFor,
      project,
      repeats,
      name,
      description,
      weekdays,
      repeatEnds
    } = this.state
    return (
      <Container>
        <Header as='h1' textAlign='center'>
          Creating a new Event
        </Header>
        <EventForm
          onSubmit={this.handleSubmit}
          projects={projects || []}
          startDate={startDate}
          endDate={endDate}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          category={category}
          eventFor={eventFor}
          project={project}
          repeats={repeats}
          name={name}
          description={description}
          weekdays={weekdays}
          repeatEnds={repeatEnds}
        />
      </Container>
    )
  }
}
const mapStateToProps = store => ({
  projects: store.projects,
  error: store.error
})
export default connect(
  mapStateToProps,
  { fetchActiveProjects }
)(CreateEventPage)
