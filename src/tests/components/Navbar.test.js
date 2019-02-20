import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from '../../components/navbar/Navbar'

describe('Navbar', () => {
  const props = { location: { pathname: '/users' } }
  const homepage = (props) => mount(<Router><Navbar {...props} /></Router>)

  describe('renders the Navbar component', () => {
    it('renders without errors', () => {
      const wrapper = homepage(props)
      expect(wrapper.find('Navbar').length).toEqual(1)
    })

    it('renders 6 MenuItem elements', () => {
      const wrapper = homepage(props)
      expect(wrapper.find('MenuItem').length).toEqual(6)
    })

    it('renders 6 Link elements', () => {
      const wrapper = homepage(props)
      expect(wrapper.find('Link').length).toEqual(6)
    })

    it('renders 1 active Link element', () => {
      const wrapper = homepage(props)
      expect(wrapper.find('.active').find('Link').length).toEqual(1)
    })
  })
})
