import React from "react";
import { render } from "react-dom";
import { UsersList } from "./containers/UsersList";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/semantic.css"

render(
  <BrowserRouter>
    <Switch>
      <Route path="/users" component={UsersList} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
