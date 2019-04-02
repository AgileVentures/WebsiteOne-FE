import React from 'react'
import { shallow, mount } from 'enzyme'
import { EventForm } from '../../containers/EventForm'
import { StaticRouter } from 'react-router'

describe('EventForm', () => {
  let wrapper
  const props = {
    location: { pathname: '/events/new' },
    setLastLocation: jest.fn(),
    cookies: { get: jest.fn() },
    history: { push: jest.fn() },
    projects: [],
    fetchActiveProjects: jest.fn(),
    loggedInUser: {},
    createEvent: jest.fn()
  }
  beforeEach(() => {
    wrapper = shallow(<EventForm {...props} />)
  })

  it('setsLastLocation with path', () => {
    expect(props.setLastLocation).toHaveBeenCalledWith(props.location.pathname)
  })

  it('redirects users to login if not logged in', () => {
    props.cookies.get.mockReturnValue(false)
    expect(props.history.push).toHaveBeenCalledWith({ pathname: '/login' })
  })

  it('sets state with projects if received from props', () => {
    const expected = [{ id: 3, name: 'Project1' }]
    props.projects = expected
    wrapper = shallow(<EventForm {...props} />)
    expect(wrapper.state().projects).toEqual(expected)
  })

  it('sets state when props are updated', () => {
    const expected = [{ id: 3, name: 'Project1' }]
    wrapper.setProps({ projects: expected })
    wrapper = shallow(<EventForm {...props} />)
    expect(wrapper.state().projects).toEqual(expected)
  })

  it('calls createEvent when the form in submitted', () => {
    const context = {}
    wrapper = mount(
      <StaticRouter context={context}>
        <EventForm {...props} />
      </StaticRouter>
    )

    const nameInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'name'
    })

    nameInput.simulate('change', {
      target: { value: 'NewEvent' }
    })

    const submitForm = wrapper.find('Form')
    submitForm.simulate('submit')

    expect(props.createEvent).toHaveBeenCalledTimes(1)
  })

  it('sets state when startDate is changed', () => {
    const startDateSelect = wrapper.find('DatePicker').filterWhere(item => {
      return item.prop('name') === 'startDate'
    })

    startDateSelect.simulate('change', new Date('04/05/2019'))

    expect(wrapper.state().startDate).toEqual(new Date('04/05/2019'))
  })

  it('sets state when endDate is changed', () => {
    const context = {}
    wrapper = mount(
      <StaticRouter context={context}>
        <EventForm {...props} />
      </StaticRouter>
    )
    const eventForm = wrapper.find('EventForm')
    eventForm.setState({ repeats: 'weekly', repeatEnds: 'on' })

    const weekdaysSelect = wrapper.find('Select').filterWhere(item => {
      return item.prop('name') === 'weekdays'
    })

    weekdaysSelect.simulate('change', ['Monday'])
    const endDateSelect = wrapper.find('DatePicker').filterWhere(item => {
      return item.prop('name') === 'endDate'
    })
    endDateSelect.props().onChange(new Date('2019-05-26'))

    expect(eventForm.state().endDate).toEqual(new Date('2019-05-26'))
  })
})
