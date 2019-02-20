import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { fetchEvents } from '../../actions/getEventsAction'
import { GET_EVENTS } from '../../types'
import eventsResponse from '../../fixtures/events'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('fetchEvents action', () => {
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches events from an external api', async (done) => {
    const expectedActions = [{ type: GET_EVENTS, payload: eventsResponse }]
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({ data: eventsResponse })
    })

    await store.dispatch(fetchEvents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      done()
    })
  })
})
