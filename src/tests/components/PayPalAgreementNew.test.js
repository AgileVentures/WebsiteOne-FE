import React from 'react'
import { shallow } from 'enzyme'
import PayPalAgreementNew from '../../components/PayPalAgreementNew'

describe('PayPalAgreementNew', () => {
  let wrapper
  const props = {
    cookies: () => {},
    createBillingAgreement: jest.fn()
  }
  beforeEach(() => {
    wrapper = shallow(<PayPalAgreementNew {...props} />)
  })

  it('has a form to submit a new paypal agreement', () => {
    wrapper.find('form').simulate('submit')
    expect(props.createBillingAgreement).toHaveBeenCalled()
  })
})
