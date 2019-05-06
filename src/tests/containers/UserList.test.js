import React from 'react'
import { mount } from 'enzyme'
import { UsersList } from '../../containers/UsersList'
import usersFixture from '../../fixtures/users'
import { StaticRouter } from 'react-router'

describe('UsersList', () => {
  let wrapper, usersList, searchBox
  const context = {}
  wrapper = mount(
    <StaticRouter context={context}>
      <UsersList
        users={usersFixture}
        fetchUsers={() =>
          new Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve('promise')
            }, 300)
          })
        }
        setLastLocation={() => { }}
        location={{ pathname: '/users' }}
      />
    </StaticRouter>
  )
  usersList = wrapper.find('UsersList')
  searchBox = wrapper.find('Input')

  it('should have a header Volunteers Directory', () => {
    expect(wrapper.find('Header').text()).toBe('Volunteers Directory')
  })

  it('should have a Paginate component', () => {
    expect(wrapper.find('Paginate')).toHaveLength(1)
  })

  it('should have a PaginationLinks component', () => {
    expect(wrapper.find('PaginationLinks')).toHaveLength(1)
  })

  it('should have an Input search bar component', () => {
    expect(wrapper.find('Input')).toHaveLength(1)
  })

  it('should normalize users for pagination', () => {
    let users = usersList.instance().state.users

    expect(Object.keys(users).length).toEqual(3)
    expect(users[1]).toHaveLength(12)
    expect(users[3]).toHaveLength(2)
  })

  it('should call handlePageSelect when a pagination link is clicked', () => {
    let paginationLink2 = wrapper.find('span').filterWhere(item => {
      return item.text() === '2'
    })
    paginationLink2.simulate('click')

    expect(usersList.instance().state.selectedPage).toEqual(2)
    expect(usersList.instance().state.lastPage).toBe(false)
    expect(usersList.instance().state.firstPage).toBe(false)
  })

  it('should set lastPage to true when the selectedPage is the last', () => {
    let paginationLink2 = wrapper.find('span').filterWhere(item => {
      return item.text() === '3'
    })
    paginationLink2.simulate('click')

    expect(usersList.instance().state.lastPage).toBe(true)
  })

  it('should set firstPage to true when the selectedPage is the first', () => {
    let paginationLink2 = wrapper.find('span').filterWhere(item => {
      return item.text() === '1'
    })
    paginationLink2.simulate('click')

    expect(usersList.instance().state.firstPage).toBe(true)
  })

  it('should limit the users list after query is entered in search box', () => {
    expect(usersList.instance().state.users[1]).toHaveLength(12)

    // For some reason `searchBox.simulate('change', ...)` was not
    // triggering the event.
    searchBox.props().onChange({ target: { value: 'gordon' } })

    expect(usersList.instance().state.users[1]).toHaveLength(1)
    expect(usersList.instance().state.users[1][0].first_name).toEqual('Gordon')

    searchBox.props().onChange({ target: { value: '' } })
  })

  it('should show no users if query in search box does not match any entry', () => {
    expect(usersList.instance().state.users[1]).toHaveLength(12)

    searchBox.props().onChange({ target: { value: 'blablabla' } })

    expect(usersList.instance().state.users[1]).toBeUndefined()

    let resultColumns = wrapper.find('CardGroup')
    expect(resultColumns.text()).toEqual('No users found.')

    searchBox.props().onChange({ target: { value: '' } })
  })

  it("shouldn't render a Project component without users", () => {
    const wrapper = mount(
      <StaticRouter context={context}>
        <UsersList users={[]} fetchUsers={() => { }} setLastLocation={() => { }} location={{ pathname: '/users' }} />
      </StaticRouter>
    )
    expect(wrapper.find('User')).toHaveLength(0)
  })
})
