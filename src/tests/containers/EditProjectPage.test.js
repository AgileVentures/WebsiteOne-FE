import React from 'react'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { EditProjectPage } from '../../containers/EditProjectPage'

describe('EditProjectPage', () => {
  let wrapper
  const mockStore = configureStore()
  const store = mockStore()
  let props = {
    createProject: jest.fn(),
    setLastLocation: jest.fn(),
    initialValues: {
      title: 'test',
      description: 'test project',
      status: 'Active'
    }
  }

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <EditProjectPage {...props} />
      </Provider>
    )
  })

  it('renders ProjectForm', () => {
    expect(wrapper.find('ProjectForm')).toHaveLength(1)
  })

  it('fills fields with existing project info', () => {
    const titleInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'title'
    })
    expect(titleInput.text()).toEqual('test')
  })

  it('calls createProject when ProjectForm is filled out and submitted', () => {
    const submitForm = wrapper.find('FORM')
    submitForm.simulate('submit')
    expect(props.createProject).toHaveBeenCalledWith(1)
  })
})
