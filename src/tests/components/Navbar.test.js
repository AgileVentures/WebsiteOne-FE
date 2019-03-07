import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from '../../components/navbar/Navbar'

describe('Navbar', () => {
  let wrapper
  const props = {
    location: { pathname: '/users' },
    cookies: { get: jest.fn(), remove: jest.fn() }
  }

  beforeEach(() => {
    wrapper = mount(
      <Router>
        <Navbar {...props} />
      </Router>
    )
  })

  describe('renders the Navbar component', () => {
    it('renders without errors', () => {
      expect(wrapper.find('Navbar').length).toEqual(1)
    })

    it('renders 1 active Link element', () => {
      expect(wrapper.find('.active').find('Link').length).toEqual(1)
    })
  })

  describe('renders links based on if a user is signed in or not', () => {
    it('renders a login link if a user in not signed in', () => {
      const wrapper = mount(
        <Router>
          <Navbar {...props} />
        </Router>
      )
      const loginLink = wrapper.find('a').filterWhere(item => {
        return item.prop('href') === '/login'
      })
      expect(loginLink.text()).toEqual('Login')
    })

    it('renders a sign up link if a user in not signed in', () => {
      const wrapper = mount(
        <Router>
          <Navbar {...props} />
        </Router>
      )
      const loginLink = wrapper.find('a').filterWhere(item => {
        return item.prop('href') === '/signup'
      })
      expect(loginLink.text()).toEqual('Sign up')
    })

    it('renders a log out link when a user is signed in, which calls handleRemoveCookies function when clicked', () => {
      props.cookies.get.mockReturnValue(true)
      const wrapper = mount(
        <Router>
          <Navbar {...props} />
        </Router>
      )
      const logOutLink = wrapper.find('a').filterWhere(item => {
        return item.text() === 'Log out'
      })
      logOutLink.simulate('click')
      expect(props.cookies.remove).toHaveBeenCalledTimes(1)
    })
  })
})
