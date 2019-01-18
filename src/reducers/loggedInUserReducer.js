import { POST_LOGIN_INFO } from '../types'
import initialState from './initialState'

const loggedInUserReducer = (state = initialState.loggedInUser, action) => {
  switch (action.type) {
    case POST_LOGIN_INFO:
      console.log('in')
      console.log(state)
      console.log('this is the reducer', [ ...action.payload ], typeof action.payload)
      return [ ...action.payload ]
    default:
      return state
  }
}

export default loggedInUserReducer
