import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { InputField, SelectField, TextAreaField } from 'react-semantic-redux-form'
import { Field, reduxForm } from 'redux-form'

export const ProjectForm = props => {
  const options = [
    { key: 'select', value: '', text: 'Choose One' },
    { key: 'one', value: 'Active', text: 'Active' },
    { key: 'two', value: 'Inactive', text: 'Inactive' }
  ]

  return (
    <Form onSubmit={props.handleSubmit}>
      <Field name='title' component={InputField}
        label='Title'
        placeholder='Title' required />
      <Field type='url'
        name='image_url' component={InputField}
        label='Image url'
        placeholder='Paste a link to your image here' />
      <Field name='description' component={TextAreaField}
        label='Description'
        placeholder='Description' required />
      <Field name='status'
        component={SelectField}
        label='Status'
        options={options}
        placeholder='Status'
      />
      <Form.Field control={Button} primary
        type='submit' >
        Create Project
      </Form.Field>
    </Form>
  )
}

export default reduxForm({
  form: 'Project'
})(ProjectForm)
