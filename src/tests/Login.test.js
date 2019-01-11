import React from "react";
import { Login } from "../containers/Login";
import { mount } from "enzyme";

describe("Login", () => {
  let wrapper = mount(<Login />);

  it("should have a Login Header", () => {
    const mainHeader = wrapper.find("Header").filterWhere(item => {
      return item.text() === "Log In";
    });
    expect(mainHeader).toHaveLength(1);
  });

  it("should have a Form", () => {
    expect(wrapper.find("Form")).toHaveLength(1);
  });

  it("should update the state when email input value changes", () => {
    const emailInput = wrapper.find("input").filterWhere(item => {
      return item.prop("name") === "email";
    });
    emailInput.simulate("change", {
      target: { value: "existing-user@example.com" }
    });
    expect(wrapper.state().email).toBe("existing-user@example.com")
  });

  it("should update the state when password input value changes", () => {
    const passwordInput = wrapper.find("input").filterWhere(item => {
      return item.prop("name") === "password";
    });
    passwordInput.simulate("change", {
      target: { value: "password" }
    });
    expect(wrapper.state().password).toBe("password")
  });

  it("should call handleLogin when the form is submitted", () => {
    const spy = jest.spyOn(wrapper.instance(), "handleLogin");
    wrapper.instance().forceUpdate();
    const submitButton = wrapper.find("Button")
    submitButton.simulate("click");

    expect(spy).toHaveBeenCalledTimes(1);
  })
});

