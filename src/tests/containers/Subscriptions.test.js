import React from 'react'
import { mount } from 'enzyme'
import { Subscriptions } from '../../containers/Subscriptions'

describe('Subscriptions', () => {
  let wrapper
  const props = {
    error: ['Network Error'],
    cookies: { get: () => {} },
    location: { pathname: 'subscriptions/new', search: '?plan=premium' },
    history: { push: jest.fn() },
    loggedInUser: { data: {} },
    setLastLocation: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<Subscriptions {...props} />)
  })

  it('should render ErrorBoundary', () => {
    wrapper.setProps({ error: ['Network Error'] })
    expect(wrapper.find('ErrorBoundary').props().error).toBe(true)
  })

  it('shows premium mob info', () => {
    wrapper = mount(
      <Subscriptions
        error={[]}
        cookies={{ get: () => {} }}
        location={{ pathname: 'subscriptions/new', search: '?plan=premiummob' }}
        history={{ push: jest.fn() }}
        loggedInUser={{}}
        setLastLocation={jest.fn()}
      />
    )
    expect(wrapper.find('h1').text()).toEqual(
      'AgileVentures Premium Mob Membership'
    )
  })

  it('shows premium f2f info', () => {
    wrapper = mount(
      <Subscriptions
        error={[]}
        cookies={{ get: () => {} }}
        location={{ pathname: 'subscriptions/new', search: '?plan=premiumf2f' }}
        history={{ push: jest.fn() }}
        loggedInUser={{ data: {} }}
        setLastLocation={jest.fn()}
      />
    )
    expect(wrapper.find('h1').text()).toEqual(
      'AgileVentures Premium F2F Membership'
    )
  })
})
