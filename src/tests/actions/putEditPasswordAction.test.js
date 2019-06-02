import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { putEditPassword } from '../../actions/putEditPasswordAction'
import { POST_LOGIN_INFO } from '../../types'
import logInResponse from '../../fixtures/logIn'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('putEditPassword action', () => {
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('posts new password to an external api', () => {
    const expectedActions = [{ type: POST_LOGIN_INFO, payload: logInResponse }]

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve(logInResponse)
    })

    return store
      .dispatch(
        putEditPassword({
          password: 'qwer12345',
          password_confirmation: 'qwer12345',
          reset_password_token: '8vCMoB568u2m-1AWGt55'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
