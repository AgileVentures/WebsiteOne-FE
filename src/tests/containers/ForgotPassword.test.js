import React from 'react'
import { ForgotPassword } from '../../containers/ForgotPassword'
import { mount } from 'enzyme'

describe('ForgotPassword', () => {
  describe('Simple component', () => {
    let wrapper = mount(
      <ForgotPassword postResetPassword={jest.fn(() => Promise.resolve({}))} />
    )

    const emailInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'email'
    })

    const submitForm = wrapper.find('Form')

    it('should have a Form', () => {
      expect(wrapper.find('Form')).toHaveLength(1)
    })

    it('should update the state when email input value changes', () => {
      emailInput.simulate('change', {
        target: { value: 'existing-user@example.com' }
      })
      expect(wrapper.state().email).toBe('existing-user@example.com')
    })

    it('should call handleSubmit and postResetPassword when the form is submitted', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
      wrapper.instance().forceUpdate()

      emailInput.simulate('change', {
        target: { value: 'existing-user@example.com' }
      })

      submitForm.simulate('submit')

      expect(spy).toHaveBeenCalledTimes(1)
      await expect(wrapper.instance().props.postResetPassword).toBeCalledTimes(1)
    })
  })

  describe('Component with all props', () => {
    let wrapper
    const { assign } = window.location
    const user = {
      id: 1,
      email: 'existing-user@example.com',
      password: 'password'
    }
    const props = {
      history: { push: jest.fn() },
      postResetPassword: jest.fn(
        resetPasswordInfo =>
          new Promise((resolve, reject) => {
            if (
              user.email === resetPasswordInfo.email
            ) {
              resolve(user)
            } else {
              reject(new Error('Email is not registered.'))
            }
          })
      )
    }
    beforeEach(() => {
      wrapper = mount(<ForgotPassword {...props} />)
      Object.defineProperty(window.location, 'assign', {
        configurable: true
      })
      window.location.assign = jest.fn()
    })

    afterEach(() => {
      window.location.assign = assign
    })

    it('redirects to login page', async () => {
      expect.assertions(1)
      const emailInput = wrapper.find('input').filterWhere(item => {
        return item.prop('name') === 'email'
      })
      emailInput.simulate('change', {
        target: { value: 'existing-user@example.com' }
      })

      const submitForm = wrapper.find('Form')
      submitForm.simulate('submit')
      await props
        .postResetPassword({
          email: 'existing-user@example.com'
        })
        .then(() => {
          expect(props.history.push).toHaveBeenCalledWith('/login')
        })
    })
  })
})
