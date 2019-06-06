import React from 'react'
import { shallow, mount } from 'enzyme'
import { EventInfo } from '../../containers/EventInfo'
import event from '../../fixtures/eventInfo'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

describe('Event Info', () => {
  let wrapper
  const mockStore = configureStore()
  const store = mockStore()
  const props = {
    match: { params: { slug: 'madwriter' } },
    event: {
      slug: 'weekendcollaboration'
    },
    cookies: { get: value => true },
    fetchEventInfo: jest.fn(),
    postEventLink: jest.fn(),
    setLastLocation: () => { },
    location: 'events/madwriter',
    form: {
      SingleFieldForm: {
        values: jest.fn()
      }
    }
  }
  beforeEach(() => {
    wrapper = shallow(<EventInfo {...props} />)
  })

  it('renders event summary page', () => {
    expect(wrapper.find('EventSummary')).toBeTruthy()
  })

  it('sets state if the event props are updated', () => {
    wrapper.setProps({ event })
    expect(wrapper.state().event).toEqual(event)
  })

  it('calls fetchEventInfo if the event slug is different from the event slug in the url', () => {
    expect(props.fetchEventInfo).toHaveBeenLastCalledWith(props.match.params.slug)
  })

  it('sets state if the event slug is the same as in the url', () => {
    wrapper = shallow(<EventInfo {...props} event={event} />)
    expect(wrapper.state().event).toEqual(event)
  })

  it('calls postEventLink when SingleFieldForm is submitted', () => {
    wrapper = mount(
      <Provider store={store}>
        <EventInfo {...props} event={event} />
      </Provider>)
    const singleFieldForm = wrapper.find('SingleFieldForm')
    const submitForm = singleFieldForm.find('Form')
    submitForm.simulate('submit')
    expect(props.postEventLink.mock.calls.length).toBe(1)
  })
})
