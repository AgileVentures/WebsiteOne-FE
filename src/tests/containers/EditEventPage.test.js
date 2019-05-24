import React from 'react'
import { shallow } from 'enzyme'
import { EditEventPage } from '../../containers/EditEventPage'
// import { StaticRouter } from 'react-router'
import eventInfo from '../../fixtures/eventInfo'

describe('EditEventPage', () => {
  // let wrapper
  const props = {
    match: { params: { slug: 'slug' } },
    fetchEventInfo: jest.fn(),
    updateEvent: jest.fn(),
    location: { pathname: '/events/slug/edit' },
    setLastLocation: jest.fn(),
    cookies: { get: jest.fn() },
    history: { push: jest.fn() },
    projects: [],
    fetchActiveProjects: jest.fn(),
    loggedInUser: {},
    handleStartDateChange: jest.fn(),
    eventInfo
  }
  beforeEach(() => {
    // wrapper = shallow(<EditEventPage {...props} />)
    shallow(<EditEventPage {...props} />)
  })
  it('setsLastLocation with path', () => {
    expect(props.setLastLocation).toHaveBeenCalledWith(props.location.pathname)
  })
  it('redirects users to login if not logged in', () => {
    props.cookies.get.mockReturnValue(false)
    expect(props.history.push).toHaveBeenCalledWith({ pathname: '/login' })
  })
  // it('sets state with projects if received from props', () => {
  //   const expected = [{ id: 3, name: 'Project1' }]
  //   props.projects = expected
  //   //used "mount" because it doesn't work with shallow
  //   wrapper = mount(<EditEventPage {...props} />)
  //   expect(wrapper.props().projects).toEqual(expected)
  // })
  // it('calls updateEvent when the form in submitted', () => {
  //   const context = {}
  //   wrapper = mount(
  //     <StaticRouter context={context}>
  //       <EditEventPage {...props} />
  //     </StaticRouter>
  //   )
  //   const nameInput = wrapper.find('input').filterWhere(item => {
  //     return item.prop('name') === 'name'
  //   })
  //   nameInput.simulate('change', {
  //     target: { value: 'NewEvent' }
  //   })

  //   const submitForm = wrapper.find('Form')
  //   submitForm.simulate('submit')

  //   expect(props.updateEvent).toHaveBeenCalledTimes(1)
  // })
})
