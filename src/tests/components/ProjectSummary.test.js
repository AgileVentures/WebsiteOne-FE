import React from 'react'
import { mount } from 'enzyme'
import ProjectSummary from '../../components/ProjectSummary'
import { StaticRouter } from 'react-router'
import project from '../../fixtures/projectInfo'

describe('ProjectSummary', () => {
  let wrapper
  const context = {}
  const props = {
    project
  }
  beforeEach(() => {
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary {...props} />
      </StaticRouter>
    )
  })

  it('displays a link to GitHub repo', () => {
    project.sourceRepositories[0].url = 'https://github.com/AgileVentures/WebsiteOne'
    let linkToRepo = wrapper.find('a').filterWhere(item => {
      return item.prop('href') === project.sourceRepositories[0].url
    })

    expect(linkToRepo.text()).toEqual('WebsiteOne')
  })

  it('handles repo urls with ending in forward slashes', () => {
    project.sourceRepositories[0].url = 'https://github.com/AgileVentures/WebsiteOne/'
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary {...props} />
      </StaticRouter>
    )
    let linkToRepo = wrapper.find('a').filterWhere(item => {
      return item.prop('href') === project.sourceRepositories[0].url
    })
    expect(linkToRepo.text()).toEqual('WebsiteOne')
  })

  it('displays a spinner when no project is in the props', () => {
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary />
      </StaticRouter>
    )
    expect(wrapper.find('Loader').props().loading).toBe(true)
  })

  it("displays a project's image if there is one", () => {
    project.image_url = 'http://i.imgur.com/23ePvyN.jpg'
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary {...props} />
      </StaticRouter>
    )
    let projectsImageUrl = wrapper.find('Image').filterWhere(item => {
      return item.hasClass('project-info-image')
    })
    expect(projectsImageUrl.props().src).toEqual(project.image_url)
  })

  it("displays a member's name if there is one", () => {
    project.members[0].first_name = 'Matt'
    project.members[0].last_name = 'Rider'
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary {...props} />
      </StaticRouter>
    )
    let linkToMember = wrapper.find('Link').filterWhere(item => {
      return item.prop('to') === '/users/2'
    })
    expect(linkToMember.text()).toEqual('Matt Rider')
  })

  it('displays card if there issues, source repositories, or a slack channel name', () => {
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary {...props} />
      </StaticRouter>
    )
    expect(wrapper.contains('Connected on')).toBe(true)
  })

  it('does not display card if there are no issues, source repositories, or a slack channel name', () => {
    project.pivotaltracker_url = null
    project.sourceRepositories = []
    project.slack_channel_name = null
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary {...props} />
      </StaticRouter>
    )
    expect(wrapper.contains('Connected on')).toBe(false)
  })

  it('displays card if there are members', () => {
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary {...props} />
      </StaticRouter>
    )
    expect(wrapper.contains('Members')).toBe(true)
  })

  it('does not display card if there are no members', () => {
    project.members = []
    wrapper = mount(
      <StaticRouter context={context}>
        <ProjectSummary {...props} />
      </StaticRouter>
    )
    expect(wrapper.contains('Members')).toBe(false)
  })
})
