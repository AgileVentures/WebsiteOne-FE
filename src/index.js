import React from "react";
import { render } from "react-dom";
import UsersList from "./containers/UsersList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Homepage from "./components/homepage/Homepage";
import "./assets/semantic.css"
import axios from 'axios';
axios.defaults.baseURL = 'https://develop.websiteone.agileventures.org/';

import "./assets/semantic.css"

render(
  <BrowserRouter>
    <Provider store={store}>
      <Container className="main-content">
        <Switch>
          <Route path="/" exact={true} component={Homepage} />
          <Route path="/users" component={UsersList} />
        </Switch>
      </Container>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
