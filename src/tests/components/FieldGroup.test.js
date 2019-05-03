import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import FieldGroup from '../../components/FieldGroup'
import ProjectForm from '../../components/ProjectForm'
import store from '../../store'

describe('FieldGroup', () => {
  const testFields = [
    {
      name: 'Test 1'
    },
    {
      name: 'Test 2'
    }
  ]
  const meta = { error: {}, submitFailed: false }
  const type = 'testType'
  const start = 'testStart'

  it('renders the component with no errors', () => {
    const wrapper = shallow(
      <FieldGroup fields={testFields} meta={meta} />
    )
    expect(wrapper.find('Field').length).toEqual(2)
  })

  it('renders the first field with the correct label', () => {
    const wrapper = shallow(
      <FieldGroup fields={testFields} meta={meta} type={type} start={start} />
    )
    expect(wrapper.find('Field').filterWhere(field => {
      return field.prop('label') === start + ' (primary)'
    }).length).toEqual(1)
  })

  it('renders the second field with the correct label', () => {
    const wrapper = shallow(
      <FieldGroup fields={testFields} meta={meta} type={type} start={start} />
    )
    expect(wrapper.find('Field').filterWhere(field => {
      return field.prop('label') === start + ' (2)'
    }).length).toEqual(1)
  })

  it('renders the first field with the correct name', () => {
    const wrapper = shallow(
      <FieldGroup fields={testFields} meta={meta} type={type} start={start} />
    )
    expect(wrapper.find('Field').filterWhere(field => {
      return field.prop('name') === `${type}s[0].value`
    }).length).toEqual(1)
  })

  it('renders the second field with the correct label', () => {
    const wrapper = shallow(
      <FieldGroup fields={testFields} meta={meta} type={type} start={start} />
    )
    expect(wrapper.find('Field').filterWhere(field => {
      return field.prop('label') === start + ' (2)'
    }).length).toEqual(1)
  })

  it('adds a field', () => {
    const mockAdd = jest.fn()
    const mockedFields = {
      push: mockAdd,
      map: (callback) => testFields.map((field, idx) => callback(field, idx))
    }
    const wrapper = shallow(
      <FieldGroup fields={mockedFields} meta={meta} />
    )
    const addButton = wrapper.find('.field-group__add').first()
    addButton.simulate('click')
    expect(mockAdd).toHaveBeenCalled()
  })

  it('creates an add button with the correct type', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ProjectForm />
      </Provider>
    )
    expect(wrapper.find('.ui.button.field-group__add').first().text()).toEqual('Add more repos')
  })

  it('removes a field', () => {
    const mockRemove = jest.fn()
    const mockedFields = {
      remove: mockRemove,
      map: (callback) => testFields.map((field, idx) => callback(field, idx))
    }
    const wrapper = shallow(
      <FieldGroup fields={mockedFields} meta={meta} />
    )
    const removeButton = wrapper.find('.field-group__remove').first()
    removeButton.simulate('click')
    expect(mockRemove).toHaveBeenCalled()
  })
})
