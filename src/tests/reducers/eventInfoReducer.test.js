import eventInfoReducer from '../../reducers/eventInfoReducer'
import { GET_EVENT_INFO } from '../../types'

describe('reduces events', () => {
  it('defaults to empty event info if none are passed in', () => {
    expect(eventInfoReducer(undefined, {})).toEqual({})
  })

  it('reduces event info after getting it', () => {
    expect(
      eventInfoReducer({}, {
        type: GET_EVENT_INFO,
        payload: { id: 2528, name: 'Pairing on CS169 HW0 Ruby Intro' }
      })
    ).toEqual({ id: 2528, name: 'Pairing on CS169 HW0 Ruby Intro' })
  })
})
