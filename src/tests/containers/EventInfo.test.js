import React from 'react'
import { shallow } from 'enzyme'
import { EventInfo } from '../../containers/EventInfo'
import event from '../../fixtures/eventInfo'

describe('Event Info', () => {
  let wrapper
  const props = {
    match: { params: { slug: 'madwriter' } },
    event: {
      slug: 'weekendcollaboration'
    },
    fetchEventInfo: jest.fn(),
    setLastLocation: () => { },
    location: 'events/madwriter'
  }
  beforeEach(() => {
    wrapper = shallow(<EventInfo {...props} />)
  })

  it('renders event summary page', () => {
    expect(wrapper.find('EventSummary')).toBeTruthy()
  })

  it('calls fetchEventInfo if the event slug is different from the event slug in the url', () => {
    expect(props.fetchEventInfo).toHaveBeenLastCalledWith(props.match.params.slug)
  })
  it('sets state if the event slug is the same as in the url', () => {
    wrapper = shallow(<EventInfo {...props} event={event} />)
    expect(wrapper.state().event).toEqual(event)
  })
})
