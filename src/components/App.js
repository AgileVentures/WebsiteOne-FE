import React, { Component, Fragment } from 'react'
import UsersList from '../containers/UsersList'
import UserProfile from '../containers/UserProfile'
import { Route, Switch } from 'react-router-dom'
import ProjectsList from '../containers/ProjectsList'
import ProjectInfo from '../containers/ProjectInfo'
import Homepage from '../components/homepage/Homepage'
import Navbar from './navbar/Navbar'
import LogIn from '../containers/LogIn'
import SignUp from '../containers/SignUp'
import Subscriptions from './Subscriptions'
import PayPalSuccess from './PayPalSuccess'
import MembershipPlansPage from '../containers/MembershipPlansPage'
import PremiumMobMembershipPage from '../containers/PremiumMobMembershipPage'
import PremiumF2FMembershipPage from '../containers/PremiumF2FMembershipPage'
import { withCookies } from 'react-cookie'

class App extends Component {
  render () {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route exact path='/users' component={UsersList} />
          <Route path='/users/:id' component={UserProfile} />
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
          <Route exact path='/projects' component={ProjectsList} />
          <Route path='/projects/:slug' render={props => {
            return (
              <ProjectInfo
                {...props}
                cookies={this.props.cookies}
              />)
          }}
          />
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
          <Route path='/membership-plans' component={MembershipPlansPage} />
          <Route path='/premiummob' component={PremiumMobMembershipPage} />
          <Route path='/premiumf2f' component={PremiumF2FMembershipPage} />
        </Switch>
      </Fragment>
    )
  }
}

export default withCookies(App)
