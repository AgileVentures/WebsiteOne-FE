import React from 'react'
import { LogIn } from '../../containers/LogIn'
import { mount } from 'enzyme'

describe('LogIn', () => {
  let wrapper
  const { assign } = window.location
  const user = {
    id: 1,
    email: 'existing-user@example.com',
    password: 'password'
  }
  const props = {
    history: { push: jest.fn() },
    lastLocation: '',
    cookies: { set: jest.fn() },
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
  beforeEach(() => {
    wrapper = mount(<LogIn {...props} />)
    Object.defineProperty(window.location, 'assign', {
      configurable: true
    })
    window.location.assign = jest.fn()
  })

  afterEach(() => {
    window.location.assign = assign
  })

  it('returns the user if postLogInInfo is called with the correct credentials', async () => {
    expect.assertions(1)
    const loggingInUser = await props.postLogInInfo({
      email: 'existing-user@example.com',
      password: 'password'
    })
    expect(loggingInUser).toEqual(user)
  })

  it('throws an error if postLogInInfo is called with incorrect credentials', async () => {
    expect.assertions(1)
    try {
      await props.postLogInInfo({ email: '', password: '' })
    } catch (e) {
      expect(e).toEqual(Error('Username and/or Password do no match'))
    }
  })

  it('redirects to root when no path is set in lastLocation', async () => {
    expect.assertions(1)
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
    await props
      .postLogInInfo({
        email: 'existing-user@example.com',
        password: 'password'
      })
      .then(() => {
        expect(props.history.push).toHaveBeenCalledWith('/')
      })
  })

  it('redirects back to last location with search term', async () => {
    props.lastLocation = { path: '/subscriptions/new', search: '?plan=premium' }
    wrapper = mount(<LogIn {...props} />)

    expect.assertions(1)
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
    await props
      .postLogInInfo({
        email: 'existing-user@example.com',
        password: 'password'
      })
      .then(() => {
        expect(props.history.push).toHaveBeenCalledWith(props.lastLocation.path + props.lastLocation.search)
      })
  })

  it('redirects back to last location without search term', async () => {
    expect.assertions(1)
    props.lastLocation = { path: '/events/new' }
    wrapper = mount(<LogIn {...props} />)

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

    await props
      .postLogInInfo({
        email: 'existing-user@example.com',
        password: 'password'
      })
      .then(() => {
        expect(props.history.push).toHaveBeenCalledWith('/events/new')
      })
  })

  it('redirects to login via github oauth when clickin on login with github', () => {
    const oauthLogInButton = wrapper.find('button').filterWhere(item => {
      return item.text() === 'with GitHub'
    })
    oauthLogInButton.simulate('click')
    expect(window.location.assign).toBeCalledTimes(1)
  })
})
