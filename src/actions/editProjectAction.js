import axios from 'axios'
import { EDIT_PROJECT_FAILURE } from '../types'

export let editProject = props => dispatch => {
  const { id, title, description, status, cookies } = props
  return axios({
    method: 'PUT',
    url: `/projects/${id}`,
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
  }).catch(error => {
    dispatch({
      type: EDIT_PROJECT_FAILURE,
      message: error.message
    })
  })
}
