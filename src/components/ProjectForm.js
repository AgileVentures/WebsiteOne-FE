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
    /> <Form.TextArea label='Description'
      placeholder='Project description'
      name='description'
      value={
        props.description
      }
      onChange={
        props.onChange
      }
    />
    <select name='status' id='status'
      onChange={
        props.onChange
      }
    >
      <option value='Active' >Active</option>
      <option value='Inactive'>Inactive</option>
    </select>
    {/* <Form.Select fluid label='Gender'
      options={options}
      value={props.status} onChange={
        props.onChange
      }
      name='status'
      placeholder='Select status' /> */}
    <Button type='submit' > Submit </Button> </Form >
  )
}

export default ProjectForm
