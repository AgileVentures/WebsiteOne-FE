import moxios from 'moxios'
import { executedBillingAgreementResponse } from '../../fixtures/billingAgreementResponse'
import executeBillingAgreement from '../../helpers/executeBillingAgreement'

describe('executeBillingAgreement helper', () => {
  const props = { cookies: { get: jest.fn() } }
  const params = { plan: 'premium', token: 'valid_token' }
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('posts plan info to Rails backend and returns with redirect url', () => {
    moxios.stubRequest('/paypal/create.json', {
      status: 200,
      response: executedBillingAgreementResponse
    })
    executeBillingAgreement(props, params)
    expect(executedBillingAgreementResponse).toEqual({ data: { message: 'Success' } })
  })
})
