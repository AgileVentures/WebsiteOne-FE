import errorReducer from '../../reducers/errorReducer'
import {
  FETCH_PROJECTS_FAILURE,
  CREATE_BILLING_AGREEMENT_FAILURE,
  EXECUTE_BILLING_AGREEMENT_FAILURE,
  CREATE_STRIPE_SUBSCRIPTION_FAILURE
} from '../../types'

describe('reduces error', () => {
  it('defaults to empty error if none are passed in', () => {
    expect(errorReducer(undefined, {})).toEqual([])
  })

  it('reduces error', () => {
    expect(
      errorReducer([], {
        type: FETCH_PROJECTS_FAILURE,
        message: 'Network Error'
      })
    ).toEqual(['Network Error'])
  })

  it('handles createBillingAgreemnt errors', () => {
    expect(
      errorReducer([], {
        type: CREATE_BILLING_AGREEMENT_FAILURE,
        message: 'Unauthorized'
      })
    ).toEqual(['Unauthorized'])
  })

  it('handles executeBillingAgreemnt errors', () => {
    expect(
      errorReducer([], {
        type: EXECUTE_BILLING_AGREEMENT_FAILURE,
        message: 'Not found'
      })
    ).toEqual(['Not found'])
  })

  it('handles createStripeSubscription errors', () => {
    expect(
      errorReducer([], {
        type: CREATE_STRIPE_SUBSCRIPTION_FAILURE,
        message: 'Not found'
      })
    ).toEqual(['Not found'])
  })
})
