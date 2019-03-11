import axios from 'axios'
import { CREATE_STRIPE_SUBSCRIPTION_FAILURE } from '../types'

export default (cookies, email, id, dispatch, slug) => {
  return axios({
    method: 'POST',
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
        type: CREATE_STRIPE_SUBSCRIPTION_FAILURE,
        message: error.message
      })
    })
}
