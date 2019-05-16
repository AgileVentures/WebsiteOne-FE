import React from 'react'
import { Container, Button, Form, Header, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import iziToast from 'izitoast'
import queryString from 'query-string'

import { putEditPassword } from '../actions/putEditPassword'

import '../assets/EditPassword.scss'

class EditPassword extends React.Component {
    state = {
        password: '',
        passwordConfirmation: ''
    }

    handlePasswordChange = (e) => {
      this.setState({ password: e.target.value })
    }

    handlePasswordConfirmationChange = (e) => {
      this.setState({ passwordConfirmation: e.target.value })
    }

    handleSubmit = (e) => {
      e.preventDefault()

      const { password, passwordConfirmation } = this.state
      const { putEditPassword, location } = this.props
      const parsedQuery = queryString.parse(location.search)
      const resetPasswordToken =  parsedQuery.reset_password_token

      putEditPassword({ password, passwordConfirmation, resetPasswordToken })
        .then((user) => {
          console.log('IN COMPONENT: ', user)

          iziToast.show({
            theme: 'light',
            title: 'Success',
            message: 'Your password has been changed successfully.',
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
            message: 'Something went wrong.',
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
            Edit your password
          </Header>
          <Grid centered>
            <Grid.Row>
              <Grid.Column mobile={12} computer={8}>
                <Form className='edit-password__form' onSubmit={this.handleSubmit}>
                  <Form.Input
                    name='password'
                    placeholder='New password'
                    type='password'
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                  />
                  <Form.Input
                    name='password_confirmation'
                    placeholder='Confirm password'
                    type='password'
                    onChange={this.handlePasswordConfirmationChange}
                    value={this.state.passwordConfirmation}
                  />
                  <Button fluid secondary>Change password</Button>
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
  { putEditPassword }
)(EditPassword)
