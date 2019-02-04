import React from 'react'
import ErrorBoundary from '../../components/ErrorBoundary'
import { mount } from 'enzyme'

describe('ErrorBoundary', () => {
  let wrapper = mount(<ErrorBoundary />)

  it('renders Header components', () => {
    expect(wrapper.find('Header')).toHaveLength(2)
  })
})
