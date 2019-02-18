import React from 'react'
import { mount } from 'enzyme'
import { UserProfile } from '../../containers/UserProfile'
import { user } from '../../fixtures/userInfo'

describe('UserProfile', () => {
  let wrapper
  const props = {
    match: { params: { id: 1 } },
    userId: user.id,
    user: { id: 2 },
    fetchUserInfo: jest.fn(),
    setLastLocation: () => {},
    location: { pathname: '/users/2' }
  }
  beforeEach(() => {
    wrapper = mount(<UserProfile {...props} />)
  })

  it('renders UserSummary', () => {
    expect(wrapper.find('UserSummary')).toBeTruthy()
  })

  it('calls fetchUserInfo if their user id is different from the user id in the url', () => {
    expect(props.fetchUserInfo).toHaveBeenCalledWith(props.match.params.id)
  })

  it('sets state if the user props are updated', () => {
    wrapper.setProps({ user })
    expect(wrapper.state().user).toEqual(user)
  })

  it('sets state if the user id is the same as in the url', () => {
    wrapper = mount(
      <UserProfile
        {...props}
        user={user}
      />
    )
    wrapper.update()
    expect(wrapper.state().user).toEqual(user)
  })
})
