import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserInfo } from '../actions/getUserInfoAction'
import UserSummary from '../components/UserSummary'
import { Container } from 'semantic-ui-react'
import { setLastLocation } from '../actions/setLastLocationAction'
import '../assets/UserProfile.css'

export class UserProfile extends Component {
  state = { user: null }

  componentDidMount () {
    const userId = Number(this.props.match.params.id)
    this.props.setLastLocation(this.props.location.pathname)
    if (this.props.user.id === this.props.match.params.id) {
      this.setState({ user: this.props.user })
    } else {
      this.props.fetchUserInfo(userId)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({ user: nextProps.user })
    }
  }

  render () {
    let { user } = this.state
    return (
      <Container className='user-profile-container'>
        <UserSummary user={user} />
      </Container>
    )
  }
}

const mapStateToProps = store => ({ users: store.users, user: store.userInfo })
export default connect(
  mapStateToProps,
  { fetchUserInfo, setLastLocation }
)(UserProfile)
