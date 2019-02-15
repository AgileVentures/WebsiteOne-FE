import store from '../../store'

describe('Store', () => {
  it('should update', async () => {
    await store.dispatch({
      type: 'GET_USER_INFO',
      payload: { id: 2, email: 'someEmail@example.com' }
    })

    expect(store.getState().userInfo).toEqual({
      id: 2,
      email: 'someEmail@example.com'
    })
  })
})
