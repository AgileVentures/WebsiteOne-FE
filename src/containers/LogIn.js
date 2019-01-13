import React, { Component, Fragment } from "react";
import { Button, Form, Header, Grid, Checkbox } from "semantic-ui-react";
import { connect } from "react-redux";
import { postLogInInfo } from "../actions/postLogInInfoAction";
import iziToast from "../assets/iziToast.min.js";
import "../assets/iziToast.min.css";
import "../assets/LogIn.scss";

export class LogIn extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleLogIn = async e => {
    const { email, password } = this.state;
    e.preventDefault();
    await this.props
      .postLogInInfo({ email, password })
      .then(() => {
        iziToast.show({
          theme: "light",
          title: "Success",
          message: "Have a look around",
          position: "topRight",
          color: "green",
          backgroundColor: "lime",
          timeout: 3000,
          balloon: true
        });
        this.props.history.push("/");
      })
      .catch(e => {
        iziToast.show({
          theme: "light",
          title: "Sorry",
          message: `${e.message}` + " please try again",
          position: "topRight",
          color: "red",
          backgroundColor: "lightcoral",
          timeout: 3000,
          balloon: true
        });
      });
  };

  render() {
    const { password, email } = this.state;
    return (
      <Fragment>
        <Header as="h1" textAlign="center" className="login-h1">
          Log In
        </Header>
        <Header as="h4" textAlign="center" className="login-h4">
          Don't have an account? <a href="/sign_up">Sign up</a>
        </Header>
        <Header as="h4" textAlign="center">
          <a href="/users/password/new">Forgot your password?</a>
        </Header>
        <Grid centered={true}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form
                onSubmit={this.handleLogIn}
                className="login-form"
                size="large"
              >
                <Form.Input
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <Form.Field>
                  <Checkbox label="Remember me" />
                </Form.Field>
                <Button type="submit">Submit</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({ users: store.users });
export default connect(
  mapStateToProps,
  { postLogInInfo }
)(LogIn);
