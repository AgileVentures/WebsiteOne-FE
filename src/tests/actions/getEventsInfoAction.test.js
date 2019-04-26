import moxios from 'moxios'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { fetchEventInfo } from '../../actions/getEventInfoAction'
import { GET_EVENT_INFO } from '../../types'
import eventInfoResponse from '../../fixtures/eventInfo'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
let store

describe('fetchEventInfo action', () => {
  beforeEach(() => {
    moxios.install()
    store = mockStore({})
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('fetches event info from an external api', async () => {
    const expectedActions = [
      { type: GET_EVENT_INFO, payload: eventInfoResponse }
    ]

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({
        data: { event: eventInfoResponse }
      })
    })

    await store.dispatch(fetchEventInfo()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

