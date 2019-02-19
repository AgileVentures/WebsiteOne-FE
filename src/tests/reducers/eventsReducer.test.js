import eventsReducer from '../../reducers/eventsReducer'
import { GET_EVENTS } from '../../types'

describe('eventsReducer', () => {
  it('defaults to empty if none is passed in', () => {
    expect(eventsReducer(undefined, {})).toEqual([])
  })

  it('reduces events after receiving them', () => {
    expect(
      eventsReducer([], {
        type: GET_EVENTS,
        payload: [{ title: 'Pair programming event' }]
      })
    ).toEqual([{ title: 'Pair programming event' }])
  })
})
