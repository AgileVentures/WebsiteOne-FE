import axios from 'axios'
import {
  CREATE_PROJECT, CREATE_PROJECT_FAILURE
} from '../types'

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
      Authorization: cookies.get('_WebsiteOne_session'),
      Accept: 'application/json'
    }
  }).then(response => {
    dispatch({
      type: CREATE_PROJECT,
      payload: response.data
    })
    console.log('++++++')
    console.log(response)
  })
    .catch(error => {
      dispatch({
        type: CREATE_PROJECT_FAILURE,
        message: error.message
      })
    })
}