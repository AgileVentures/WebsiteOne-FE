import React, { Component } from 'react'
import { Header, Container } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ProjectForm from '../components/ProjectForm'
import { editProject } from '../actions/editProjectAction'
import { fetchProjectInfo } from '../actions/getProjectInfoAction'
import { setLastLocation } from '../actions/setLastLocationAction'

export class EditProjectPage extends Component {
  componentDidMount () {
    // Set last path
    const path = this.props.location.pathname
    this.props.setLastLocation(path)

    // Check if user is login
    /*
    if (
      !this.props.cookies.get('WebsiteOne_session') &&
      !this.props.loggedInUser.data
    ) {
      this.props.history.push({
        pathname: '/login'
      })
    }
    */
    // Get Project info by slug
    this.props.fetchProjectInfo(this.props.match.params.slug)
  }

  handleSubmit = async values => {
    console.log(values)
    const { title, description, status } = values
    const { editProject, history, cookies, projectInfo } = this.props
    await editProject({
      id: projectInfo.id,
      title,
      description,
      status,
      cookies,
      history
    })
    history.push(`/projects/${this.props.match.params.slug}`)
  }

  render () {
    return (
      <Container>
        <Header as='h1' textAlign='center'>
          {' '}
          Edit Project{' '}
        </Header>
        <ProjectForm
          onSubmit={this.handleSubmit}
          cookies={this.props.cookies}
          initialValues={this.props.projectInfo}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cookies: ownProps.cookies,
  loggedInUser: state.loggedInUser,
  projectInfo: state.projectInfo
})
export default connect(
  mapStateToProps,
  {
    editProject,
    fetchProjectInfo,
    setLastLocation
  }
)(EditProjectPage)
