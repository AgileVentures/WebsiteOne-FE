import React from 'react'
import { shallow } from 'enzyme'
import SingleFieldForm from '../../components/SingleFieldForm'

describe('SingleFieldForm', () => {
  const mockSubmit = jest.fn()
  const mockChange = jest.fn()
  const props = {
    label: 'testLabel',
    placeholder: 'Test Placeholder',
    name: 'test',
    value: 'initial value',
    handleSubmit: mockSubmit,
    handleChange: mockChange,
    error: true
  }
  const wrapper = shallow(<SingleFieldForm {...props} />)

  it('should have a Form', () => {
    expect(wrapper.find('Form')).toHaveLength(1)
  })

  it('should have a FormInput', () => {
    expect(wrapper.find('FormInput')).toHaveLength(1)
  })

  it('should have the correct label for the FormInput', () => {
    expect(wrapper.find(`FormInput[label="${props.label}"]`)).toHaveLength(1)
  })

  it('should have the correct name for the FormInput', () => {
    expect(wrapper.find(`FormInput[name="${props.name}"]`)).toHaveLength(1)
  })

  it('should have the correct value for the FormInput', () => {
    expect(wrapper.find(`FormInput[value="${props.value}"]`)).toHaveLength(1)
  })

  it('should show an error on the FormInput', () => {
    expect(wrapper.find(`FormInput[error=true]`)).toHaveLength(1)
  })

  it('should have a Button', () => {
    expect(wrapper.find('Button')).toHaveLength(1)
  })

  it('should call handleSubmit when the form is submitted', () => {
    const submitForm = wrapper.find('Form')
    submitForm.simulate('submit')
    expect(mockSubmit.mock.calls.length).toBe(1)
  })

  it('should call handleSubmit when the form is submitted', () => {
    const formInput = wrapper.find('FormInput')
    formInput.simulate('change')
    expect(mockChange.mock.calls.length).toBe(1)
  })
})
