import { GET_EVENT_INFO } from '../types'
import initialState from './initialState'

const eventInfoReducer = (state = initialState.eventInfo, action) => {
  switch (action.type) {
    case GET_EVENT_INFO:
      return { ...action.payload }
    default:
      return state
  }
}

export default eventInfoReducer
