import createProjectReducer from '../../reducers/createProjectReducer'
import { CREATE_PROJECT } from '../../types'

describe('createProjectReducer', () => {
  it('defaults to empty project is none is passed', () => {
    expect(createProjectReducer(undefined, {})).toEqual({})
  })

  it('reduces project info after receiving it', () => {
    expect(createProjectReducer({}, {
      type: CREATE_PROJECT,
      payload: { id: 1, title: 'test' }
    })).toEqual({ id: 1, title: 'test' })
  })
})
