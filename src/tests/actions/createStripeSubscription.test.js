import moxios from 'moxios'
import createStripeSubscription from '../../actions/createStripeSubscription'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { CREATE_STRIPE_SUBSCRIPTION_FAILURE } from '../../types'

describe('createStripeSubscription action', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  let store
  const cookies = { get: jest.fn() }
  const email = 'matt@example.org'
  const id = 'tok_test'
  const slug = 'premium'
  const dispatch = jest.fn()
  beforeEach(done => {
    moxios.install()
    store = mockStore({})
    done()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('posts stripe info to Rails backend and returns without error', async () => {
    expect.assertions(1)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({ data: { message: 'Success' } })
    })

    await createStripeSubscription(cookies, email, id, dispatch, slug).then(() => {
      expect(store.getActions()).toEqual([])
    })
  })

  it('dispatches if an error is returned', async () => {
    expect.assertions(1)
    const error = new Error('Error: Request failed with status code 500')
    const errorMessage = {
      type: CREATE_STRIPE_SUBSCRIPTION_FAILURE,
      message: error.message
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.reject(errorMessage)
    })

    store.dispatch(errorMessage)
    await createStripeSubscription(cookies, email, id, dispatch, slug).then(() => {
      expect(store.getActions()).toEqual([errorMessage])
    })
  })
})
