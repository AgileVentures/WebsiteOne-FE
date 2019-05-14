import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { EditProjectPage } from '../../containers/EditProjectPage'

describe('EditProjectPage', () => {
  let wrapper
  const mockStore = configureStore()
  const store = mockStore()
  const props = {
    editProject: jest.fn(),
    location: { pathname: '/projects/edit/:slug' },
    setLastLocation: jest.fn(),
    cookies: { get: jest.fn() },
    loggedInUser: {},
    history: { push: jest.fn() },
    fetchProjectInfo: jest.fn(),
    match: { params: {} },
    projectInfo: {
      id: {},
      title: {},
      description: {},
      status: {}
    }
  }

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <EditProjectPage {...props} />
      </Provider>
    )
  })

  it('renders ProjectForm', () => {
    expect(wrapper.find('ProjectForm')).toHaveLength(1)
  })

  it('fetch existing project info', () => {
    expect(props.fetchProjectInfo).toHaveBeenCalledTimes(2)
  })

  it('calls editProject when ProjectForm is filled out and submitted', () => {
    const titleInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'title'
    })
    const descriptionInput = wrapper.find('textarea').filterWhere(item => {
      return item.prop('name') === 'description'
    })
    const submitForm = wrapper.find('Form')
    titleInput.simulate('change', { target: { value: 'Predicted Title' } })
    descriptionInput.simulate('change', {
      target: { value: 'Happy description here' }
    })
    submitForm.simulate('submit')
    expect(props.editProject).toHaveBeenCalledTimes(1)
  })
})
