import { GET_PROJECT_INFO } from '../types'
import initialState from './initialState'

const projectInfoReducer = (state = initialState.projectInfo, action) => {
  switch (action.type) {
    case GET_PROJECT_INFO:
      return { ...action.payload }
    default:
      return state
  }
}

export default projectInfoReducer
