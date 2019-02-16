import axios from 'axios'
import { GET_PROJECT_INFO } from '../types'

export let fetchProjectInfo = id => dispatch => {
  return axios.get(`api/v1/projects/${id}`).then(response => {
    let { project } = response.data
    dispatch({ type: GET_PROJECT_INFO, payload: project })
  })
}
