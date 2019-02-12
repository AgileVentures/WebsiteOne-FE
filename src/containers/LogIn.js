import React, { Component, Fragment } from 'react'
import { Button, Form, Header, Grid, Checkbox } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postLogInInfo } from '../actions/postLogInInfoAction'
import iziToast from 'izitoast'
import '../assets/LogIn.scss'
export class LogIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleLogIn = event => {
    event.preventDefault()
    const { email, password } = this.state
    const { cookies, loggedInUser, history, lastLocation, postLogInInfo } = this.props
    postLogInInfo({ email, password })
      .then(() => {
        history.push(lastLocation.path + lastLocation.search)
        cookies.set('_WebsiteOne_session', this.props.loggedInUser.headers.authorization, {
          path: '/'
        })
        iziToast.show({
          theme: 'light',
          title: 'Success',
          message: 'Welcome back, ' + `${loggedInUser.slug}`,
          position: 'topRight',
          color: 'green',
          backgroundColor: 'lime',
          timeout: 3000,
          balloon: true
        })
      })
      .catch(() => {
        iziToast.show({
          theme: 'light',
          title: 'Sorry',
          message: 'Username and/or Password do no match',
          position: 'topRight',
          color: 'red',
          backgroundColor: 'lightcoral',
          timeout: 3000,
          balloon: true
        })
      })
  };

  render () {
    const { password, email } = this.state
    return (
      <Fragment>
        <Header as='h1' textAlign='center' className='login-h1'>
          Log In
        </Header>
        <Header as='h4' textAlign='center' className='login-h4'>
          Don't have an account? <a href='/signup'>Sign Up</a>
        </Header>
        <Header as='h4' textAlign='center'>
          <a href='/users/password/new'>Forgot your password?</a>
        </Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form
                onSubmit={this.handleLogIn}
                className='login-form'
                size='large'
              >
                <Form.Input
                  label='Email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label='Password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={this.handleChange}
                  type='password'
                />
                <Form.Field>
                  <Checkbox label='Remember me' />
                </Form.Field>
                <Button type='submit'>Log In</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = (store, ownProps) => ({
  loggedInUser: store.loggedInUser,
  lastLocation: store.lastLocation,
  cookies: ownProps.cookies
})
export default connect(
  mapStateToProps,
  { postLogInInfo }
)(LogIn)
