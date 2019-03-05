import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { postLogInInfo } from '../../actions/postLogInInfoAction'
import { POST_LOGIN_INFO } from '../../types'
import logInResponse from '../../fixtures/logIn'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('postLogInInfo action', () => {
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('posts login info to an external api', () => {
    const expectedActions = [{ type: POST_LOGIN_INFO, payload: logInResponse }]

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve(logInResponse)
    })

    return store
      .dispatch(
        postLogInInfo({ email: 'premium@premi.um', password: 'premium123' })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
