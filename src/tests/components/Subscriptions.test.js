import React from 'react'
import { mount } from 'enzyme'
import { Subscriptions } from '../../components/Subscriptions'

describe('Subscriptions', () => {
  const props = {
    cookies: { get: () => {} },
    setLastLocation: jest.fn(),
    location: { pathname: 'subscriptions/new', search: '?plan=premium' },
    history: { push: jest.fn() },
    loggedInUser: { data: {} }
  }

  beforeEach(() => {
    mount(<Subscriptions {...props} />)
  })

  it('should call setLastLocation', () => {
    expect(props.setLastLocation).toHaveBeenCalledTimes(1)
  })
})
