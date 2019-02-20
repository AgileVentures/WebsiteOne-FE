import React from 'react'
import { mount } from 'enzyme'
import PremiumMobMembershipPage from '../../containers/PremiumMobMembershipPage'
import moxios from 'moxios'

describe('PremiumMobMembershipPage', () => {
  let wrapper
  beforeEach(() => {
    moxios.install()
    wrapper = mount(<PremiumMobMembershipPage />)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches the premium mob static page after component mounts', done => {
    expect.assertions(1)
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request
        .respondWith({
          status: 200,
          response:
            '<a href="/subscriptions/new?plan=premiummob"><b><font color="#ffffff">Get Started with Premium Mob</font></b></a>'
        })
        .then(() => {
          expect(wrapper.html()).toContain(
            '<a href="/subscriptions/new?plan=premiummob"><b><font color="#ffffff">Get Started with Premium Mob</font></b></a>'
          )
          done()
        })
    })
  })

  it('displays a spinner while fetching the static membership plans page', () => {
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })
})
