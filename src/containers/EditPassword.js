import React from 'react'
import { Container, Button, Form, Header, Grid } from 'semantic-ui-react'

import '../assets/EditPassword.scss'

export default class EditPassword extends React.Component {
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
      console.log('Submitted: ' + this.state.email)
      // PUT         /users/password
      e.preventDefault()
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
