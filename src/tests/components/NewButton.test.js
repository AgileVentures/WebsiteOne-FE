import React from 'react'
import { shallow } from 'enzyme'
import NewButton from '../../components/NewButton'

describe('<NewButton/>', () => {
  let wrapper
  const props = {
    href: '/events/new',
    content: 'New Event'
  }

  beforeEach(() => {
    wrapper = shallow(<NewButton {...props} />)
  })

  it("has an anchor tag that links to '/events/new'", () => {
    expect(wrapper.find('a').prop('href')).toEqual('/events/new')
  })
  it("has a popup with content 'New Event'", () => {
    expect(wrapper.find('Popup').prop('content')).toEqual('New Event')
  })
})
