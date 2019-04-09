import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ProjectForm from '../components/ProjectForm'
import { createProject } from '../actions/createProjectAction'
export class CreateProjectPage extends Component {
  state = {
    title: '',
    description: ''
  }

  handleChange = (e, {
    name,
    value
  }) => {
    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log('*******')
    console.log(this.props.cookies)
    this.props.createProject({
      title: this.state.title,
      description: this.state.description,
      status: 'active',
      cookies: this.props.cookies
    })
  }

  render () {
    let {
      title, description, status
    } = this.state
    return (
      <Container >
        <Header as='h1'
          textAlign='center' > Creating a new Project </Header>
        <ProjectForm
          onSubmit={this.handleSubmit}
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
