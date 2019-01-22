import store from '../../store'

describe('Store', () => {
  it('should update after login', async () => {
    await store.dispatch({
      type: 'POST_LOGIN_INFO',
      payload: { id: 2, email: 'someEmail@example.com' }
    })

    expect(store.getState()).toEqual({
      loggedInUser: { id: 2, email: 'someEmail@example.com' },
      signedUpUser: {},
      users: []
    })
  })
})
