import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ProjectForm from '../components/ProjectForm'
import { createProject } from '../actions/createProjectAction'
import '../assets/CreateProjectPage.css'

export class CreateProjectPage extends Component {
  handleSubmit = values => {
    const { title, description, status } = values
    const { createProject, history, cookies } = this.props
    createProject({
      title,
      description,
      status,
      cookies,
      history
    })
  }

  render () {
    return (
      <Container >
        <Header as='h1'
          textAlign='center' > Creating a new Project </Header>
        <ProjectForm
          onSubmit={this.handleSubmit}
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
