import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { postResetPassword } from '../../actions/postResetPasswordAction'
import { POST_RESET_PASSWORD } from '../../types'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('postResetPassword action', () => {
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('posts user email with password to reset to an external api', () => {
    const expectedActions = [{ type: POST_RESET_PASSWORD, payload: true }]

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({})
    })

    return store
      .dispatch(
        postResetPassword({ email: 'example@example.com' })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
