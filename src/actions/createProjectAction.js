import axios from 'axios'
import {
  CREATE_PROJECT
} from '../types'
let getProject = project => ({
  type: CREATE_PROJECT,
  payload: project
})
export let createProject = props => dispatch => {
  const {
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
      Authorization: cookies.get('_WebsiteOne_session')
    }
  }).then(response => {
    dispatch(getProject)
  })
}
