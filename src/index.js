import React from "react";
import { render } from "react-dom";
import { UsersList } from "./containers/UsersList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/users" component={UsersList} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
