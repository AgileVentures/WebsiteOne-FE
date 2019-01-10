import React from "react";
import Login from "../containers/Login";
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
});
