import React from 'react'
import { LogIn } from '../../containers/LogIn'
import { mount } from 'enzyme'

describe('LogIn', () => {
  const user = {
    id: 1,
    email: 'existing-user@example.com',
    password: 'password'
  }
  const props = {
    history: { push: jest.fn() },
    postLogInInfo: jest.fn(
      logInInfo =>
        new Promise((resolve, reject) => {
          if (
            user.email === logInInfo.email &&
            user.password === logInInfo.password
          ) {
            resolve(user)
          } else {
            reject(new Error('Username and/or Password do no match'))
          }
        })
    )
  }
  let wrapper = mount(<LogIn {...props} />)

  it('should call handleLogIn and postLogInInfo when the form is submitted', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleLogIn')
    wrapper.instance().forceUpdate()
    const emailInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'email'
    })

    const passwordInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'password'
    })

    emailInput.simulate('change', {
      target: { value: 'existing-user@example.com' }
    })

    passwordInput.simulate('change', {
      target: { value: 'password' }
    })

    const submitForm = wrapper.find('Form')
    submitForm.simulate('submit')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.instance().props.postLogInInfo).toBeCalledTimes(1)
  })

  it('returns the user if postLogInInfo is called with the correct credentials', async () => {
    expect.assertions(2)
    const loggingInUser = await wrapper.instance().props.postLogInInfo({
      email: 'existing-user@example.com',
      password: 'password'
    })
    expect(loggingInUser).toEqual(user)
    expect(wrapper.instance().props.history.push).toBeCalledTimes(1)
  })

  it('throws an error if postLogInInfo is called with incorrect credentials', async () => {
    expect.assertions(1)
    try {
      await wrapper.instance().props.postLogInInfo({ email: '', password: '' })
    } catch (e) {
      expect(e).toEqual(Error('Username and/or Password do no match'))
    }
  })
})
