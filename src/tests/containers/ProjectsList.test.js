import React from 'react'
import { mount, shallow } from 'enzyme'
import { StaticRouter } from 'react-router'
import { ProjectsList } from '../../containers/ProjectsList'
import projectsFixture from '../../fixtures/projects'

describe('ProjectsList', () => {
  let wrapper
  const context = {}

  wrapper = mount(
    <StaticRouter context={context}>
      <ProjectsList
        projects={projectsFixture}
        fetchProjects={() =>
          new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve('promise')
            }, 300)
          })
        }
      />
    </StaticRouter>
  )

  it('should have a header Volunteers Directory', () => {
    expect(wrapper.find('Header').text()).toBe('List of Projects')
  })

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
        <ProjectsList projects={[]} fetchProjects={() => {}} />
      </StaticRouter>
    )
    expect(wrapper.find('Project')).toHaveLength(0)
  })

  it('should test componentWillReceiveProps', () => {
    const wrapper = shallow(
      <ProjectsList projects={[]} fetchProjects={() => {}} />
    )
    wrapper.setProps({ projects: [{ id: 1, languages: [] }] })
    expect(wrapper.instance().state.projects).toEqual({
      '1': [{ id: 1, languages: [] }]
    })
  })
})
