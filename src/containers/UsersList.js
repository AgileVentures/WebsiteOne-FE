import React, { Component, Fragment } from 'react'
import { Header, Card, Grid, Container, Input } from 'semantic-ui-react'
import Paginate from '../components/Paginate'
import PaginationLinks from '../components/PaginationLinks'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/getUsersAction'
import { setLastLocation } from '../actions/setLastLocationAction'
import User from '../components/User'
import '../assets/UsersList.css'
export class UsersList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstPage: true,
      lastPage: true,
      pageCount: null,
      usersList: [],
      users: {},
      selectedPage: 1
    }
  }

  componentDidMount () {
    if (!this.props.users.length) {
      this.props.fetchUsers()
    } else {
      this.normalizeUsers(this.props.users)
    }
    this.props.setLastLocation(this.props.location.pathname)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.users.length !== nextProps.users.length) {
      this.normalizeUsers(nextProps.users)
    }
  }

  normalizeUsers (users) {
    let pageCount = Math.ceil(users.length / 12)
    let normalizedUsers = {}
    let lastIndex = 0

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1) {
        normalizedUsers[i] = users.slice(i - 1, i + 11)
        lastIndex = i + 11
      } else {
        normalizedUsers[i] = users.slice(lastIndex, lastIndex + 12)
        lastIndex += 12
      }
    }
    this.setState({
      users: normalizedUsers,
      pageCount,
      usersList: normalizedUsers[1],
      lastPage: false
    })
  }

  /* eslint-disable-next-line */
  handlePageSelect = selectedPage => e => {
    e.preventDefault()
    this.setState({
      usersList: this.state.users[selectedPage],
      selectedPage,
      firstPage: selectedPage - 1 < 1,
      lastPage: selectedPage + 1 > this.state.pageCount
    })
  };

  handleSearchInput = e => {
    const users = this.props.users.filter(user => {
      const name = `${user.first_name} ${user.last_name}`

      return name.includes(e.target.value)
    })

    this.normalizeUsers(users)
  };

  sanitizeInput = input => {
    return input.toLowerCase().trim()
  };

  render () {
    let {
      firstPage,
      lastPage,
      pageCount,
      usersList,
      selectedPage
    } = this.state
    return (
      <Fragment>
        <Container>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <Header as='h1'>Volunteers Directory</Header>
                <Input
                  onChange={this.handleSearchInput}
                  className='users-list-search-input'
                  fluid
                  icon='search'
                  placeholder='Search...'
                />
                <Card.Group centered itemsPerRow={3}>
                  {usersList ? (
                    <Paginate
                      items={usersList}
                      Component={User}
                      pageCount={pageCount}
                    />
                  ) : (
                    'No users found.'
                  )}
                </Card.Group>
                <PaginationLinks
                  handlePageSelect={this.handlePageSelect}
                  firstPage={firstPage}
                  lastPage={lastPage}
                  pageCount={pageCount}
                  selectedPage={selectedPage}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({ users: state.users })
export default connect(
  mapStateToProps,
  { fetchUsers, setLastLocation }
)(UsersList)
