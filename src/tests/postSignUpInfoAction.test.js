import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { postSignUpInfo } from "../actions/postSignUpInfoAction";
import { POST_SIGNUP_INFO } from "../types";
import signUpResponse from "../fixtures/signUp";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe("postSignUpInfo action", () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("posts signup info to an external api", () => {
    const expectedActions = [
      { type: POST_SIGNUP_INFO, payload: signUpResponse }
    ];
    moxios.stubRequest("http://localhost:3000/users", {
      status: 200,
      response: signUpResponse
    });

    return store
      .dispatch(
        postSignUpInfo({
          email: "premium@premi.um",
          password: "premium123",
          password_confirmation: "premium123"
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
