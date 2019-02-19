import store from '../../store'

describe('Store', () => {
  it('should update', async () => {
    await store.dispatch({
      type: 'GET_EVENTS',
      payload: [{ title: 'Pair programming Redux' }]
    })

    expect(store.getState().events).toEqual([{ title: 'Pair programming Redux' }])
  })
})
