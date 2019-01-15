import React from 'react'
import { render } from 'react-dom'
import UsersList from './containers/UsersList'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { Container } from 'semantic-ui-react'
import ProjectsList from './containers/ProjectsList'
import Homepage from './components/homepage/Homepage'
import './assets/semantic.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://develop.websiteone.agileventures.org/'

render(
  <BrowserRouter>
    <Provider store={store}>
      <Container className='main-content'>
        <Switch>
          <Route path='/' exact component={Homepage} />
          <Route path='/users' component={UsersList} />
          <Route path='/projects' component={ProjectsList} />
        </Switch>
      </Container>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
