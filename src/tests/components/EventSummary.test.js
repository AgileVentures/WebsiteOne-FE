import React from 'react'
import { mount } from 'enzyme'
import EventSummary from '../../components/EventSummary'
import SingleFieldForm from '../../components/SingleFieldForm'
import event from '../../fixtures/eventInfo'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

describe('EventSummary', () => {
  let wrapper
  const mockStore = configureStore()
  const store = mockStore()
  const props = {
    event,
    cookies: { get: value => true }
  }
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <EventSummary {...props} />
      </Provider>)
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
    wrapper = mount(<Provider store={store}>
      <EventSummary {...props} event={null} />
    </Provider>)
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })

  it('contains a SingleFieldForm component', () => {
    expect(wrapper.contains(SingleFieldForm)).toEqual(true)
  })
})
