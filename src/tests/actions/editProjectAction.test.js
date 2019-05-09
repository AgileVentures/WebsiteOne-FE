import moxios from 'moxios'
import { editProject } from '../../actions/editProjectAction'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { EDIT_PROJECT } from '../../types'
import newProject from '../../../cypress/fixtures/newlyCreatedProject'

describe('editProject', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  let store

  const props = {
    title: 'PairProgramming Rocks',
    description: 'Project all about pair programming',
    status: 'active',
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

  it('posts project info to Rails backend and returns without error', async () => {
    const expectedActions = [{ type: EDIT_PROJECT, payload: newProject }]
    expect.assertions(1)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({ data: newProject })
    })

    return store.dispatch(editProject(props)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatches an error if it is returned', () => {
    const error = new Error('Request failed with status code 500')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.reject(error)
    })

    return store.dispatch(editProject(props)).then(() => {
      expect(store.getActions()).toEqual([
        {
          message: 'Request failed with status code 500',
          type: 'EDIT_PROJECT_FAILURE'
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
