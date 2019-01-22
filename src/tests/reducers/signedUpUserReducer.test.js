import signedUpUserReducer from '../../reducers/signedUpUserReducer'
import { POST_SIGNUP_INFO } from '../../types'

describe('reduces a user', () => {
  it('defaults to empty projects if none are passed in', () => {
    expect(signedUpUserReducer(undefined, {})).toEqual({})
  })

  it('reduces the signed in user', () => {
    expect(
      signedUpUserReducer([], {
        type: POST_SIGNUP_INFO,
        payload: { id: 1, email: 'some.email@example.com' }
      })
    ).toEqual({ id: 1, email: 'some.email@example.com' })
  })
})
