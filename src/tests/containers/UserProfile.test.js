import React from 'react'
import { mount } from 'enzyme'
import { UserProfile } from '../../containers/UserProfile'
import { user } from '../../fixtures/userInfo'

describe('UserProfile', () => {
  let wrapper
  const props = {
    match: { params: { id: 1 } },
    userId: user.id,
    user,
    fetchUserInfo: jest.fn(),
    setLastLocation: () => { },
    location: { pathname: '/users/2' }
  }

  it('renders UserSummary', () => {
    wrapper = mount(<UserProfile {...props} />)
    wrapper.update()
    expect(wrapper.find('UserSummary')).toBeTruthy()
  })

  it('calls fetchUserInfo if their user id is different from the user id in the url', () => {
    props.user.id = 2
    wrapper = mount(<UserProfile {...props} />)
    expect(props.fetchUserInfo).toHaveBeenCalledWith(props.match.params.id)
  })
})
