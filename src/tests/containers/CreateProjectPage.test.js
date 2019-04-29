import React from 'react'
import { mount } from 'enzyme'
import { CreateProjectPage } from '../../containers/CreateProjectPage'

describe('CreateProjectPage', () => {
  let wrapper
  const props = {
    location: { pathname: '/projects/new' },
    setLastLocation: jest.fn(),
    cookies: { get: jest.fn() },
    history: { push: jest.fn() },
    loggedInUser: {},
    createProject: jest.fn()
  }

  beforeEach(() => {
    wrapper = mount(<CreateProjectPage {...props} />)
  })

  it('renders ProjectForm', () => {
    expect(wrapper.find('ProjectForm')).toHaveLength(1)
  })

  it("updates project title's state as a user types the title", () => {
    const titleInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'title'
    })
    const descriptionInput = wrapper.find('textarea').filterWhere(item => {
      return item.prop('name') === 'description'
    })
    const submitForm = wrapper.find('Form')
    titleInput.simulate('change', { target: { value: 'Predicted Title' } })
    descriptionInput.simulate('change', {
      target: { value: 'Happy description here' }
    })
    submitForm.simulate('submit')

    expect(props.createProject).toHaveBeenCalledTimes(1)
  })
})
