import React from 'react'
import { mount } from 'enzyme'
import User from '../../components/User'
import { StaticRouter } from 'react-router'
import usersFixture from '../../fixtures/users'

// mount User component
describe('User', () => {
  let wrapper
  const context = {}
  let user = usersFixture[0]

  beforeEach(() => {
    wrapper = mount(
      <StaticRouter context={context}>
        <User item={user} />
      </StaticRouter>
    )
  })

  it('should have an Image with an image url', () => {
    expect(wrapper.find('Image').prop('src')).toEqual(`${user.gravatar_url}`)
  })

  it("should have a CardHeader with the user's name", () => {
    expect(wrapper.find('CardHeader').text()).toEqual(
      user.first_name + ' ' + user.last_name
    )
  })

  it("should display a user's title if it exists", () => {
    expect(wrapper.find('CardDescription').text()).toEqual(
      user.title_list.toString() + ' '
    )
  })

  it("should display a user's slug if they don't have a name registered", () => {
    let user = usersFixture[1]
    wrapper = mount(
      <StaticRouter context={context}>
        <User item={user} />
      </StaticRouter>
    )
    expect(wrapper.find('CardHeader').text()).toEqual(user.slug)
  })

  it('should truncate long names', () => {
    user = usersFixture[2]
    wrapper = mount(
      <StaticRouter context={context}>
        <User item={user} />
      </StaticRouter>
    )
    expect(wrapper.find('CardHeader').text()).toEqual(
      (user.first_name + ' ' + user.last_name).substring(0, 10) + '...'
    )
  })
})
