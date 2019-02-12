import axios from 'axios'
import { EXECUTE_BILLING_AGREEMENT_FAILURE } from '../types'

export default (cookies, params, dispatch) => {
  console.log('cookies', cookies)
  console.log('params', params)
  console.log('dispatch', dispatch)
  return axios({
    method: 'GET',
    timeout: 50000,
    url: '/paypal/create.json',
    params: {
      plan: params.plan,
      token: params.token
    },
    headers: {
      Authorization: cookies.get('_WebsiteOne_session')
    }
  })
    .catch(error => {
      dispatch({
        type: EXECUTE_BILLING_AGREEMENT_FAILURE,
        message: error.message
      })
    })
}
