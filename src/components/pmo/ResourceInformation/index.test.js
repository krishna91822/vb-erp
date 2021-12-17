import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Provider } from "react-redux";

import ResourceInformation from "./index";
import store from "../../../store";

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  return shallow(
    <Provider store={store}>
      <ResourceInformation />
    </Provider>
  );
};

describe("Resource Information Testing", () => {
  test("testing resource head text", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="resource-head"]`).length).toBe(0);
  });
  test("testing associate input", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="associate-input"]`).exists()).toBe(false);
  });
  test("testing start date heading", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="start-date"]`).exists()).toBe(false);
  });
  test("testing start date input", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="start-date-input"]`).exists()).toBe(false);
  });
  test("testing end date heading", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="end-date"]`).exists()).toBe(false);
  });
  test("testing end date input", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="end-date-input"]`).exists()).toBe(false);
  });
  test("testing allocation heading", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="allocation"]`).exists()).toBe(false);
  });
  test("testing allocation input", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="allocation-input"]`).exists()).toBe(false);
  });
  test("testing rack-rate heading", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="rack-rate"]`).exists()).toBe(false);
  });
  test("testing rack-rate input", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="rack-rate-input"]`).exists()).toBe(false);
  });
  test("testing associate table", () => {
    const wrapper = setup();
    expect(wrapper.find(`[data-test="associate-table"]`).length).toBe(0);
  });
});
