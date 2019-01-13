import React from "react";
import { SignUp } from "../containers/SignUp";
import { mount } from "enzyme";

describe("SignUp", () => {
  let wrapper = mount(
    <SignUp postSignUpInfo={jest.fn(() => Promise.resolve({}))} />
  );

  const emailInput = wrapper.find("input").filterWhere(item => {
    return item.prop("name") === "email";
  });

  const passwordInput = wrapper.find("input").filterWhere(item => {
    return item.prop("name") === "password";
  });

  it("should have a SignUp Header", () => {
    const mainHeader = wrapper.find("Header").filterWhere(item => {
      return item.text() === "Sign Up";
    });
    expect(mainHeader).toHaveLength(1);
  });

  it("should have a Form", () => {
    expect(wrapper.find("Form")).toHaveLength(1);
  });

  it("should update the state when email input value changes", () => {
    emailInput.simulate("change", {
      target: { value: "existing-user@example.com" }
    });
    expect(wrapper.state().email).toBe("existing-user@example.com");
  });

  it("should update the state when password input value changes", () => {
    passwordInput.simulate("change", {
      target: { value: "password" }
    });
    expect(wrapper.state().password).toBe("password");
  });

  it("should call handleSignUp and postSignUpInfo when the form is submitted", async () => {
    const spy = jest.spyOn(wrapper.instance(), "handleSignUp");
    wrapper.instance().forceUpdate();

    emailInput.simulate("change", {
      target: { value: "existing-user@example.com" }
    });

    passwordInput.simulate("change", {
      target: { value: "password" }
    });

    const submitForm = wrapper.find("Form");
    submitForm.simulate("submit");

    expect(spy).toHaveBeenCalledTimes(1);
    await expect(wrapper.instance().props.postSignUpInfo).toBeCalledTimes(1);
  });
});