import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const ProjectForm = props => {
  console.log(props)
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Input
        label='Title'
        placeholder='Project title'
        name='title'
        value={props.title}
        onChange={props.onChange}
      />
      <Form.TextArea
        label='Description'
        placeholder='Project description'
        name='description'
        value={props.description}
        onChange={props.onChange}
      />
      <Button type='submit'>Submit</Button>
    </Form>
  )
}

export default ProjectForm
