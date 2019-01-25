import React, { Component } from 'react'
import { Menu, Container, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo from '../../images/av-logo.svg'
import './Navbar.css'

export class Navbar extends Component {
  currentPath () {
    // this.props.location.split("/") returns ["", ""] when on homepage
    // and ["", "users", "123"] when on /users/123
    // This function is used to highlight the nav link
    const pathArray = this.props.location.pathname.split('/')
    return pathArray[1]
  }

  render () {
    const activeItem = this.currentPath()

    return (
      <Menu stackable borderless inverted as='div' className='navbar'>
        <Container>
          <Menu.Item header name='' active={activeItem === ''}>
            <Link to='/'>
              <Image src={logo} avatar />
              AgileVentures
            </Link>
          </Menu.Item>

          <Menu.Menu position='right'>
            <Menu.Item name='users' active={activeItem === 'users'}>
              <Link to='/users'>Users</Link>
            </Menu.Item>

            <Menu.Item
              name='projects'
              active={activeItem === 'projects'}
              disabled
            >
              Projects
            </Menu.Item>
            <Menu.Item name='events' active={activeItem === 'events'} disabled>
              Events
            </Menu.Item>

            <Menu.Item
              name='login'
              active={activeItem === 'login'}
            >
              <Link to='/login'>Login</Link>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }
}
export default withRouter(Navbar)
