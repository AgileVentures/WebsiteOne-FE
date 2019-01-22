import { POST_SIGNUP_INFO } from '../types'
import initialState from './initialState'

const signedUpUserReducer = (state = initialState.signedUpUser, action) => {
  switch (action.type) {
    case POST_SIGNUP_INFO:
      return { ...action.payload }
    default:
      return state
  }
}

export default signedUpUserReducer
