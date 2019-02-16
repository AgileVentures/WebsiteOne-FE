import projectInfoReducer from '../../reducers/projectInfoReducer'
import { GET_PROJECT_INFO } from '../../types'

describe('reduces user info', () => {
  it('defaults to empty project info if none are passed in', () => {
    expect(projectInfoReducer(undefined, {})).toEqual({})
  })

  it('reduces user info after receiving it', () => {
    expect(
      projectInfoReducer({}, {
        type: GET_PROJECT_INFO,
        payload: { id: 1, title: 'WebsiteOne' }
      })
    ).toEqual({ id: 1, title: 'WebsiteOne' })
  })
})
