import axios from 'axios'
import { GET_PROJECTS, FETCH_PROJECTS_FAILURE } from '../types'
import '../assets/LogIn.scss'

export let getProjects = projects => ({
  type: GET_PROJECTS,
  payload: projects
})

export let fetchProjects = () => dispatch => {
  return axios.get('/api/v1/projects').then(response => {
    let { projects, languages, followers, documents } = response.data
    updateProjectsObject(projects, languages, followers, documents)
    dispatch(getProjects(projects))
  }).catch(error => {
    dispatch({
      type: FETCH_PROJECTS_FAILURE,
      message: error.message
    })
  })
}

let updateProjectsObject = (projects, languages, followers, documents) => {
  projects = projects.map(project => {
    project.languages =
      languages[project.title] &&
      languages[project.title].map(lang => lang.name)
    project.followers = followers[project.title]
    project.documents = documents[project.title]
    return project
  })
}
