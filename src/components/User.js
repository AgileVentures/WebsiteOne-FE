import React from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../assets/User.css'

const User = ({ item: user }) => {
  return (
    <Card className='user-card' raised>
      <Card.Content>
        <Link to={`/users/${user.id}`}>
          <Image
            src={`${user.gravatar_url}`}
            floated='left'
            rounded
            size='tiny'
          />
          <big className='user-card-header'>
            <Card.Header>
              {user.first_name
                ? fullName(user).length >= 12
                  ? fullName(user).substring(0, 10) + '...'
                  : fullName(user)
                : user.slug.substring(0, 15)}
            </Card.Header>
          </big>
        </Link>
        <Card.Description>
          {user.title_list.length
            ? user.title_list.map(title => title + ' ')
            : null}
        </Card.Description>
        <p className='user-card-footer'>
          <Icon name='fire' /> {}
          {user.karma_total}
        </p>
      </Card.Content>
    </Card>
  )
}

const fullName = user => {
  return user.first_name + ' ' + user.last_name
}
export default User
