import {
  FETCH_PROJECTS_FAILURE,
  CREATE_BILLING_AGREEMENT_FAILURE,
  EXECUTE_BILLING_AGREEMENT_FAILURE,
  CREATE_STRIPE_SUBSCRIPTION_FAILURE
} from '../types'
import initialState from './initialState'

const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_FAILURE:
      return [action.message]
    case CREATE_BILLING_AGREEMENT_FAILURE:
      return [action.message]
    case EXECUTE_BILLING_AGREEMENT_FAILURE:
      return [action.message]
    case CREATE_STRIPE_SUBSCRIPTION_FAILURE:
      return [action.message]
    default:
      return state
  }
}

export default errorReducer
