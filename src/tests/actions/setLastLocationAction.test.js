import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { SET_LAST_LOCATION } from '../../types'
import { setLastLocation } from '../../actions/setLastLocationAction'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('setLastLocation action', () => {
  beforeEach(() => {
    store = mockStore({})
  })

  it('sets last location to /users', () => {
    let props = { location: { pathname: '/users' } }
    store.dispatch(setLastLocation(props))
    expect(store.getActions()).toEqual([{ type: SET_LAST_LOCATION, payload: '/users' }])
  })
})
