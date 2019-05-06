import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserInfo } from '../actions/getUserInfoAction'
import UserSummary from '../components/UserSummary'
import { Container } from 'semantic-ui-react'
import { setLastLocation } from '../actions/setLastLocationAction'
import '../assets/UserProfile.css'

export class UserProfile extends Component {
  componentDidMount () {
    const userId = Number(this.props.match.params.id)
    this.props.setLastLocation(this.props.location.pathname)
    if (this.props.user.id !== this.props.match.params.id) {
      this.props.fetchUserInfo(userId)
    }
  }

  render () {
    return (
      <Container className='user-profile-container'>
        <UserSummary user={this.props.user} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({ users: state.users, user: state.userInfo })
export default connect(
  mapStateToProps,
  { fetchUserInfo, setLastLocation }
)(UserProfile)
