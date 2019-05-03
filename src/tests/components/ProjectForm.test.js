import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import ConnectedProjectForm, { ProjectForm } from '../../components/ProjectForm'
import store from '../../store'

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

  it('adds new repo fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedProjectForm />
      </Provider>
    )
    wrapper.find('.ui.button.field-group__add').first().simulate('click')
    expect(wrapper.find('Field[name="repos[0].value"]').length).toBeTruthy()
    wrapper.find('.ui.button.field-group__add').first().simulate('click')
    expect(wrapper.find('Field[name="repos[1].value"]').length).toBeTruthy()
  })

  it('adds new tracker fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedProjectForm />
      </Provider>
    )
    wrapper.find('.ui.button.field-group__add').at(1).simulate('click')
    expect(wrapper.find('Field[name="trackers[0].value"]').length).toBeTruthy()
    wrapper.find('.ui.button.field-group__add').at(1).simulate('click')
    expect(wrapper.find('Field[name="trackers[1].value"]').length).toBeTruthy()
  })

  it('removes repo fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedProjectForm />
      </Provider>
    )
    wrapper.find('.ui.button.field-group__remove').first().simulate('click')
    console.log(wrapper.debug())
    expect(wrapper.find('Field[name="repos[1].value"]').length).toEqual(0)
  })

  it('removes tracker fields', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedProjectForm />
      </Provider>
    )
    wrapper.find('.ui.button.field-group__remove').at(2).simulate('click')
    console.log(wrapper.debug())
    expect(wrapper.find('Field[name="trackers[1].value"]').length).toEqual(0)
  })
})
