import React from 'react'
import { mount } from 'enzyme'
import GettingStartedPage2 from '../../containers/GettingStartedPage2'
import moxios from 'moxios'

describe('GettingStartedPage2', () => {
  let wrapper
  beforeEach(() => {
    moxios.install()
    wrapper = mount(<GettingStartedPage2 />)
  })
  afterEach(() => {
    moxios.uninstall()
  })
  it('fetches the getting started page after component mounts', done => {
    expect.assertions(1)
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      request
        .respondWith({
          status: 200,
          response: '<h1 id="getting-started-2-of-7">Getting Started 2 (of 7)</h1>'
        }).then(() => {
          expect(wrapper.html()).toContain('<h1 id="getting-started-2-of-7">Getting Started 2 (of 7)</h1>')
          done()
        })
    })
  })
  it('displays a spinner while fetching the getting started page', () => {
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })
})
