import { GET_USERS, POST_SIGNUP_INFO } from "../types";
import initialState from "./initialState";

const usersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case GET_USERS:
      return [...action.payload];
    case POST_SIGNUP_INFO:
      return [...action.payload];
    default:
      return state;
  }
};

export default usersReducer;
