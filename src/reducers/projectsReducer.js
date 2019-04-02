import { GET_PROJECTS, GET_ACTIVE_PROJECTS } from '../types'
import initialState from './initialState'

const projectsReducer = (state = initialState.projects, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return [...action.payload]
    case GET_ACTIVE_PROJECTS:
      return [...action.payload]
    default:
      return state
  }
}

export default projectsReducer
