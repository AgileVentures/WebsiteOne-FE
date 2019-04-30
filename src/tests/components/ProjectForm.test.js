import React from 'react'
import { shallow } from 'enzyme'
import { ProjectForm } from '../../components/ProjectForm'

describe('ProjectForm', () => {
  let wrapper
  let props = {
    handleSubmit: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<ProjectForm {...props} />)
  })

  it('renders a form', () => {
    expect(wrapper.find('Form')).toHaveLength(1)
  })

  it('calls onSubmit when the form is submitted', () => {
    const form = wrapper.find('Form')
    form.simulate('submit')
    expect(props.handleSubmit).toHaveBeenCalledTimes(1)
  })
})
