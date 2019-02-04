import { SET_LAST_LOCATION } from '../types'
import initialState from './initialState'

const lastLocationReducer = (state = initialState.lastLocation, action) => {
  switch (action.type) {
    case SET_LAST_LOCATION:
      return action.payload
    default:
      return state
  }
}

export default lastLocationReducer
