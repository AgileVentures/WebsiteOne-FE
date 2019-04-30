import axios from 'axios'
import { CREATE_BILLING_AGREEMENT_FAILURE } from '../types'

export default (cookies, id, dispatch) => event => {
  event.preventDefault()
  return axios({
    method: 'POST',
    timeout: 30000,
    url: '/paypal/new.json',
    data: {
      plan: id
    },
    headers: {
      Authorization: cookies.get(process.env.SESSION || 'WebsiteOne_session')
    }
  })
    .then(response => window.location.assign(response.data.redirect_url))
    .catch(error => {
      dispatch({
        type: CREATE_BILLING_AGREEMENT_FAILURE,
        message: error.message
      })
    })
}
