import React from 'react'
import { shallow } from 'enzyme'
import { ProjectInfo } from '../../containers/ProjectInfo'
import project from '../../fixtures/projectInfo'

describe('ProjectInfo', () => {
  let wrapper
  const props = {
    match: { params: { slug: 'websiteone' } },
    project: {
      slug: 'rundfunk-mitbestimmen'
    },
    fetchProjectInfo: jest.fn(),
    setLastLocation: () => {},
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

  it('sets state if the project props are updated', () => {
    wrapper.setProps({ project })
    expect(wrapper.state().project).toEqual(project)
  })

  it('sets state if the project slug is the same as in the url', () => {
    wrapper = shallow(<ProjectInfo {...props} project={project} />)
    expect(wrapper.state().project).toEqual(project)
  })
})
