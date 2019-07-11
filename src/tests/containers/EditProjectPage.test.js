import React from 'react'
import { mount } from 'enzyme'
import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { EditProjectPage } from '../../containers/EditProjectPage'
import newProject from '../../../cypress/fixtures/newlyCreatedProject'

describe('EditProjectPage', () => {
  let wrapper
  const middlewares = [thunk]
  const mockStore = configureStore(middlewares)
  const store = mockStore()
  const props = {
    editProject: jest.fn(
      () =>
        new Promise((resolve, reject) => {
          resolve()
        })
    ),
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
    moxios.install()
    wrapper = mount(
      <Provider store={store}>
        <EditProjectPage {...props} />
      </Provider>
    )
  })

  afterEach(() => {
    moxios.uninstall()
    jest.clearAllMocks()
  })

  it('renders ProjectForm', () => {
    expect(wrapper.find('ProjectForm')).toHaveLength(1)
  })

  it('fetch existing project info', () => {
    expect(props.fetchProjectInfo).toHaveBeenCalledTimes(1)
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

  it('calls method to push the user to the project info page', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({ data: newProject })
    })
    expect(props.history.push).toHaveBeenCalledTimes(1)
  })
})
