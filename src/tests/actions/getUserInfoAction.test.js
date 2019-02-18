import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { fetchUserInfo } from '../../actions/getUserInfoAction'
import { GET_USER_INFO } from '../../types'
import userInfoResponse from '../../fixtures/userInfo'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('fetchUserInfo action', () => {
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches user info from an external api', async () => {
    const expectedActions = [
      { type: GET_USER_INFO, payload: userInfoResponse }
    ]
    moxios.stubRequest('/api/v1/users/1', {
      status: 200
    })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({
        data: { user: userInfoResponse }
      })
    })

    await store.dispatch(fetchUserInfo()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
