import store from '../../store'

describe('Store', () => {
  it('should update', async () => {
    await store.dispatch({
      type: 'GET_USERS',
      payload: ['Run the tests']
    })

    expect(store.getState().users).toEqual(['Run the tests'])
  })
})
