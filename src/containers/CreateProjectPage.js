import React, { Component } from 'react'
import {
  Header,
  Container
} from 'semantic-ui-react'
import {
  connect
} from 'react-redux'
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
  handleSubmit = () => {
    this.props.createProject({
      title: 'aaaa',
      description: 'bbbb'
      // this.state.title,
      // state.description
    })
  }
  render () {
    let {
      title
    } = this.state
    return (<Container >
      <Header as='h1'
        textAlign='center' > Creating a new Project </Header>
      <ProjectForm
        onSubmit={this.handleSubmit}
        onChange={this.handleChange}
        title={title}
      /> </Container >
    )
  }
}
const mapStateToProps = store => ({
  error: store.error
})
export default connect(
  mapStateToProps, {
    createProject
  }
)(CreateProjectPage)
