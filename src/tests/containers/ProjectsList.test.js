import React from 'react'
import { mount, shallow } from 'enzyme'
import { StaticRouter } from 'react-router'
import { ProjectsList } from '../../containers/ProjectsList'
import paginatedProjectsFixture from '../../fixtures/paginatedProjects'
import projectsFixture from '../../fixtures/projects'

describe('ProjectsList', () => {
  let e = { preventDefault: jest.fn() }
  let wrapper
  const context = {}
  const props = {
    projects: projectsFixture,
    fetchProjects: () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve('promise')
        }, 300)
      }),
    filteredProjectsList: null,
    error: false,
    setLastLocation: () => { },
    location: { pathname: '/projects' }
  }
  wrapper = mount(
    <StaticRouter context={context}>
      <ProjectsList {...props} />
    </StaticRouter>
  )

  it('should have a Paginate component', () => {
    expect(wrapper.find('Paginate')).toHaveLength(1)
  })

  it('should have a PaginationLinks component', () => {
    expect(wrapper.find('PaginationLinks')).toHaveLength(1)
  })

  it('should call handlePageSelect when a pagination link is clicked', () => {
    let paginationLink2 = wrapper.find('span').filterWhere(item => {
      return item.text() === '2'
    })

    paginationLink2.simulate('click')
    let projectsList = wrapper.find('ProjectsList')
    expect(projectsList.instance().state.selectedPage).toEqual(2)
    expect(projectsList.instance().state.lastPage).toBe(false)
    expect(projectsList.instance().state.firstPage).toBe(false)
  })

  it('should call handlePageSelect when projects are filtered', () => {
    const wrapper = shallow(
      <ProjectsList
        projects={paginatedProjectsFixture}
        fetchProjects={() => { }}
        setLastLocation={() => { }}
        location={{ pathname: '/projects' }}
      />
    )
    wrapper.setState(
      {
        selectedLanguage: { value: 'JavaScript' },
        projects: paginatedProjectsFixture
      },
      () => {
        wrapper.instance().handlePageSelect(2)(e)
      }
    )
    wrapper.instance().forceUpdate()
    expect(wrapper.instance().state.filteredProjectsList).toBe(
      paginatedProjectsFixture['JavaScript']['2']
    )
  })

  it('should set lastPage to true when the selectedPage is the last', () => {
    let paginationLink2 = wrapper.find('span').filterWhere(item => {
      return item.text() === '3'
    })
    paginationLink2.simulate('click')
    let projectsList = wrapper.find('ProjectsList')
    expect(projectsList.instance().state.lastPage).toBe(true)
  })

  it('should set firstPage to true when the selectedPage is the first', () => {
    let paginationLink2 = wrapper.find('span').filterWhere(item => {
      return item.text() === '1'
    })
    paginationLink2.simulate('click')
    let projectsList = wrapper.find('ProjectsList')
    expect(projectsList.instance().state.firstPage).toBe(true)
  })

  it("shouldn't render a Project component without projects", () => {
    const wrapper = mount(
      <StaticRouter context={context}>
        <ProjectsList
          projects={{ 1: [] }}
          fetchProjects={() => { }}
          setLastLocation={() => { }}
          location={{ pathname: '/projects' }}
        />
      </StaticRouter>
    )
    expect(wrapper.find('Project')).toHaveLength(0)
  })

  it('should call paginateProjects', () => {
    const wrapper = shallow(
      <ProjectsList
        projects={[]}
        fetchProjects={() => { }}
        setLastLocation={() => { }}
        location={{ pathname: '/projects' }}
      />
    )
    wrapper.setProps({ projects: projectsFixture })
    expect(wrapper.instance().state.projects).toEqual(paginatedProjectsFixture)
  })

  it('should filter projects', () => {
    const wrapper = shallow(<ProjectsList {...props} />)
    wrapper.instance().handleFilterProjects({ value: 'Ruby' })
    expect(wrapper.instance().state.filteredProjectsList).toEqual(
      paginatedProjectsFixture['Ruby']['1']
    )
  })

  it('should allow clearing of filteredProjects', () => {
    const wrapper = shallow(<ProjectsList {...props} />)
    wrapper.instance().handleFilterProjects(null)
    expect(wrapper.instance().state.filteredProjectsList).toEqual(null)
  })

  it('adds error to the state if fetchProjects fails', async () => {
    const wrapper = shallow(
      <ProjectsList
        projects={[]}
        error={[]}
        fetchProjects={() => { }}
        setLastLocation={() => { }}
        location={{ pathname: '/projects' }}
      />
    )
    await wrapper.instance().componentDidMount()
    expect(wrapper.state().error).toEqual(true)
  })
})
