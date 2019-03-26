import React, { Fragment } from 'react'
import { Card, Image, Grid, Label, Tab, Icon } from 'semantic-ui-react'
import CustomRingLoader from './CustomRingLoader'
import Videos from './Videos'
import moment from 'moment'
import '../assets/UserSummary.css'

const UserSummary = props => {
  let { user } = props
  if (user) {
    const latestUserContributionList = user.contributions
      .sort((a, b) => b - a)
      .slice(0, 6)
    const usersActiveProjects = []
    user.projects.map(project => {
      latestUserContributionList.map(usersProject => {
        if (usersProject.project_id === project.id) {
          usersActiveProjects.push(project)
        }
      })
    })
    const panes = [
      {
        menuItem: 'Bio',
        render: () => <Tab.Pane attached={false}>{user.bio}</Tab.Pane>
      },
      {
        menuItem: 'Skills',
        render: () => (
          <Tab.Pane attached={false}>
            <div className='user-profile-skills'>
              {user.skill_list.map(skill => (
                <Label key={skill}>{skill}</Label>
              ))}
            </div>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Projects',
        render: () => (
          <Tab.Pane attached={false}>
            <Card.Group itemsPerRow={2}>
              {usersActiveProjects.map(project => (
                <Card key={project.id}>
                  <Card.Content>
                    <Card.Header>
                      <a href={`/projects/${project.slug}`}>{project.title}</a>
                    </Card.Header>
                    <Card.Description>
                      <Icon
                        name='github alternate'
                        size='large'
                        className='github-commit-count-icon'
                      />
                      {project.commit_count} total commits
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Card.Group>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Activity',
        render: () => (
          <Tab.Pane attached={false} className='user-profile-activity'>
            <h5>
              Contributions (GitHub) - {user.commit_count_total} total commits x
              1 - {user.commit_count_total}
              <Icon
                name='fire'
                size='large'
                className='user-profile-activity-icon'
              />
            </h5>
            <ul>
              {user.projects.map(project => {
                return user.contributions.map(usersProject => {
                  if (usersProject.project_id === project.id) {
                    return (
                      <li key={user.id}>
                        <a>{project.title}</a> - {usersProject.commit_count}{' '}
                        commits
                      </li>
                    )
                  }
                })
              })}
            </ul>
            <h5>
              Contributions (Hangouts Hosted) - {user.hangouts} total hangouts x
              1 - {user.hangouts}{' '}
              <Icon
                name='fire'
                size='large'
                className='user-profile-activity-icon'
              />
            </h5>
            <h5>
              Contributions (Authentications) - {user.authentications}{' '}
              authentications x 100 - {Number(user.authentications) * 100}
              <Icon
                name='fire'
                size='large'
                className='user-profile-activity-icon'
              />
            </h5>
            <h5>
              Contributions (Profile Completeness) - {user.profile} out of 10
              <Icon
                name='fire'
                size='large'
                className='user-profile-activity-icon'
              />
            </h5>
            <h5>
              Contributions (Membership Length) - {user.membership_length} out
              of 6
              <Icon
                name='fire'
                size='large'
                className='user-profile-activity-icon'
              />
            </h5>
            <h5>
              Contributions (Sign In Activity) - {user.activity} out of 6
              <Icon
                name='fire'
                size='large'
                className='user-profile-activity-icon'
              />
            </h5>
          </Tab.Pane>
        )
      }
    ]

    return (
      <Fragment>
        <Grid columns={3} stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card className='user-profile-card'>
                <Image
                  src={`${user.gravatarUrl}`}
                  className='user-profile-image'
                />
                <Card.Content>
                  <Card.Header className='user-profile-header'>
                    <Grid stackable>
                      <Grid.Row>
                        <p className='user-profile-name'>
                          {user.first_name
                            ? user.first_name + ' ' + user.last_name
                            : user.slug.substring(0, 15)}
                        </p>
                        <p className='user-profile-karma'>
                          <Icon name='fire' size='large' className='fire-icon' /> {}
                          {user.karmaTotal}
                        </p>
                      </Grid.Row>
                    </Grid>
                  </Card.Header>
                  <Card.Meta>
                    {user.title_list.map(title => title + ' ')}
                  </Card.Meta>
                  <Card.Description>
                    <Grid>
                      <Grid.Row>
                        <Icon
                          name='calendar alternate outline'
                          size='large'
                          className='font-awesome-icon'
                        />
                        Member for {moment().diff(user.created_at, 'years')}{' '}
                        years
                      </Grid.Row>
                    </Grid>
                  </Card.Description>
                  <Card.Description>
                    <Grid>
                      <Grid.Row>
                        <Icon
                          name='github alternate'
                          size='large'
                          className='github-commit-count-icon'
                        />
                        <a href={user.github_profile_url}>
                          {user.github_profile_url ? user.github_profile_url.replace(
                            'https://github.com/',
                            ''
                          ) : null}
                        </a>
                      </Grid.Row>
                    </Grid>
                  </Card.Description>
                  <Card.Description>
                    <Grid>
                      <Grid.Row>
                        <Icon
                          name='envelope outline'
                          size='large'
                          className='font-awesome-icon'
                        />
                        <a href={'mailto:' + user.email}>
                          {user.email.length > 23
                            ? user.email.substring(0, 23) + '...'
                            : user.email}
                        </a>
                      </Grid.Row>
                    </Grid>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={8}>
              <Tab
                menu={{ secondary: true, pointing: true }}
                panes={panes}
                className='user-profile-tabs'
              />
            </Grid.Column>
            <Videos name={user} id='user-profile-videos' />
          </Grid.Row>
        </Grid>
      </Fragment>
    )
  } else {
    return <CustomRingLoader />
  }
}

export default UserSummary
