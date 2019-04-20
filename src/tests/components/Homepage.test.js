import React from 'react'
import { mount } from 'enzyme'
import { Homepage } from '../../components/Homepage'

describe('Homepage', () => {
  const homepage = (props) => mount(<Homepage />)

  describe('renders the Homepage component', () => {
    it('renders without errors', () => {
      const wrapper = homepage()
      expect(wrapper.name()).toBe('Homepage')
    })

    it('renders 5 row elements', () => {
      const wrapper = homepage()
      expect(wrapper.find('.row')).toHaveLength(5)
    })
  })
})
