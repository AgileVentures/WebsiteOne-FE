import moxios from 'moxios'
import { fetchActiveProjects } from '../../actions/fetchActiveProjectsAction'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { GET_ACTIVE_PROJECTS } from '../../types'
import projectsResponse from '../../fixtures/projects.js'

describe('fetchActiveProjects action', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  let store
  beforeEach(done => {
    moxios.install()
    store = mockStore({})
    done()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches active projects from the back end', () => {
    const expectedActions = [{ type: GET_ACTIVE_PROJECTS, payload: projectsResponse }]
    expect.assertions(1)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({ data: projectsResponse })
    })

    return store.dispatch(fetchActiveProjects()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatches if an error is returned from fetch', () => {
    const error = new Error('Request failed with status code 500')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.reject(error)
    })

    return store.dispatch(fetchActiveProjects()).then(() => {
      expect(store.getActions()).toEqual([
        {
          message: 'Request failed with status code 500',
          type: 'FETCH_PROJECTS_FAILURE'
        }
      ])
    })
  })
})
