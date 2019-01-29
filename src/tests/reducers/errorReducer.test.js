import errorReducer from '../../reducers/errorReducer'
import { FETCH_PROJECTS_FAILURE } from '../../types'

describe('reduces error', () => {
  it('defaults to empty error if none are passed in', () => {
    expect(errorReducer(undefined, {})).toEqual([])
  })

  it('reduces error', () => {
    expect(
      errorReducer([], {
        type: FETCH_PROJECTS_FAILURE,
        message: 'Network Error'
      })
    ).toEqual(['Network Error'])
  })
})
