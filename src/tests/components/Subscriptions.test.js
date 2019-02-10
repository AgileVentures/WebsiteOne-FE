import React from 'react'
import { mount } from 'enzyme'
import { Subscriptions } from '../../components/Subscriptions'

describe('Subscriptions', () => {
  let wrapper
  const props = {
    cookies: { get: () => {} },
    setLastLocation: jest.fn(),
    location: { pathname: 'subscriptions/new', search: '?plan=premium' },
    history: { push: jest.fn() },
    loggedInUser: { data: {} }
  }

  beforeEach(() => {
    wrapper = mount(<Subscriptions {...props} />)
  })

  it('should render PayPalAgreementNew', () => {
    expect(wrapper.find('PayPalAgreementNew')).toBeTruthy()
  })

  it('should call setLastLocation', () => {
    expect(props.setLastLocation).toHaveBeenCalledTimes(1)
  })
})
