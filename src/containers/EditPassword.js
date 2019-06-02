import React from 'react'
import { Container, Button, Form, Header, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import iziToast from 'izitoast'
import queryString from 'query-string'

import { putEditPassword } from '../actions/putEditPasswordAction'

import '../assets/EditPassword.scss'

export class EditPassword extends React.Component {
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
      const { cookies, history, putEditPassword, location } = this.props
      const parsedQuery = queryString.parse(location.search)
      const resetPasswordToken = parsedQuery.reset_password_token

      putEditPassword({ password, passwordConfirmation, resetPasswordToken })
        .then(() => {
          history.push('/')

          cookies.set(process.env.SESSION || 'WebsiteOne_session', this.props.loggedInUser.headers.authorization, {
            path: '/'
          })

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
        .catch((error) => {
          console.log(error)
          iziToast.show({
            theme: 'light',
            title: 'Sorry',
            message: 'Something went wrong. Probably reset token is not valid.',
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
                    required
                  />
                  <Form.Input
                    name='password_confirmation'
                    placeholder='Confirm password'
                    type='password'
                    onChange={this.handlePasswordConfirmationChange}
                    value={this.state.passwordConfirmation}
                    required
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

const mapStateToProps = (state, ownProps) => ({
  loggedInUser: state.loggedInUser,
  cookies: ownProps.cookies
})

export default connect(
  mapStateToProps,
  { putEditPassword }
)(EditPassword)
