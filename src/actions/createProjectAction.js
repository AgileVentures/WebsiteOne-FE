import axios from 'axios'
import {
  CREATE_PROJECT, CREATE_PROJECT_FAILURE
} from '../types'

export let createProject = props => dispatch => {
  const {
    history,
    title,
    description,
    status,
    cookies
  } = props
  return axios({
    method: 'POST',
    url: '/projects',
    data: {
      project: {
        title,
        description,
        status
      }
    },
    headers: {
      Authorization: cookies.get(process.env.SESSION || 'WebsiteOne_session'),
      Accept: 'application/json'
    }
  }).then(response => {
    dispatch({
      type: CREATE_PROJECT,
      payload: response.data
    })
    history.push(`/projects/${response.data.project.slug}`)
  })
    .catch(error => {
      dispatch({
        type: CREATE_PROJECT_FAILURE,
        message: error.message
      })
    })
}
