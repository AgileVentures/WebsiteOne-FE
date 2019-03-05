import React from 'react'
import { mount } from 'enzyme'
import About from '../../containers/About'
import moxios from 'moxios'

describe('About', () => {
  let wrapper
  beforeEach(() => {
    moxios.install()
    wrapper = mount(<About />)
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches the About static page after component mounts', done => {
    expect.assertions(1)
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request
        .respondWith({
          status: 200,
          response:
            '<a href="/about"><b><font color="#ffffff">About-us</font></b></a>'
        })
        .then(() => {
          expect(wrapper.html()).toContain(
            '<a href="/about"><b><font color="#ffffff">About-us</font></b></a>'
          )
          done()
        })
    })
  })

  it('displays a spinner while fetching the static about page', () => {
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })
})
