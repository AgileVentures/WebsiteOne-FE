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
    <Button className='field-group__add' key='addButton' type='button' onClick={() => fields.push({})}>Add more {type + 's'}</Button>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((item, index) => {
      const repoNum = index + 1
      let label
      if (repoNum === 1) {
        label = `${start} (primary)`
      } else {
        label = `${start} (${repoNum})`
      }
      return (
        <li key={index}>
          <Field
            name={`${item}.value`}
            type='text'
            label={label}
            component={InputField}
            placeholder='https://github.com/projectname'
          />
          <Button
            className='field-group__remove'
            type='button'
            title='Remove Repo'
            onClick={() => fields.remove(index)} >Remove {type}</Button>
        </li>
      )
    })}
  </ul>
)

export default FieldGroup
