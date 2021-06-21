import App from "./App";

import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a shallow wrapped for the app component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

/**
 * Factory function to find the attribute by data-test value
 * @function findByTestAttr
 * @returns Array of all the nodes that contains this test-data value
 */
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without errors", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "app-component");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "counter-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("render counter display starts at 0", () => {
  const wrapper = setup();
  const initialCount = findByTestAttr(wrapper, "count").text();
  expect(initialCount).toBe("0");
});

// In the below test we need to decide whether we will test the display - functionality
// Or the implementation - that is the actual function that causes the count to increment
test("clicking button increments the counter display", () => {
  const wrapper = setup();

  // Find the button element
  const button = findByTestAttr(wrapper, "counter-button");

  // Simulate click of the button using simulate method from enzyme
  button.simulate("click");

  // Find the count element and check if the count got incremented
  const counterDisplay = findByTestAttr(wrapper, "count").text();

  expect(counterDisplay).toBe("1");
});

test("render the decrement button", () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  expect(decrementButton.length).toBe(1);
});

test("clicking the butt(on starts decrementing the count", () => {
  const wrapper = setup();

  // find the increment and decrement button
  const decrementButton = findByTestAttr(wrapper, "decrement-button");
  const incrementButton = findByTestAttr(wrapper, "counter-button");

  // increase the count by 1 and then decrement it
  incrementButton.simulate("click");
  decrementButton.simulate("click");

  // get the displayed count value
  const displayCount = findByTestAttr(wrapper, "count").text();

  // assert this value to be 0
  expect(displayCount).toBe("0");
});

test("render the error message when the count goes below zero", () => {
  const wrapper = setup();

  // find the decrement button
  const decrementButton = findByTestAttr(wrapper, "decrement-button");

  decrementButton.simulate("click");

  const error = findByTestAttr(wrapper, "error");

  expect(error.length).toBe(1);
});

test("ensure that the display count value does not go below zero", () => {
  const wrapper = setup();

  // find the decrement button
  const decrementButton = findByTestAttr(wrapper, "decrement-button");

  decrementButton.simulate("click");

  const displayCount = findByTestAttr(wrapper, "count").text();

  expect(displayCount).toBe("0");
});

test("ensure that the error message is cleared when the user clicks on the increment button", () => {
  const wrapper = setup();

  // find the decrement count button and click on it
  const decrementButton = findByTestAttr(wrapper, "decrement-button");

  decrementButton.simulate("click");

  // Check if error message is displayed
  let error = findByTestAttr(wrapper, "error");
  expect(error.length).toBe(1);

  // find the increment count button and click on it
  const incrementButton = findByTestAttr(wrapper, "counter-button");
  incrementButton.simulate("click");

  // find the error message and ensure that it cannot be found
  error = findByTestAttr(wrapper, "error");
  expect(error.length).toBe(0);
});
