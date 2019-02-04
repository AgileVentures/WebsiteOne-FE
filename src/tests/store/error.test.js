import store from '../../store'

describe('Store', () => {
  it('should update', async () => {
    await store.dispatch({
      type: 'FETCH_PROJECTS_FAILURE',
      message: 'Network Error'
    })

    expect(store.getState()).toEqual({
      users: [],
      projects: [],
      loggedInUser: {},
      signedUpUser: {},
      error: ['Network Error']
    })
  })
})
