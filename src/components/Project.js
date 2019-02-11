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
        <div className='project-card-footer'>
          <div className='project-card-footer-div'>
            <Icon name='users' size='large' /> {}
            {project.followers}
          </div>
          <div className='project-card-footer-div'>
            <Icon name='file alternate outline' size='large' /> {}
            {project.documents}
          </div>
          <div className='project-card-footer-github-div'>
            <Icon name='github alternate' size='large' /> {}
            {project.commit_count}
          </div>
        </div>
      </Card.Content>
    </Card>
  )
}

export default Project
