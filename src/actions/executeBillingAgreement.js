import axios from 'axios'
import { EXECUTE_BILLING_AGREEMENT_FAILURE } from '../types'

export default (cookies, params, dispatch) => {
  return axios({
    method: 'GET',
    timeout: 20000,
    url: '/paypal/create',
    params: {
      plan: params.plan,
      token: params.token
    },
    headers: {
      Authorization: cookies.get(process.env.SESSION || 'WebsiteOne_session')
    }
  })
    .catch(error => {
      dispatch({
        type: EXECUTE_BILLING_AGREEMENT_FAILURE,
        message: error.message
      })
    })
}
