import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import fullLogo from '../images/full_logo2_agile_ventures.png'
import '../assets/Project.css'

const Project = ({ item: project }) => {
  return (
    <Card className='project-card' raised>
      <Image
        src={project.image_url || fullLogo}
        className='project-image'
      />
      <Card.Content>
        <Link to={`/projects/${project.id}`} className='project-title'>
          <big>
            <Card.Header>{project.title}</Card.Header>
          </big>
        </Link>
      </Card.Content>
      <Card.Content className='project-card-footer'>
        <Icon name='users' size='large' /> {}
        {project.followers}
        <Icon name='file alternate outline' size='large' /> {}
        {project.documents}
        <Icon name='github alternate' size='large' /> {}
        {project.commit_count}
      </Card.Content>
    </Card>
  )
}

export default Project
