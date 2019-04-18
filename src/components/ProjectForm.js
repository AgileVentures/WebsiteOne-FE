import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const ProjectForm = props => {
  return (<Form onSubmit={
    props.onSubmit
  } >
    <Form.Input label='Title'
      placeholder='Project title'
      name='title'
      value={
        props.title
      }
      onChange={
        props.onChange
      }
      required
    />
    <Form.TextArea label='Description'
      placeholder='Project description'
      name='description'
      value={
        props.description
      }
      onChange={
        props.onChange
      }
      required
    />
    <select name='status' id='status'
      onChange={
        props.onChange
      }
      required
    >
      <option value='Active' >Active</option>
      <option value='Inactive'>Inactive</option>
    </select>
    <Button type='submit' > Submit </Button> </Form >
  )
}

export default ProjectForm
