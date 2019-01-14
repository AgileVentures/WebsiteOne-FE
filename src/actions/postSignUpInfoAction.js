import axios from "axios";
import { POST_SIGNUP_INFO } from "../types";

export let getUser = user => ({ type: POST_SIGNUP_INFO, payload: user });

export let postSignUpInfo = props => dispatch => {
  return axios({
    method: "post",
    url: "/users",
    data: {
      user: {
        email: props.email,
        password: props.password,
        password_confirmation: props.passwordConfirmation
      }
    }
  }).then(response => {
    dispatch(getUser(response.data));
  });
};