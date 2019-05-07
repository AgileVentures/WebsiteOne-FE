import axios from 'axios'
import { GET_ACTIVE_PROJECTS, FETCH_PROJECTS_FAILURE } from '../types'

export let fetchActiveProjects = () => dispatch => {
  return axios.get('http://localhost:3000/api/v1/projects/active').then(response => {
    dispatch({ type: GET_ACTIVE_PROJECTS, payload: response.data })
  }).catch(error => {
    dispatch({
      type: FETCH_PROJECTS_FAILURE,
      message: error.message
    })
  })
}
