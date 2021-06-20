import App from "./App";

import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

test("renders without errors", () => {
  const wrapper = shallow(<App />);
  const appComponent = wrapper.find("[data-test='app-component']");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {});

test("renders counter display", () => {});

test("render counter display starts at 0", () => {});

// In the below test we need to decide whether we will test the display - functionality
// Or the implementation - that is the actual function that causes the count to increment
test("clicking button increments the counter display", () => {});
