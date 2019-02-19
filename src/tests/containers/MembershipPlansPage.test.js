import React from 'react'
import { mount } from 'enzyme'
import MembershipPlansPage from '../../containers/MembershipPlansPage'
import moxios from 'moxios'

describe('MembershipPlansPage', () => {
  let wrapper
  beforeEach(() => {
    moxios.install()
    wrapper = mount(<MembershipPlansPage />)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches the membership-plans static page after component mounts', done => {
    expect.assertions(1)
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: '<h1 id="membership-plans">Membership Plans</h1>'
      }).then(() => {
        expect(wrapper.html()).toContain('<h1 id="membership-plans">Membership Plans</h1>')
        done()
      })
    })
  })

  it('displays a spinner while fetching the static membership plans page', () => {
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })
})
