import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchActiveProjects } from '../actions/fetchActiveProjectsAction'
import EventForm from '../components/EventForm'

export class CreateEventPage extends Component {
  state = { activeProjects: null, startDate: new Date() }
  componentDidMount () {
    this.props.fetchActiveProjects()
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.projects !== nextProps.projects) {
      this.setState({ projects: nextProps.projects })
    }
  }
  handleSubmit = () => {
    console.log('here')
  }

  handleChange = date => {
    this.setState({ startDate: date })
  }

  render () {
    const { projects, startDate } = this.state
    return (
      <Container>
        <Header as='h1' textAlign='center'>
          Creating a new Event
        </Header>
        <EventForm
          onSubmit={this.handleSubmit}
          projects={projects || []}
          startDate={startDate}
          handleChange={this.handleChange}
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
