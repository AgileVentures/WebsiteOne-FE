import axios from 'axios'
import {
  CREATE_PROJECT
} from '../types'

export let createProject = props => dispatch => {
  const {
    title,
    description,
    status,
    cookies
  } = props
  console.log('################')
  console.log(cookies.get('_WebsiteOne_session'))
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
    dispatch({
      type: CREATE_PROJECT,
      payload: response.data
    })
    console.log('++++++')
    console.log(response)
  })
}
