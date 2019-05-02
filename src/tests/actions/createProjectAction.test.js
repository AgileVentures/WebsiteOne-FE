import moxios from 'moxios'
import { createProject } from '../../actions/createProjectAction'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { CREATE_PROJECT } from '../../types'
import newProject from '../../../cypress/fixtures/newlyCreatedProject'

describe.only('createProject', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  let store

  const props = {
    title: 'PairProgramming Rocks',
    description: 'Project all about pair programming',
    slack: 'new slack',
    status: 'Active',
    cookies: { get: jest.fn() },
    history: { push: jest.fn() }
  }
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it.only('posts project info to Rails backend and returns without error', async () => {
    const expectedActions = [{ type: CREATE_PROJECT, payload: newProject }]
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()

      Object.keys(props).forEach(key => {
        if (newProject.project[`${key}`]) {
          newProject.project[`${key}`] = props[`${key}`]
        }
      })
      request.resolve({ data: newProject })
    })
    await store.dispatch(createProject(props))
    const actionReturn = store.getActions()
    expect(actionReturn).toEqual(expectedActions)
  })

  it('dispatches an error if it is returned', () => {
    const error = new Error('Request failed with status code 500')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.reject(error)
    })

    return store.dispatch(createProject(props)).then(() => {
      expect(store.getActions()).toEqual([
        {
          message: 'Request failed with status code 500',
          type: 'CREATE_PROJECT_FAILURE'
        }
      ])
    })
  })

  it('calls method to push the user to the events info page', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({ data: newProject })
    })
    expect(props.history.push).toHaveBeenCalledTimes(1)
  })
})
