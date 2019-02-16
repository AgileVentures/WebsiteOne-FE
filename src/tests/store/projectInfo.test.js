import store from '../../store'

describe('Store', () => {
  it('should update', async () => {
    await store.dispatch({
      type: 'GET_PROJECT_INFO',
      payload: { id: 2, title: 'WebsiteOne' }
    })

    expect(store.getState().projectInfo).toEqual({
      id: 2,
      title: 'WebsiteOne'
    })
  })
})
