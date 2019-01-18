import { POST_LOGIN_INFO } from '../types'
import initialState from './initialState'

const loggedInUserReducer = (state = initialState.loggedInUser, action) => {
  switch (action.type) {
    case POST_LOGIN_INFO:
      return [ ...state, action.payload ]
    default:
      return state
  }
}

export default loggedInUserReducer
