import React from 'react'
import { SignUp } from '../../containers/SignUp'
import { mount } from 'enzyme'

describe('SignUp', () => {
  const existingUser = {
    id: 1,
    email: 'existing-user@example.com',
    password: 'password'
  }

  const newUser = {
    id: 2,
    email: 'new-user@example.com',
    password: 'password'
  }

  let wrapper
  let props
  beforeEach(() => {
    props = {
      history: { push: jest.fn() },
      postSignUpInfo: jest.fn(
        signUpInfo =>
          new Promise((resolve, reject) => {
            if (
              signUpInfo.email !== existingUser.email &&
              signUpInfo.password.length >= 8 &&
              signUpInfo.passwordConfirmation === signUpInfo.password
            ) {
              resolve(newUser)
            } else {
              reject(
                new Error('This email already has an account, please sign in')
              )
            }
          })
      )
    }
    wrapper = mount(<SignUp {...props} />)
  })

  it('should call handleSignUp and postSignUpInfo when the form is submitted', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSignUp')
    wrapper.instance().forceUpdate()
    const emailInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'email'
    })

    const passwordInput = wrapper.find('input').filterWhere(item => {
      return item.prop('name') === 'password'
    })

    const passwordConfirmationInput = wrapper
      .find('input')
      .filterWhere(item => {
        return item.prop('name') === 'passwordConfirmation'
      })

    emailInput.simulate('change', {
      target: { value: 'new-user@example.com' }
    })

    passwordInput.simulate('change', {
      target: { value: 'password' }
    })

    passwordConfirmationInput.simulate('change', {
      target: { value: 'password' }
    })

    const submitForm = wrapper.find('Form')
    submitForm.simulate('submit')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(props.postSignUpInfo).toBeCalledTimes(1)
  })

  it('returns the user if postSignUpInfo is called with the correct credentials', () => {
    expect.assertions(1)
    props
      .postSignUpInfo({
        email: 'new-user@example.com',
        password: 'password',
        passwordConfirmation: 'password'
      })
      .then(() => expect(props.history.push).toBeCalledTimes(1))
  })

  it('throws an error if postSignUpInfo is called with incorrect credentials', () => {
    expect.assertions(1)
    const submitForm = wrapper.find('Form')
    submitForm.simulate('submit')
    props
      .postSignUpInfo({
        email: 'existing-user@example.com',
        password: ''
      })
      .catch(e =>
        expect(e).toEqual(
          Error('This email already has an account, please sign in')
        )
      )
  })
})
