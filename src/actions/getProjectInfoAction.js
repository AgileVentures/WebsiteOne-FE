import axios from 'axios'
import { GET_PROJECT_INFO } from '../types'

export let fetchProjectInfo = slug => dispatch => {
  return axios.get(`api/v1/projects/${slug}`).then(response => {
    let {
      project,
      projectManager,
      sourceRepositories,
      members,
      membersGravatarUrl,
      videos
    } = response.data
    project.projectManager = projectManager
    project.sourceRepositories = sourceRepositories
    project.members = members
    project.membersGravatarUrl = membersGravatarUrl
    project.videos = videos
    dispatch({ type: GET_PROJECT_INFO, payload: project })
  })
}
