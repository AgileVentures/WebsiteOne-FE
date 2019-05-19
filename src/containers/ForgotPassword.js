import React from 'react'
import { Container, Button, Form, Header, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import iziToast from 'izitoast'

import { postResetPassword } from '../actions/postResetPassword'

import '../assets/EditPassword.scss'

export class ForgotPassword extends React.Component {
    state = {
      email: ''
    }

    handleChange = (e) => {
      this.setState({ email: e.target.value })
    }

    handleSubmit = (e) => {
      e.preventDefault()

      const { email } = this.state
      const { history, postResetPassword } = this.props
      postResetPassword({ email })
        .then(() => {
          history.push('/login')

          iziToast.show({
            theme: 'light',
            title: 'Success',
            message: 'You will receive an email with instructions about how to reset your password in a few minutes.',
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
            message: 'Email is not registered',
            position: 'topRight',
            color: 'red',
            backgroundColor: 'lightcoral',
            timeout: 3000,
            balloon: true
          })
        })
    }

    render () {
      return (
        <Container className='edit-password'>
          <Header as='h1' textAlign='center'>
                    Forgot your password?
          </Header>
          <Grid centered>
            <Grid.Row>
              <Grid.Column mobile={12} computer={8}>
                <Form className='edit-password__form' onSubmit={this.handleSubmit}>
                  <Form.Input
                    name='email'
                    placeholder='Enter email'
                    type='email'
                    onChange={this.handleChange}
                    value={this.state.email}
                    required
                  />
                  <Button fluid secondary>Send me reset password instructions</Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      )
    }
}

export default connect(
  null,
  { postResetPassword }
)(ForgotPassword)
