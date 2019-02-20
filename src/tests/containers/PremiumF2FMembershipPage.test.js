import React from 'react'
import { mount } from 'enzyme'
import PremiumF2FMembershipPage from '../../containers/PremiumF2FMembershipPage'
import moxios from 'moxios'

describe('PremiumF2FMembershipPage', () => {
  let wrapper
  beforeEach(() => {
    moxios.install()
    wrapper = mount(<PremiumF2FMembershipPage />)
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
            '<a href="/subscriptions/new?plan=premiumf2f"><b><font color="#ffffff">Get Started with Premium F2F</font></b></a>'
        })
        .then(() => {
          expect(wrapper.html()).toContain(
            '<a href="/subscriptions/new?plan=premiumf2f"><b><font color="#ffffff">Get Started with Premium F2F</font></b></a>'
          )
          done()
        })
    })
  })

  it('displays a spinner while fetching the static membership plans page', () => {
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })
})
