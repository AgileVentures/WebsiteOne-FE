import React from 'react'
import { shallow, mount } from 'enzyme'
import { CreateEventPage } from '../../containers/CreateEventPage'
import { StaticRouter } from 'react-router'

describe('CreateEventPage', () => {
  let wrapper
  const props = {
    location: { pathname: '/events/new' },
    setLastLocation: jest.fn(),
    cookies: { get: jest.fn() },
    history: { push: jest.fn() },
    projects: [],
    fetchActiveProjects: jest.fn(),
    loggedInUser: {},
    createEvent: jest.fn(),
    handleStartDateChange: jest.fn()
  }
  beforeEach(() => {
    wrapper = shallow(<CreateEventPage {...props} />)
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
    wrapper = shallow(<CreateEventPage {...props} />)
    expect(wrapper.state().projects).toEqual(expected)
  })

  it('sets state when props are updated', () => {
    const expected = [{ id: 3, name: 'Project1' }]
    wrapper.setProps({ projects: expected })
    wrapper = shallow(<CreateEventPage {...props} />)
    expect(wrapper.state().projects).toEqual(expected)
  })

  it('calls createEvent when the form in submitted', () => {
    const context = {}
    wrapper = mount(
      <StaticRouter context={context}>
        <CreateEventPage {...props} />
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
})
