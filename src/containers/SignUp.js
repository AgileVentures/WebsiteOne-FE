import React, { Component, Fragment } from 'react'
import { Button, Form, Header, Grid, Checkbox } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postSignUpInfo } from '../actions/postSignUpInfoAction'
import iziToast from 'izitoast'
import '../assets/SignUp.scss'

export class SignUp extends Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSignUp = async e => {
    const { email, password, passwordConfirmation } = this.state
    e.preventDefault()
    await this.props
      .postSignUpInfo({ email, password, passwordConfirmation })
      .then(() => {
        this.props.history.push('/')
        iziToast.show({
          theme: 'light',
          title: 'Success',
          message: 'Welcome, ' + `${this.props.signedUpUser.slug}` + ', take a look around',
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
          message: 'This email already has an account, please sign in',
          position: 'topRight',
          color: 'red',
          backgroundColor: 'lightcoral',
          timeout: 3000,
          balloon: true
        })
      })
  };

  render () {
    const { password, email, passwordConfirmation } = this.state
    return (
      <Fragment>
        <Header as='h1' textAlign='center' className='signup-h1'>
          Sign Up
        </Header>
        <Header as='h4' textAlign='center' className='signup-h4'>
          Already a member? <a href='/login'>Log In</a>
        </Header>
        <Header as='h4' textAlign='center'>
          <a href='/users/password/new'>Forgot your password?</a>
        </Header>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form
                onSubmit={this.handleSignUp}
                className='signup-form'
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
                <Form.Input
                  label='Confirm Password'
                  placeholder='Repeat password'
                  name='passwordConfirmation'
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                  type='password'
                />
                <Form.Field>
                  <Checkbox label='I give permission for AV to send me occasional emails.' />
                </Form.Field>
                <Button type='submit'>Sign Up</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = store => ({ signedUpUser: store.signedUpUser })
export default connect(
  mapStateToProps,
  { postSignUpInfo }
)(SignUp)
