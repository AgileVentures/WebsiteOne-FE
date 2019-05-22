import React from 'react'
import { Field } from 'redux-form'
import { Button } from 'semantic-ui-react'
import { InputField } from 'react-semantic-redux-form'

const FieldGroup = ({
  fields,
  type,
  start,
  meta: { error, submitFailed }
}) => (
  <ul className='field-group'>
    {fields.map((item, index) => {
      const fieldNumber = index + 1
      let label
      if (fieldNumber === 1) {
        label = `${start} (primary)`
      } else {
        label = `${start} (${fieldNumber})`
      }
      return (
        <li key={index}>
          <Field
            name={`${type}s[${index}].value`}
            type='text'
            label={label}
            component={InputField}
            placeholder='https://github.com/projectname'
          />
          <Button
            className='field-group__remove negative'
            type='button'
            title='Remove Repo'
            onClick={() => fields.remove(index)} >Remove {type}</Button>
        </li>
      )
    })}
    <Button
      className='field-group__add'
      key='addButton'
      type='button'
      color='blue'
      onClick={() => fields.push({})}>Add more {type + 's'}
    </Button>
    {submitFailed && error && <span>{error}</span>}
  </ul>
)

export default FieldGroup
