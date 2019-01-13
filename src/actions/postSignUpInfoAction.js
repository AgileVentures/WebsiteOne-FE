import axios from "axios";
import { POST_SIGNUP_INFO } from "../types";

export let getUser = user => ({ type: POST_SIGNUP_INFO, payload: user });

export let postSignUpInfo = props => dispatch => {
  return axios({
    method: "post",
    url: "http://localhost:3000/users",
    data: {
      user: {
        email: props.email,
        password: props.password,
        password_confirmation: props.password_confirmation
      }
    }
  }).then(response => {
    dispatch(getUser(response.data));
    if (response.data.authorization) {
      sessionStorage.setItem("jwt-token", response.headers.authorization);
    }
  });
};