import React from "react";
import Header from "./Header.jsx";
import { shallow } from "enzyme";

it("header link element checking",()=> {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('Link').length).toBe(2);  
});

