import React, { Component, Fragment } from 'react'
import { Menu, Container, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import logo from '../images/av-logo.svg'
import queryString from 'query-string'

import '../assets/Navbar.css'

export class Navbar extends Component {
  state = { showHamburgerMenu: false, isLoggedIn: false }

  componentDidMount () {
    const parsed = queryString.parse(this.props.location.search)
    if (parsed.token) {
      this.props.cookies.set(process.env.SESSION || 'WebsiteOne_session', parsed.token, {
        path: '/'
      })
      this.setState({ isLoggedIn: true })
    }
  }

  currentPath () {
    // this.props.location.split("/") returns ["", ""] when on homepage
    // and ["", "users", "123"] when on /users/123
    // This function is used to highlight the nav link
    const pathArray = this.props.location.pathname.split('/')
    return pathArray[1]
  }

  handleRemoveCookies = () => {
    this.setState({ isLoggedIn: false })
    this.props.cookies.remove(process.env.SESSION || 'WebsiteOne_session')
  }

  toggleHamburgerMenu = () => {
    this.setState({
      showHamburgerMenu: !this.state.showHamburgerMenu
    })
  }

  render () {
    const { isLoggedIn } = this.state
    const { cookies } = this.props
    const activeItem = this.currentPath()
    const menuView = this.state.showHamburgerMenu ? 'open' : 'close'
    return (
      <Menu stackable borderless inverted as='div' className='navbar'>
        <Container>
          <Menu.Item header name='' active={activeItem === ''}>
            <Link to='/'>
              <Image src={logo} avatar />
              AgileVentures
            </Link>
          </Menu.Item>

          <Menu.Menu position='right' className={`${menuView}`}>
            <Menu.Item name='about' active={activeItem === 'about'}>
              <Link to='/about'>About</Link>
            </Menu.Item>

            <Menu.Item name='users' active={activeItem === 'users'}>
              <Link to='/users'>Users</Link>
            </Menu.Item>

            <Menu.Item name='projects' active={activeItem === 'projects'}>
              <Link to='/projects'>Projects</Link>
            </Menu.Item>

            <Menu.Item name='premium' active={activeItem === 'premium'}>
              <Link to='/membership-plans'>Premium</Link>
            </Menu.Item>

            <Menu.Item name='events' active={activeItem === 'events'}>
              <Link to='/events'>Events</Link>
            </Menu.Item>

            <Menu.Item
              name='getting-started'
              active={activeItem === 'getting-started'}
            >
              <Link to='/getting-started'>Getting Started</Link>
            </Menu.Item>
            {isLoggedIn || cookies.get(process.env.SESSION || 'WebsiteOne_session') ? (
              <Menu.Item name='signout' active={activeItem === 'signout'}>
                <Link to='/' onClick={this.handleRemoveCookies}>
                  <Icon name='sign-out' />
                  Log out
                </Link>
              </Menu.Item>
            ) : (
              <Fragment>
                <Menu.Item name='login' active={activeItem === 'login'}>
                  <Link to='/login'>Login</Link>
                </Menu.Item>

                <Menu.Item name='signup' active={activeItem === 'signup'}>
                  <Link to='/signup'>Sign up</Link>
                </Menu.Item>
              </Fragment>
            )}
          </Menu.Menu>
          <Link to='/'>
            <span className='hamburger' onClick={this.toggleHamburgerMenu}>
              <svg width='25' height='25'>
                <path d='M0,5 25,5' stroke='#fff' strokeWidth='1' />
                <path d='M0,13 25,13' stroke='#fff' strokeWidth='1' />
                <path d='M0,21 25,21' stroke='#fff' strokeWidth='1' />
              </svg>
            </span>
          </Link>
        </Container>
      </Menu>
    )
  }
}

export default withRouter(Navbar)
