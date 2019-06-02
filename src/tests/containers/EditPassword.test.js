import React from 'react'
import { EditPassword } from '../../containers/EditPassword'
import { mount } from 'enzyme'

describe('EditPassword', () => {
  describe('Simple component', () => {
    let wrapper = mount(
      <EditPassword
        putEditPassword={jest.fn(() => Promise.resolve({}))}
        location='http://localhost:8080/users/password/edit?reset_password_token=HTNJbzdg1ksesqv3quwX'
      />
    )

    const passwordInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'password'
    })

    const passwordConfirmationInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'password_confirmation'
    })

    const submitForm = wrapper.find('Form')

    it('should have a Form', () => {
      expect(wrapper.find('Form')).toHaveLength(1)
    })

    it('should update the state when password input value changes', () => {
      passwordInput.simulate('change', {
        target: { value: 'asdf1234' }
      })
      expect(wrapper.state().password).toBe('asdf1234')
    })

    it('should update the state when password_confirmation input value changes', () => {
      passwordConfirmationInput.simulate('change', {
        target: { value: 'asdf1234' }
      })
      expect(wrapper.state().passwordConfirmation).toBe('asdf1234')
    })

    it('should call handleSubmit and putEditPassword when the form is submitted', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'handleSubmit')
      wrapper.instance().forceUpdate()

      passwordInput.simulate('change', {
        target: { value: 'asdf1234' }
      })

      passwordConfirmationInput.simulate('change', {
        target: { value: 'asdf1234' }
      })

      submitForm.simulate('submit')

      expect(spy).toHaveBeenCalledTimes(1)
      await expect(wrapper.instance().props.putEditPassword).toBeCalledTimes(1)
    })
  })

  describe('Component with all props', () => {
    let wrapper
    const { assign } = window.location
    const user = {
      id: 1,
      email: 'existing-user@example.com',
      password: 'password',
      reset_password_token: 'HTNJbzdg1ksesqv3quwX'
    }
    const props = {
      loggedInUser: {
        headers: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDYi'
        }
      },
      location: { search: 'reset_password_token=HTNJbzdg1ksesqv3quwX' },
      history: { push: jest.fn() },
      cookies: { set: jest.fn() },
      putEditPassword: jest.fn(
        (editInfo) =>
          new Promise((resolve, reject) => {
            if (
              editInfo.resetPasswordToken === user.reset_password_token
            ) {
              resolve(user)
            } else {
              reject(new Error('Something went wrong. Probably reset token is not valid.'))
            }
          })
      )
    }
    beforeEach(() => {
      Object.defineProperty(window.location, 'assign', {
        configurable: true
      })
      window.location.assign = jest.fn()
    })

    afterEach(() => {
      window.location.assign = assign
    })

    it('redirects to login page', async () => {
      expect.assertions(2)

      wrapper = mount(<EditPassword {...props} />)

      const passwordInput = wrapper.find('input').filterWhere(item => {
        return item.prop('name') === 'password'
      })
      passwordInput.simulate('change', {
        target: { value: 'asdf1234' }
      })

      const passwordConfirmationInput = wrapper.find('input').filterWhere(item => {
        return item.prop('name') === 'password_confirmation'
      })
      passwordConfirmationInput.simulate('change', {
        target: { value: 'asdf1234' }
      })

      const submitForm = wrapper.find('Form')
      submitForm.simulate('submit')
      await props
        .putEditPassword({
          password: 'asdf1234',
          passwordConfirmation: 'asdf1234',
          resetPasswordToken: 'HTNJbzdg1ksesqv3quwX'
        })
        .then(() => {
          expect(props.history.push).toHaveBeenCalledWith('/')
          expect(props.cookies.set).toHaveBeenCalledWith(
            'WebsiteOne_session',
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDYi',
            { path: '/' }
          )
        })
    })
  })
})
