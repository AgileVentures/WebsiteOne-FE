import React from 'react'
import { render } from 'react-dom'
import UsersList from './containers/UsersList'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Container } from 'semantic-ui-react'
import Homepage from './components/homepage/Homepage'
import Navbar from './components/navbar/Navbar'
import LogIn from './containers/LogIn'
import './assets/semantic.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://develop.websiteone.agileventures.org/'

render(
  <BrowserRouter>
    <Provider store={store}>
      <Navbar></Navbar>
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Container className='main-content'>
            <Route path='/users' component={UsersList} />
            <Route path='/login' component={LogIn} />
          </Container>
        </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
