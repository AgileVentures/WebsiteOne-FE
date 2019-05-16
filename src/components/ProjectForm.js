import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { InputField, SelectField, TextAreaField } from 'react-semantic-redux-form'
import { Field, FieldArray, reduxForm } from 'redux-form'
import FieldGroup from './FieldGroup'
import { validateProjectForm } from '../helpers/validators'

export const ProjectForm = props => {
  const { handleSubmit, submitting } = props
  const options = [
    { key: 'select', value: '', text: 'Choose One' },
    { key: 'one', value: 'Active', text: 'Active' },
    { key: 'two', value: 'Inactive', text: 'Inactive' }
  ]
  return (
    <Form onSubmit={handleSubmit}>
      <Field name='title' component={InputField}
        label='Title'
        placeholder='Title'
      />
      <Field type='url'
        name='image_url' component={InputField}
        label='Image url'
        placeholder='Paste a link to your image here'
      />
      <Field name='description' component={TextAreaField}
        label='Description'
        placeholder='Description'
      />
      <Field name='slack_channel_name' component={TextAreaField}
        label='Slack channel name'
        placeholder='slack_channel_name'
      />
      <Field name='status'
        component={SelectField}
        label='Status'
        options={options}
        placeholder='Status'
      />
      <FieldArray
        name='repos'
        type='repo'
        start='GitHub url'
        component={FieldGroup}
      />
      <FieldArray
        name='trackers'
        type='tracker'
        start='Issue Tracker'
        component={FieldGroup} />
      <Form.Field control={Button} primary
        type='submit' disabled={submitting}>
        Create Project
      </Form.Field>
    </Form>
  )
}

export default reduxForm({
  form: 'Project',
  validate: validateProjectForm
})(ProjectForm)
