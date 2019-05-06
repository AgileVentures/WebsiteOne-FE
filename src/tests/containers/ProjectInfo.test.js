import React from 'react'
import { shallow } from 'enzyme'
import { ProjectInfo } from '../../containers/ProjectInfo'

describe('ProjectInfo', () => {
  let wrapper
  const props = {
    match: { params: { slug: 'websiteone' } },
    project: {
      slug: 'rundfunk-mitbestimmen'
    },
    fetchProjectInfo: jest.fn(),
    setLastLocation: () => { },
    location: { pathname: '/projects/websiteone' }
  }
  beforeEach(() => {
    wrapper = shallow(<ProjectInfo {...props} />)
  })

  it('renders ProjectSummary', () => {
    expect(wrapper.find('ProjectSummary')).toBeTruthy()
  })

  it('calls fetchProjectInfo if the project slug is different from the project slug in the url', () => {
    expect(props.fetchProjectInfo).toHaveBeenLastCalledWith(props.match.params.slug)
  })
})
