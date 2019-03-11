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

<<<<<<< HEAD
    it('renders 8 MenuItem elements', () => {
      const wrapper = homepage(props)
      expect(wrapper.find('MenuItem').length).toEqual(8)
    })

    it('renders 8 Link elements', () => {
      const wrapper = homepage(props)
      expect(wrapper.find('Link').length).toEqual(8)
    })

=======
>>>>>>> b2e0e8c14d59d1a10bce0919758bf06f0f59fcd8
    it('renders 1 active Link element', () => {
      const wrapper = homepage(props)
      expect(wrapper.find('.active').find('Link').length).toEqual(1)
    })
  })
})
