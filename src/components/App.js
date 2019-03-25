import React, { Component, Fragment } from 'react'
import UsersList from '../containers/UsersList'
import UserProfile from '../containers/UserProfile'
import { Route, Switch } from 'react-router-dom'
import ProjectsList from '../containers/ProjectsList'
import ProjectInfo from '../containers/ProjectInfo'
import Homepage from '../components/homepage/Homepage'
import Navbar from './navbar/Navbar'
import About from '../containers/About'
import LogIn from '../containers/LogIn'
import SignUp from '../containers/SignUp'
import Subscriptions from '../containers/Subscriptions'
import SubscriptionsSuccess from './SubscriptionsSuccess'
import MembershipPlansPage from '../containers/MembershipPlansPage'
import PremiumMembershipPage from '../containers/PremiumMembershipPage'
import PremiumMobMembershipPage from '../containers/PremiumMobMembershipPage'
import PremiumF2FMembershipPage from '../containers/PremiumF2FMembershipPage'
import GettingStartedPage from '../containers/GettingStartedPage'
import EventsList from '../containers/EventsList'
import EventInfo from '../containers/EventInfo'
import CreateEventPage from '../components/CreateEventPage'
import { withCookies } from 'react-cookie'

class App extends Component {
  render () {
    return (
      <Fragment>
        <Navbar cookies={this.props.cookies} />
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route exact path='/about' component={About} />
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
              <SubscriptionsSuccess
                {...props}
                cookies={this.props.cookies}
              />)
          }}
          />
          <Route path='/membership-plans' component={MembershipPlansPage} />
          <Route path='/premium' component={PremiumMembershipPage} />
          <Route path='/premium-mob' component={PremiumMobMembershipPage} />
          <Route path='/premium-f2f' component={PremiumF2FMembershipPage} />
          <Route exact path='/events' component={EventsList} />
          <Route path='/events/new' render={props => {
            return (
              <CreateEventPage
                {...props}
                cookies={this.props.cookies}
              />)
          }}
          />
          <Route path='/events/:slug' component={EventInfo} />
          <Route path='/getting-started' component={GettingStartedPage} />
        </Switch>
      </Fragment>
    )
  }
}

export default withCookies(App)
