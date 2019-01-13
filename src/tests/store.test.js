import store from "../store";

describe("Store", () => {
  it("should update", async () => {
    await store.dispatch({
      type: "GET_USERS",
      payload: ["Run the tests"]
    });

    expect(store.getState()).toEqual({
      users: ["Run the tests"]
    });
  });
  
  it("should update after signup", async () => {
    await store.dispatch({
      type: "POST_SIGNUP_INFO",
      payload: ["Rerun them"]
    });

    expect(store.getState()).toEqual({
      users: ["Rerun them"]
    });
  });
});
