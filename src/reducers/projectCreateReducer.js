import {
  CREATE_PROJECT
} from '../types'
import initialState from './initialState'
const projectCreateReducer = (state = initialState.projects, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return [...action.payload]
    default:
      return state
  }
}

export default projectCreateReducer
