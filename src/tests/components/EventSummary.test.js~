import React from 'react'
import { mount } from 'enzyme'
import EventSummary from '../../components/EventSummary'
import event from '../../fixtures/eventInfo'

describe('EventSummary', () => {
  let wrapper
  const props = {
    event
  }
  beforeEach(() => {
    wrapper = mount(<EventSummary {...props} />)
  })

  it('it displays event name', () => {
    const eventName = wrapper.find('Header').filterWhere(item => {
      return item.prop('as') === 'h2'
    })
    expect(eventName.text()).toEqual(event.name)
  })

  it("displays an event's latest videos", () => {
    expect(wrapper.find('Embed')).toHaveLength(1)
  })

  it('displays a spinner when no event is in the props', () => {
    wrapper = mount(<EventSummary {...props} event={null} />)
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })
})
