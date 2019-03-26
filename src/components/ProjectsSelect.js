import React from 'react'
import { Form } from 'semantic-ui-react'
import { pure } from 'recompose'

const ProjectsSelect = props => {
  const { projects, handleChange } = props
  const projectOptions = projects ? projects.map(project => {
    return { key: project.id, text: project.title, value: project.id }
  }) : []
  return (
    <Form.Select
      label='Project'
      name='project'
      options={projectOptions}
      placeholder={''}
      value={projectOptions.value}
      onChange={handleChange}
      search
    />
  )
}

export default pure(ProjectsSelect)
