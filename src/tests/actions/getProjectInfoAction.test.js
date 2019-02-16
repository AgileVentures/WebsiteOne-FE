import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { fetchProjectInfo } from '../../actions/getProjectInfoAction'
import { GET_PROJECT_INFO } from '../../types'
import projectInfoResponse from '../../fixtures/projectInfo'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('fetchProjectInfo', () => {
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches project info from and external api', async () => {
    const expectedActions = [
      { type: GET_PROJECT_INFO, payload: projectInfoResponse }
    ]

    moxios.stubRequest('api/v1/projects/1', {
      status: 200
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({
        data: { project: projectInfoResponse }
      })
    })

    await store.dispatch(fetchProjectInfo()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
