import moxios from 'moxios'
import billingAgreementResponse from '../../fixtures/billingAgreementResponse'
import createBillingAgreement from '../../helpers/createBillingAgreement'

describe('createBillingAgreement helper', () => {
  const cookies = { get: jest.fn() }
  const event = { preventDefault: jest.fn() }
  const { assign } = window.location
  beforeEach(() => {
    moxios.install()
    Object.defineProperty(window.location, 'assign', {
      configurable: true
    })
    window.location.assign = jest.fn()
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
    expect(window.location.assign).toHaveBeenCalled()
  })
})
