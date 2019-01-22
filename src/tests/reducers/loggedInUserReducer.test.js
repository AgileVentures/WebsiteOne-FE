import loggedInUserReducer from '../../reducers/loggedInUserReducer'
import { POST_LOGIN_INFO } from '../../types'

describe('reduces a user', () => {
  it('defaults to empty projects if none are passed in', () => {
    expect(loggedInUserReducer(undefined, {})).toEqual({})
  })

  it('reduces the signed in user', () => {
    expect(
      loggedInUserReducer([], {
        type: POST_LOGIN_INFO,
        payload: { id: 1, email: 'some.email@example.com' }
      })
    ).toEqual({ id: 1, email: 'some.email@example.com' })
  })
})
