import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { postLogInInfo } from "../actions/postLogInInfoAction";
import { POST_LOGIN_INFO } from "../types";
import loginResponse from "../fixtures/login";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe("postLogInInfo action", () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("posts login info to an external api", () => {
    const expectedActions = [
      { type: POST_LOGIN_INFO, payload: loginResponse }
    ];
    moxios.stubRequest("http://localhost:3000/users/sign_in", {
      status: 200,
      response: loginResponse
    });

    return store
      .dispatch(
        postLogInInfo({ email: "premium@premi.um", password: "premium123" })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
