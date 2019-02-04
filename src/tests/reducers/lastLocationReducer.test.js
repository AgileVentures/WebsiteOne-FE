import lastLocationReducer from '../../reducers/lastLocationReducer'
import { SET_LAST_LOCATION } from '../../types'

describe('reduces a user', () => {
  it('defaults to empty projects if none are passed in', () => {
    expect(lastLocationReducer(undefined, {})).toEqual('')
  })

  it('reduces the signed in user', () => {
    expect(
      lastLocationReducer([], {
        type: SET_LAST_LOCATION,
        payload: { lastLocation: '/users' }
      })
    ).toEqual({ lastLocation: '/users' })
  })
})
