import React from 'react'
import { render } from 'react-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import  store  from './store'
import App from './components/App'
import './assets/semantic.css'
import { ConnectedRouter } from 'connected-react-router'
import history from "./store/history";


render(
  <CookiesProvider>      
      <Provider store={ store }>
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

