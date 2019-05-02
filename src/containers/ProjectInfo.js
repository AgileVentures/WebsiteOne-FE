import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProjectInfo } from '../actions/getProjectInfoAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Container } from 'semantic-ui-react'
import ProjectSummary from '../components/ProjectSummary'

export class ProjectInfo extends Component {
  componentDidMount () {
    const projectSlug = this.props.match.params.slug
    this.props.setLastLocation(this.props.location.pathname)
    if (this.props.project.slug === this.props.match.params.slug) {
      this.setState({ project: this.props.project })
    } else {
      this.props.fetchProjectInfo(projectSlug)
    }
  }

  render () {
    if (Object.entries(this.props.project).length > 0) {
      return (
        <Container className='project-info-container'>
          <ProjectSummary project={this.props.project} />
        </Container>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  projects: state.projects,
  project: state.projectInfo
})
export default connect(
  mapStateToProps,
  { fetchProjectInfo, setLastLocation }
)(ProjectInfo)
