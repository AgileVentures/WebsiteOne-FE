import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ProjectForm from '../components/ProjectForm'
import { createProject } from '../actions/createProjectAction'
export class CreateProjectPage extends Component {
  state = {
    title: '',
    description: '',
    status: 'Active'
  }

  handleChange = (e, { name, value }) => { this.setState({ [name]: value }) }

  handleSubmit = event => {
    const { title, description, status } = this.state
    const { createProject, history, cookies } = this.props
    event.preventDefault()
    createProject({
      title,
      description,
      status,
      cookies,
      history
    })
  }

  render () {
    let { title, description, status } = this.state
    return (
      <Container >
        <Header as='h1'
          textAlign='center' > Creating a new Project </Header>
        <ProjectForm
          handleSubmit={this.handleSubmit}
          onChange={this.handleChange}
          title={title}
          description={description}
          status={status}
          cookies={this.props.cookies}
        />
      </Container >
    )
  }
}
const mapStateToProps = (store, ownProps) => ({
  cookies: ownProps.cookies
})
export default connect(
  mapStateToProps, {
    createProject
  }
)(CreateProjectPage)

