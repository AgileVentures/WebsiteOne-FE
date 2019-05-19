import axios from '../helpers/http'
import { POST_RESET_PASSWORD } from '../types'

export let postResetPassword = props => dispatch => {
  return axios({
    method: 'post',
    url: '/users/password',
    data: {
      user: {
        email: props.email
      }
    },
    headers: {
      Accept: 'application/json'
    }
  }).then(response => {
    dispatch({ type: POST_RESET_PASSWORD, payload: true })
  })
}
