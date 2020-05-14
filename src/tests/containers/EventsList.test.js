import React from 'react'
import { mount } from 'enzyme'
import { EventsList } from '../../containers/EventsList'
import eventsList from '../../fixtures/events'

describe('Events List', () => {
  let wrapper
  const props = {
    events: [],
    fetchEvents: jest.fn(),
    history: { push: jest.fn() }
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

  it('redirects to event info page when an event is selected in the calendar', () => {
    const { events } = eventsList
    wrapper = mount(<EventsList {...props} events={events} />)
    let eventToSelect = wrapper.find('div').filterWhere(item => {
      return item.hasClass('rbc-event-content')
    })
    eventToSelect.simulate('click')
    expect(props.history.push).toHaveBeenCalledWith(`/events/${events[0].slug}`)
  })
})
