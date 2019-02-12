import moxios from 'moxios'
import { executedBillingAgreementResponse } from '../../fixtures/billingAgreementResponse'
import executeBillingAgreement from '../../actions/executeBillingAgreement'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { EXECUTE_BILLING_AGREEMENT_FAILURE } from '../../types'

describe('executeBillingAgreement action', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  let store
  const cookies = { get: jest.fn() }
  const params = { plan: 'premium', token: '' }
  const dispatch = jest.fn()
  beforeEach(done => {
    moxios.install()
    store = mockStore({})
    done()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('posts plan info to Rails backend and returns with redirect url', async () => {
    expect.assertions(1)
    moxios.stubRequest('/paypal/create.json', {
      status: 200,
      response: executedBillingAgreementResponse
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve(executedBillingAgreementResponse)
    })

    await executeBillingAgreement(cookies, params, dispatch).then(() => {
      expect(executedBillingAgreementResponse).toEqual({
        data: { message: 'Success' }
      })
    })
  })

  it('dispatches if an error is returned', async () => {
    expect.assertions(1)
    const error = new Error('Error: Request failed with status code 500')
    const errorMessage = {
      type: EXECUTE_BILLING_AGREEMENT_FAILURE,
      message: error.message
    }

    moxios.stubRequest('/paypal/create.json', {
      status: 500,
      response: error.message
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.reject(errorMessage)
    })

    store.dispatch(errorMessage)
    await executeBillingAgreement(cookies, params, dispatch).then(() => {
      expect(store.getActions()).toEqual([errorMessage])
    })
  })
})
