import { FETCH_PROJECTS_FAILURE } from '../types'
import initialState from './initialState'

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_FAILURE:
      return [ action.message ]
    default:
      return state
  }
}

export default errorReducer
