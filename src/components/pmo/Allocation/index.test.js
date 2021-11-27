import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import Allocation from "./index";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => {
  return mount(<Allocation />);
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

describe("Allocations testing", () => {
  test("check the admin", () => {
    const wrapper = setup();
    const adminName = findByTestAttr(wrapper, "admin-name");
    expect(adminName.exists()).toBe(true);
  });

  test("check the dropdown", () => {
    const wrapper = setup();
    const adminName = findByTestAttr(wrapper, "sortby-dropdown");
    expect(adminName.exists()).toBe(true);
  });

  test("check the heading", () => {
    const wrapper = setup();
    const adminName = findByTestAttr(wrapper, "main-heading");
    expect(adminName.exists()).toBe(true);
  });
});
