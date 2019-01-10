import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleLogin = e => {
    e.preventDefault();
    console.log(this.state);
    axios({
      method: "post",
      url: "http://localhost:3000/users/sign_in",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { password, email } = this.state;
    return (
      <Form onSubmit={this.handleLogin}>
        <Form.Input
          placeholder="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
        />
        <Form.Input
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />

        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
