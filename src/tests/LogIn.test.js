import React from 'react'
import { LogIn } from '../containers/LogIn'
import { mount } from 'enzyme'

describe('LogIn', () => {
  let wrapper = mount(
    <LogIn postLogInInfo={jest.fn(() => Promise.resolve({}))} />
  )

  const emailInput = wrapper.find('input').filterWhere(item => {
    return item.prop('name') === 'email'
  })

  const passwordInput = wrapper.find('input').filterWhere(item => {
    return item.prop('name') === 'password'
  })

  it('should have a LogIn Header', () => {
    const mainHeader = wrapper.find('Header').filterWhere(item => {
      return item.text() === 'Log In'
    })
    expect(mainHeader).toHaveLength(1)
  })

  it('should have a Form', () => {
    expect(wrapper.find('Form')).toHaveLength(1)
  })

  it('should update the state when email input value changes', () => {
    emailInput.simulate('change', {
      target: { value: 'existing-user@example.com' }
    })
    expect(wrapper.state().email).toBe('existing-user@example.com')
  })

  it('should update the state when password input value changes', () => {
    passwordInput.simulate('change', {
      target: { value: 'password' }
    })
    expect(wrapper.state().password).toBe('password')
  })

  it('should call handleLogIn and postLogInInfo when the form is submitted', async () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleLogIn')
    wrapper.instance().forceUpdate()

    emailInput.simulate('change', {
      target: { value: 'existing-user@example.com' }
    })

    passwordInput.simulate('change', {
      target: { value: 'password' }
    })

    const submitForm = wrapper.find('Form')
    submitForm.simulate('submit')

    expect(spy).toHaveBeenCalledTimes(1)
    await expect(wrapper.instance().props.postLogInInfo).toBeCalledTimes(1)
  })
})
