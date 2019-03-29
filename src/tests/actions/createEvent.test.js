import moxios from 'moxios'
import { createEvent } from '../../actions/createEventAction'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { GET_EVENT_INFO } from '../../types'
import createdEvent from '../../../cypress/fixtures/newlyCreatedEvent'

describe('createStripeSubscription action', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)
  let store
  const props = {
    cookies: { get: jest.fn() },
    history: { push: jest.fn() },
    name: 'NewEvent',
    category: 'Scrum',
    eventFor: 'All',
    startDate: new Date(),
    startDateFormatted: new Date(),
    startTime: '3:45 pm',
    project: null,
    description: '',
    timezones: 'America/Sao_Paulo',
    duration: 45,
    repeats: 'never',
    weekdaysLowerCase: null,
    repeatEnds: null,
    endDate: null
  }
  // const dispatch = jest.fn()
  beforeEach(done => {
    moxios.install()
    store = mockStore({})
    done()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('posts event info to Rails backend and returns without error', async () => {
    const expectedActions = [{ type: GET_EVENT_INFO, payload: createdEvent }]
    expect.assertions(1)
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.resolve({ data: createdEvent })
    })

    return store.dispatch(createEvent(props)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('dispatches an error if it is returned', () => {
    const error = new Error('Request failed with status code 500')

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.reject(error)
    })

    return store.dispatch(createEvent(props)).then(() => {
      expect(store.getActions()).toEqual([
        {
          message: 'Request failed with status code 500',
          type: 'CREATE_EVENT_FAILURE'
        }
      ])
    })
  })
})
