import userInfoReducer from '../../reducers/userInfoReducer'
import { GET_USER_INFO } from '../../types'

describe('reduces users', () => {
  it('defaults to empty user info if none are passed in', () => {
    expect(userInfoReducer(undefined, {})).toEqual({})
  })

  it('reduces user info after getting it', () => {
    expect(
      userInfoReducer([], {
        type: GET_USER_INFO,
        payload: { id: 1, email: 'user@user.de' }
      })
    ).toEqual({ id: 1, email: 'user@user.de' })
  })
})
