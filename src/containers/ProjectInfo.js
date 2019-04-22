import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProjectInfo } from '../actions/getProjectInfoAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import { Container } from 'semantic-ui-react'
import ProjectSummary from '../components/ProjectSummary'

export class ProjectInfo extends Component {
  state = { project: null };

  componentDidMount () {
    const projectSlug = this.props.match.params.slug
    this.props.setLastLocation(this.props.location.pathname)
    if (this.props.project.slug === this.props.match.params.slug) {
      this.setState({ project: this.props.project })
    } else {
      this.props.fetchProjectInfo(projectSlug)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.project !== nextProps.project) {
      this.setState({ project: nextProps.project })
    }
  }

  render () {
    let { project } = this.state
    return (
      <Container className='project-info-container'>
        <ProjectSummary project={project} />
      </Container>
    )
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
