import axios from '../helpers/http'
import { POST_LOGIN_INFO } from '../types'

export let getUser = user => ({ type: POST_LOGIN_INFO, payload: user })

export let postLogInInfo = props => dispatch => {
  return axios({
    method: 'post',
    url: 'http://localhost:3000/users/sign_in',
    data: {
      user: {
        email: props.email,
        password: props.password
      }
    }
  }).then(response => {
    dispatch(getUser(response))
  })
}
