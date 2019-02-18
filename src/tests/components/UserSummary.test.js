import React from 'react'
import { mount } from 'enzyme'
import UserSummary from '../../components/UserSummary'
import { user } from '../../fixtures/userInfo'

describe('UserSummary', () => {
  let wrapper
  const props = {
    user
  }
  beforeEach(() => {
    wrapper = mount(<UserSummary {...props} />)
  })

  it("user's slug if there is no first_name", () => {
    user.first_name = null
    wrapper = mount(<UserSummary user={user} />)
    let userProfileName = wrapper.find('p').filterWhere(item => {
      return item.hasClass('user-profile-name')
    })
    expect(userProfileName.text()).toEqual(user.slug)
  })

  it("displays a user's github username", () => {
    user.github_profile_url = 'https://github.com/mattwr18'
    wrapper = mount(<UserSummary user={user} />)
    let userGithubUsername = wrapper.find('a').filterWhere(item => {
      return item.prop('href') === user.github_profile_url
    })
    expect(userGithubUsername.text()).toEqual('mattwr18')
  })

  it("trucates a user's email if it is longer than 23 characters", () => {
    user.email = 'somereallylongemailfortesting@truncate.com'
    wrapper = mount(<UserSummary user={user} />)
    let userEmail = wrapper.find('a').filterWhere(item => {
      return item.prop('href') === `mailto:${user.email}`
    })
    expect(userEmail.text()).toEqual('somereallylongemailfort...')
  })
})
