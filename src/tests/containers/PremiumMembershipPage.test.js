import React from 'react'
import { mount } from 'enzyme'
import PremiumMembershipPage from '../../containers/PremiumMembershipPage'
import moxios from 'moxios'

describe('PremiumMembershipPage', () => {
  let wrapper
  beforeEach(() => {
    moxios.install()
    wrapper = mount(<PremiumMembershipPage />)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches the premium static page after component mounts', done => {
    expect.assertions(1)
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: '<h1 id="premium-membership">Premium Membership</h1>'
      }).then(() => {
        expect(wrapper.html()).toContain('<h1 id="premium-membership">Premium Membership</h1>')
        done()
      })
    })
  })

  it('displays a spinner while fetching the static membership plans page', () => {
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })
})
