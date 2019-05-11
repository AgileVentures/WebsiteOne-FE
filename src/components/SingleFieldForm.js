import React from 'react'
import { Segment, Form, Grid } from 'semantic-ui-react'
import FormButton from './FormButton'
import '../assets/SingleFieldForm.css'

const SingleFieldForm = props => {
  const {
    label,
    placeholder,
    name,
    value,
    handleChange,
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
        <Form.Input
          label={label}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          error={error}
          required
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

export default SingleFieldForm
