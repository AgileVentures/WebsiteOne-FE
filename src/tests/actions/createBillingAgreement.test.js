import moxios from 'moxios'
import billingAgreementResponse from '../../fixtures/billingAgreementResponse'
import createBillingAgreement from '../../actions/createBillingAgreement'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { CREATE_BILLING_AGREEMENT_FAILURE } from '../../types'

describe('createBillingAgreement action', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  let store
  const dispatch = jest.fn()
  const cookies = { get: jest.fn() }
  const event = { preventDefault: jest.fn() }
  const { assign } = window.location

  beforeEach(() => {
    moxios.install()
    Object.defineProperty(window.location, 'assign', {
      configurable: true
    })
    window.location.assign = jest.fn()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
    window.location.assign = assign
  })

  it('posts plan info to Rails backend and returns with redirect url', () => {
    moxios.stubRequest('/paypal/new.json', {
      status: 200,
      response: billingAgreementResponse
    })
    createBillingAgreement(cookies)(event)
    expect(billingAgreementResponse.data.redirect_url).toEqual(
      'https://www.sandbox.paypal.com/cgi-bin/webscr'
    )
  })

  it('calls window.location.assign to redirect to PayPal site', () => {
    moxios.stubRequest('/paypal/new.json', {
      status: 200,
      response: billingAgreementResponse
    })
    createBillingAgreement(cookies)(event).then(
      window.location.assign(billingAgreementResponse.data.redirect_url)
    )
    expect(window.location.assign).toHaveBeenCalledWith(billingAgreementResponse.data.redirect_url)
  })

  it('dispatches if an error is returned', async () => {
    expect.assertions(1)
    const error = new Error('Error: Request failed with status code 500')
    const errorMessage = {
      type: CREATE_BILLING_AGREEMENT_FAILURE,
      message: error.message
    }
    moxios.stubRequest('/paypal/new.json', {
      status: 500,
      response: { error }
    })

    store.dispatch(errorMessage)
    await createBillingAgreement(cookies, dispatch)(event).then(() => {
      expect(store.getActions()).toEqual([errorMessage])
    })
  })
})
