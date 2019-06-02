import axios from '../helpers/http'
import { POST_LOGIN_INFO } from '../types'

export let getUser = user => ({ type: POST_LOGIN_INFO, payload: user })

export let putEditPassword = props => dispatch => {
  return axios({
    method: 'put',
    url: '/users/password',
    data: {
      user: {
        password: props.password,
        password_confirmation: props.passwordConfirmation,
        reset_password_token: props.resetPasswordToken
      }
    },
    headers: {
      Accept: 'application/json'
    }
  }).then(response => {
    dispatch(getUser(response))
  })
}
