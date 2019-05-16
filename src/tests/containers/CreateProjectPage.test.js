import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { CreateProjectPage } from '../../containers/CreateProjectPage'

describe('CreateProjectPage', () => {
  let wrapper
  const mockStore = configureStore()
  const store = mockStore()
  let props = {
    createProject: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <CreateProjectPage {...props} />
      </Provider>
    )
  })

  it('renders ProjectForm', () => {
    expect(wrapper.find('ProjectForm')).toHaveLength(1)
  })

  it('calls createProject when ProjectForm is filled out and submitted', () => {
    const titleInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'title'
    })
    const descriptionInput = wrapper.find('textarea').filterWhere(item => {
      return item.prop('name') === 'description'
    })
    const slackInput = wrapper.find('textarea').filterWhere(item => {
      return item.prop('name') === 'slack_channel_name'
    })
    const submitForm = wrapper.find('Form')
    titleInput.simulate('change', { target: { value: 'Predicted Title' } })
    descriptionInput.simulate('change', { target: { value: 'Happy description here' } })
    slackInput.simulate('change', { target: { value: 'slackInput' } })
    submitForm.simulate('submit')

    expect(props.createProject).toHaveBeenCalledTimes(1)
  })
})
