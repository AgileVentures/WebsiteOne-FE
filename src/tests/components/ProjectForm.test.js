import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ConnectedProjectForm, { ProjectForm } from '../../components/ProjectForm'

describe('ProjectForm', () => {
  const reducers = {
    form: formReducer
  }
  const reducer = combineReducers(reducers)
  const store = createStore(reducer)
  const props = {
    handleSubmit: jest.fn()
  }

  it('renders a form', () => {
    const wrapper = shallow(<ProjectForm {...props} />)
    expect(wrapper.find('Form')).toHaveLength(1)
  })

  it('calls onSubmit when the form is submitted', () => {
    const wrapper = shallow(<ProjectForm {...props} />)
    const form = wrapper.find('Form')
    form.simulate('submit')
    expect(props.handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('supports adding new repo fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedProjectForm />
      </Provider>
    )
    wrapper.find('.ui.button.field-group__add').first().simulate('click')
    expect(wrapper.find('Field[name="repos[0].value"]')).toHaveLength(2)
  })

  it('supports adding new tracker fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedProjectForm />
      </Provider>
    )
    wrapper.find('.ui.button.field-group__add').at(1).simulate('click')
    expect(wrapper.find('Field[name="trackers[0].value"]')).toHaveLength(2)
  })

  it('supports removing repo fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedProjectForm />
      </Provider>
    )
    wrapper.find('.ui.button.field-group__add').first().simulate('click')
    wrapper.find('.ui.button.field-group__remove').first().simulate('click')
    expect(wrapper.find('Field[name="repos[1].value"]')).toHaveLength(0)
  })

  it('supports removing tracker fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedProjectForm />
      </Provider>
    )
    wrapper.find('.ui.button.field-group__add').at(1).simulate('click')
    wrapper.find('.ui.button.field-group__remove').at(1).simulate('click')
    expect(wrapper.find('Field[name="trackers[1].value"]')).toHaveLength(0)
  })
})
