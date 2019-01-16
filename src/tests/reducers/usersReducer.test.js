import usersReducer from '../../reducers/usersReducer'
import { GET_USERS, POST_LOGIN_INFO } from '../../types'

describe('reduces users', () => {
  it('defaults to empty projects if none are passed in', () => {
    expect(usersReducer(undefined, {})).toEqual([])
  })

  it('reduces users after getting them', () => {
    expect(
      usersReducer([], {
        type: GET_USERS,
        payload: ['User to be added to store']
      })
    ).toEqual(['User to be added to store'])
  })

  it('reduces incoming user after successful login', () => {
    expect(
      usersReducer([], {
        type: POST_LOGIN_INFO,
        payload: ['User to be added to store']
      })
    ).toEqual(['User to be added to store'])
  })
})
