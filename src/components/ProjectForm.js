import React from 'react'
import {
  Button,
  Select,
  Form
} from 'semantic-ui-react'

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
    /> <Form.TextArea label='Description'
      placeholder='Project description'
      name='description'
      value={
        props.description
      }
      onChange={
        props.onChange
      }
    />  <Select name='status'
      value={
        props.status
      }
      onChange={
        props.onChange
      }
      placeholder='Select status' /> <Button type='submit' > Submit </Button> </Form >
  )
}

export default ProjectForm
