import React from 'react'
import { mount } from 'enzyme'
import MembershipPlansPage from '../../containers/MembershipPlansPage'

describe('MembershipPlansPage', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<MembershipPlansPage />)
  })

  it('renders Membership Plans header when membersPlans state exists', async () => {
    wrapper.setState({ membershipPlansPage: '<h1 id="membership-plans">Membership Plans</h1>' })
    await expect(wrapper.html()).toContain('<h1 id="membership-plans">Membership Plans</h1>')
  })

  it('displays a spinner while fetching the static membership plans page', () => {
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })
})
