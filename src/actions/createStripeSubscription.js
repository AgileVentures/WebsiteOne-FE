import axios from 'axios'
<<<<<<< HEAD
import { CREATE_STRIPE_SUBSCRIPTION_FAILURE } from '../types'
=======
import { CREATE_BILLING_AGREEMENT_FAILURE } from '../types'
>>>>>>> Set up Stripe integration

export default (cookies, email, id, dispatch, slug) => {
  return axios({
    method: 'POST',
<<<<<<< HEAD
    url: '/subscriptions.json',
=======
    timeout: 30000,
    url: 'http://localhost:3000/subscriptions.json',
>>>>>>> Set up Stripe integration
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
<<<<<<< HEAD
        type: CREATE_STRIPE_SUBSCRIPTION_FAILURE,
=======
        type: CREATE_BILLING_AGREEMENT_FAILURE,
>>>>>>> Set up Stripe integration
        message: error.message
      })
    })
}
