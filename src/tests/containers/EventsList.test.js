import React from 'react'
import { mount } from 'enzyme'
import { EventsList } from '../../containers/EventsList'

describe('Events List', () => {
  let wrapper
  const props = {
    events: [],
    fetchEvents: jest.fn()
  }
  beforeEach(() => {
    wrapper = mount(<EventsList {...props} />)
  })

  it('calls fetchEvents when eventsList is empty', () => {
    expect(props.fetchEvents).toBeCalledTimes(1)
  })

  it('displays a calendar for events', () => {
    expect(wrapper.find('Calendar')).toHaveLength(1)
  })
})
