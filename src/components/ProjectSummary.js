import React, { Fragment } from 'react'
import { Header, Image, Grid, Card, Icon, Segment } from 'semantic-ui-react'
import CustomRingLoader from './CustomRingLoader'
import Videos from './Videos'
import { Link } from 'react-router-dom'
import '../assets/ProjectSummary.css'

const ProjectSummary = props => {
  let { project } = props
  if (project) {
    return (
      <Grid columns={2} stackable>
        <Grid.Column width={12}>
          <Fragment>
            {project.image_url ? (
              <Image
                src={project.image_url}
                floated='left'
                className='project-info-image'
              />
            ) : null}
            <Header as='h1'>{project.title}</Header>
            <Segment raised>
              <Header as='h5'>{project.description}</Header>
            </Segment>
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column width={8}>
                  <Card fluid raised className='project-info-card'>
                    <Card.Content>
                      <Card.Header>Connected on</Card.Header>
                      <Card.Description className='project-info-card-description'>
                        {project.sourceRepositories.map(repo => {
                          let array = repo.url.split('/')
                          let repoName = array[array.length - 1] || array[array.length - 2]
                          return (
                            <Fragment key={repo.id}>
                              <Grid>
                                <Grid.Row>
                                  <Icon name='github alternate' size='large' />
                                  <a href={repo.url}>{repoName}</a>&nbsp; on GitHub
                                </Grid.Row>
                              </Grid>
                            </Fragment>
                          )
                        })}
                        {project.pivotaltracker_url ? (
                          <Fragment key={project.id}>
                            <Grid>
                              <Grid.Row>
                                <Icon name='bug' size='large' />
                                <a href={project.pivotaltracker_url}>
                                  {project.title}
                                </a>
                            &nbsp; on IssueTracker
                              </Grid.Row>
                            </Grid>
                          </Fragment>
                        ) : null}
                        {project.slack_channel_name
                          ? <Fragment key={project.slack_channel_name}>
                            <Grid>
                              <Grid.Row>
                                <Icon name='slack hash' size='large' />
                                <a
                                  href={`https://agileventures.slack.com/app_redirect?channel=${
                                    project.slack_channel_name
                                  }`}
                                >
                                  {project.title}
                                </a>
                            &nbsp; on Slack
                              </Grid.Row>
                            </Grid>
                          </Fragment>
                          : null}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column>
                  <Card fluid className='project-info-card'>
                    <Card.Content>
                      <Card.Header>Members</Card.Header>
                      <Card.Description className='project-info-card-description'>
                        {project.members.map(member => {
                          return (
                            <Fragment key={member.id}>
                              <Grid>
                                <Grid.Row>
                                  <Image
                                    src={
                                      project.membersGravatarUrl[`${member.slug}`]
                                    }
                                  />&nbsp;
                                  <Link to={`/users/${member.id}`}>
                                    {member.first_name ? `${member.first_name} ${member.last_name}`
                                      : member.slug}
                                  </Link>
                                </Grid.Row>
                              </Grid>
                            </Fragment>
                          )
                        })}
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
            </Grid>
          </Fragment>
        </Grid.Column>
        <Videos name={project} id='project-info-videos' />
      </Grid>
    )
  } else {
    return <CustomRingLoader />
  }
}

export default ProjectSummary
