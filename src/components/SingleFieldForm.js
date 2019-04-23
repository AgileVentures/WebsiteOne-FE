import React from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

const SingleFieldForm = props => {
  const {
    label,
    placeholder,
    name,
    value,
    handleChange,
    handleSubmit,
    error
  } = props

  return (
    <Segment padded='very' vertical>
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
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </Segment>
  )
}

export default SingleFieldForm
