import { GET_USER_INFO } from '../types'
import initialState from './initialState'

const userInfoReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return { ...action.payload }
    default:
      return state
  }
}

export default userInfoReducer
