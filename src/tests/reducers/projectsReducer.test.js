import projectsReducer from '../../reducers/projectsReducer'
import { GET_PROJECTS, GET_ACTIVE_PROJECTS } from '../../types'

describe('reduces projects', () => {
  it('defaults to empty projects if none are passed in', () => {
    expect(projectsReducer(undefined, {})).toEqual([])
  })

  it('reduces projects', () => {
    expect(
      projectsReducer([], {
        type: GET_PROJECTS,
        payload: [{ id: 1, title: 'Anvil' }]
      })
    ).toEqual([{ id: 1, title: 'Anvil' }])
  })

  it('reduces active projects', () => {
    expect(
      projectsReducer([], {
        type: GET_ACTIVE_PROJECTS,
        payload: [{ id: 1, title: 'Anvil', status: 'active' }]
      })
    ).toEqual([{ id: 1, title: 'Anvil', status: 'active' }])
  })
})
