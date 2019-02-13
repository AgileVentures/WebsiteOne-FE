import React, { Component, Fragment } from 'react'
import UsersList from '../containers/UsersList'
import { Route, Switch } from 'react-router-dom'
import ProjectsList from '../containers/ProjectsList'
import Homepage from '../components/homepage/Homepage'
import Navbar from './navbar/Navbar'
import LogIn from '../containers/LogIn'
import SignUp from '../containers/SignUp'
import Subscriptions from './Subscriptions'
import PayPalSuccess from './PayPalSuccess'
import { withCookies } from 'react-cookie'

class App extends Component {
  render () {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/users' component={UsersList} />
          <Route
            path='/login'
            render={props => {
              return (
                <LogIn
                  {...props}
                  lastLocation={props}
                  cookies={this.props.cookies}
                />
              )
            }}
          />
          <Route path='/signup' component={SignUp} />
          <Route path='/projects' component={ProjectsList} />
          <Route exact path='/subscriptions/new' render={props => {
            return (
              <Subscriptions
                {...props}
                cookies={this.props.cookies}
              />)
          }}
          />
          <Route path='/subscriptions/success' render={props => {
            return (
              <PayPalSuccess
                {...props}
                cookies={this.props.cookies}
              />)
          }}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default withCookies(App)
