import React from 'react'
import { mount } from 'enzyme'
import { PayPalSuccess } from '../../components/PayPalSuccess'

describe('PayPalSuccess', () => {
  let wrapper
  const props = {
    cookies: { get: () => {} },
    location: { search: '?plan=premium' }
  }
  beforeEach(() => {
    wrapper = mount(<PayPalSuccess {...props} />)
  })

  it('renders a success segment', () => {
    wrapper.setProps({ location: { search: '?plan=premiummob' } })
    expect(wrapper.find('Segment')).toBeTruthy()
  })
})
