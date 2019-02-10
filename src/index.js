import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './store'
import './assets/semantic.css'
import App from './components/App'

render(
  <CookiesProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
  ,
  document.getElementById('root')
)
