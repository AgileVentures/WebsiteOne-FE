import React from 'react'
import { render } from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
import './assets/semantic.css'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()
render(
  <CookiesProvider>
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <App />
      </ConnectedRouter>
    </Provider>
  </CookiesProvider>
  ,
  document.getElementById('root')
)

if (window.Cypress) {
  window.store = store
}

window.store=store
