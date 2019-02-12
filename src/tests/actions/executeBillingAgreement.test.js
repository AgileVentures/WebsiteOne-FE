import moxios from 'moxios'
import { executedBillingAgreementResponse } from '../../fixtures/billingAgreementResponse'
import executeBillingAgreement from '../../actions/executeBillingAgreement'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { EXECUTE_BILLING_AGREEMENT_FAILURE } from '../../types'

describe('executeBillingAgreement helper', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  let store
  const cookies = { get: jest.fn() }
  const params = { plan: 'premium', token: 'valid_token' }
  const dispatch = jest.fn()
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('posts plan info to Rails backend and returns with redirect url', () => {
    moxios.stubRequest('/paypal/create.json', {
      status: 200,
      response: executedBillingAgreementResponse
    })
    executeBillingAgreement(cookies, params)
    expect(executedBillingAgreementResponse).toEqual({ data: { message: 'Success' } })
  })

  it('dispatches if an error is returned', () => {
    const error = new Error('Error: Request failed with status code 500')
    const errorMessage = {
      type: EXECUTE_BILLING_AGREEMENT_FAILURE,
      message: error
    }
    moxios.stubRequest('/paypal/create.json', {
      status: 500,
      response: { errorMessage }
    })
    store.dispatch(errorMessage)
    executeBillingAgreement(cookies, params, dispatch).then(() => {
      expect(store.getActions()).toEqual(errorMessage)
    })
  })
})
