import axios from 'axios'
import { CREATE_BILLING_AGREEMENT_FAILURE } from '../types'

export default (cookies, email, id, dispatch, slug) => {
  return axios({
    method: 'POST',
    timeout: 30000,
    url: '/subscriptions.json',
    data: {
      stripeEmail: email,
      stripeToken: id,
      plan: slug
    },
    headers: {
      Authorization: cookies.get('_WebsiteOne_session')
    }
  })
    .catch(error => {
      dispatch({
        type: CREATE_BILLING_AGREEMENT_FAILURE,
        message: error.message
      })
    })
}
