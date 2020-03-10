import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
import Favicon from 'react-favicon'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import './assets/semantic.css'

const client = new ApolloClient({ uri: 'http://localhost:3000/graphql' })
console.log('client', client)

const ApolloApp = AppComponent => (
  <CookiesProvider>
  <Favicon url='https://www.agileventures.org/favicon.ico?v=2' />
  <BrowserRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <AppComponent />
      </ApolloProvider>
    </Provider>
  </BrowserRouter>
</CookiesProvider>
)

render(ApolloApp(App), document.getElementById('root'))

if (window.Cypress) {
  window.store = store
}
