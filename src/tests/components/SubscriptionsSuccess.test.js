import React from 'react'
import { mount } from 'enzyme'
import { SubscriptionsSuccess } from '../../components/SubscriptionsSuccess'

describe('SubscriptionsSuccess', () => {
  let wrapper
  const props = {
    cookies: { get: () => {} },
    location: { search: '?plan=premium' },
    error: ['Network Error'],
    dispatch: jest.fn()
  }
  beforeEach(() => {
    wrapper = mount(<SubscriptionsSuccess {...props} />)
  })

  it('renders a success segment', () => {
    wrapper.setProps({ error: [] })
    expect(wrapper.find('Segment')).toBeTruthy()
  })

  it('should render ErrorBoundary', () => {
    wrapper.setProps({ error: ['Network Error'] })
    expect(wrapper.find('ErrorBoundary').props().error).toBe(true)
  })
})
