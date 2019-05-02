import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const ProjectForm = props => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Input
        label='Title'
        placeholder='Project title'
        name='title'
        value={props.title}
        onChange={props.onChange}
        required
      />
      <Form.TextArea
        label='Description'
        placeholder='Project description'
        name='description'
        value={props.description}
        onChange={props.onChange}
        required
      />
      <Form.Input
        label='Slack channel name'
        placeholder='Project slack channel name'
        name='slack'
        value={props.slack}
        onChange={props.onChange}
      />
      <select name='status' id='status' onChange={props.onChange} required>
        <option value='Active'>Active</option>
        <option value='Inactive'>Inactive</option>
      </select>
      <Button style={{ margin: '20px auto' }} type='submit'> Create Project </Button>{' '}
    </Form>
  )
}

export default ProjectForm
