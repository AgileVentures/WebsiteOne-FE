import store from '../../store'

describe('Store', () => {
  it('should update', async () => {
    await store.dispatch({
      type: 'GET_EVENT_INFO',
      payload: { id: 2, name: 'Mad Writer Event' }
    })
    expect(store.getState().eventInfo).toEqual({
      id: 2,
      name: 'Mad Writer Event'
    })
  })
})
