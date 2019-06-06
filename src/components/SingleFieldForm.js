import React from 'react'
import { Segment, Form, Grid } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { InputField } from 'react-semantic-redux-form'
import FormButton from './FormButton'
import { validateSingleFieldForm } from '../helpers/validators'
import '../assets/SingleFieldForm.css'

export const SingleFieldForm = props => {
  const {
    label,
    placeholder,
    name,
    handleSubmit,
    error,
    eventActions,
    cancelEventAction
  } = props
  return (
    <Segment
      padded='very'
      vertical
      className={eventActions}
    >
      <Form
        onSubmit={handleSubmit}
        className='link-form'
        size='large'
      >
        <Field
          label={label}
          placeholder={placeholder}
          name={name}
          component={InputField}
          error={error}
        />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <FormButton type='negative' buttonText='Cancel' onClick={cancelEventAction} />
            </Grid.Column>
            <Grid.Column>
              <FormButton type='secondary' buttonText='Save' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  )
}

export default reduxForm({
  form: 'SingleFieldForm',
  validate: validateSingleFieldForm
})(SingleFieldForm)
