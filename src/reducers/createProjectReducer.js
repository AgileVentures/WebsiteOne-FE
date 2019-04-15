import { CREATE_PROJECT } from '../types'
import initialState from './initialState'

const createProjectReducer = (state = initialState.project, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return { ...action.payload }
    default:
      return state
  }
}

export default createProjectReducer
