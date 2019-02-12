import React from 'react'
import { mount } from 'enzyme'
import { Subscriptions } from '../../components/Subscriptions'

describe('Subscriptions', () => {
  let wrapper
  const props = {
    error: ['Network Error'],
    cookies: { get: () => {} },
    location: { pathname: 'subscriptions/new', search: '?plan=premium' },
    history: { push: jest.fn() },
    loggedInUser: { data: {} }
  }

  beforeEach(() => {
    wrapper = mount(<Subscriptions {...props} />)
  })

  it('should render ErrorBoundary', () => {
    expect(wrapper.find('ErrorBoundary').props().error).toBe(true)
  })
})
