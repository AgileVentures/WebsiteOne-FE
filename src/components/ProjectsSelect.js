import React from 'react'
import { Form } from 'semantic-ui-react'
import { pure } from 'recompose'
import { Field } from 'redux-form'
import { SelectField } from 'react-semantic-redux-form'

const ProjectsSelect = props => {
  const { projects, projectId, handleChange } = props
  const projectOptions = projects ? projects.map(project => {
    return {
      key: project.id,
      text: project.title
      //  value: project.id
    }
  }) : []
  return (
    <Field
      component={SelectField}
      label='Project'
      name='project'
      options={projectOptions}
      // value={projectId}
      // onChange={handleChange}
      search
    />
  )
}

export default pure(ProjectsSelect)
