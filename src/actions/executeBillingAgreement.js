import axios from 'axios'
import { FETCH_PROJECTS_FAILURE } from '../types'

export default (props, params) => {
  return axios({
    method: 'GET',
    timeout: 50000,
    url: '/paypal/create.json',
    params: {
      plan: params.plan,
      token: params.token
    },
    headers: {
      Authorization: props.cookies.get('_WebsiteOne_session')
    }
  })
    .catch(error => {
      props.dispatch({
        type: FETCH_PROJECTS_FAILURE,
        message: error.message
      })
    })
}
