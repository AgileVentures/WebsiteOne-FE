import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const ProjectForm = props => {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Input
        label='Title'
        placeholder='Project title'
        name='title'
      />
      <Form.TextArea
        label='Description'
        placeholder='Project description'
        name='description'
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default ProjectForm
