import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import ProjectForm from '../components/ProjectForm'

export default class CreateProjectPage extends Component {
  handleSubmit () {
    console.log('here')
  }
  render () {
    return (
      <Container>
        <Header as='h1' textAlign='center'>Creating a new Project</Header>
        <ProjectForm onSubmit={this.handleSubmit} />
      </Container>
    )
  }
}
