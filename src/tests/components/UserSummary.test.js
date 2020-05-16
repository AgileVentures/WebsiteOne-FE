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

  it('renders CustomRingLoader if user props is an empty object', () => {
    const props = {
      user: {}
    }
    wrapper = mount(<UserSummary {...props} />)
    expect(wrapper.find('CustomRingLoader')).toHaveLength(1)
  })

  it('shows user bio if Bio tab is clicked', () => {
    const menuTab = wrapper.find('MenuItem[name="Bio"]')
    menuTab.simulate('click')
    wrapper.update()
    expect(wrapper.contains(user.bio)).toEqual(true)
  })

  it('shows user projects if Projects tab is clicked', () => {
    const menuTab = wrapper.find('MenuItem[name="Projects"]')
    menuTab.simulate('click')
    wrapper.update()
    user.projects.forEach(project => {
      expect(wrapper.contains(project.title)).toEqual(true)
    })
  })

  it('shows user skills if Skills tab is clicked', () => {
    const menuTab = wrapper.find('MenuItem[name="Skills"]')
    menuTab.simulate('click')
    wrapper.update()
    user.skill_list.forEach(skill => {
      expect(wrapper.contains(skill)).toEqual(true)
    })
  })

  it('shows user contributions if Activity tab is clicked', () => {
    const menuTab = wrapper.find('MenuItem[name="Activity"]')
    menuTab.simulate('click')
    wrapper.update()
    user.projects.map(project => {
      return user.contributions.map(usersProject => {
        if (usersProject.project_id === project.id) {
          expect(wrapper.contains(usersProject.commit_count.toString())).toEqual(true)
          expect(wrapper.contains(project.title)).toEqual(true)
        }
      })
    })
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
