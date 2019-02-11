import axios from 'axios'
import { FETCH_PROJECTS_FAILURE } from '../types'

export default (cookies, dispatch) => event => {
  event.preventDefault()
  return axios({
    method: 'POST',
    timeout: 50000,
    url: '/paypal/new.json',
    data: {
      plan: 1
    },
    headers: {
      Authorization: cookies.get('_WebsiteOne_session')
    }
  })
    .then(response => window.location.assign(response.data.redirect_url))
    .catch(error => {
      dispatch({
        type: FETCH_PROJECTS_FAILURE,
        message: error.message
      })
    })
}
