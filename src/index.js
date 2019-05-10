import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
import Favicon from 'react-favicon'

import './assets/semantic.css'

render(
  <CookiesProvider>
    <Favicon url='https://www.agileventures.org/favicon.ico?v=2' />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
)

if (window.Cypress) {
  window.store = store
}
