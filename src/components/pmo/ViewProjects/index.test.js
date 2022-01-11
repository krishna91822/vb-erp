import Enzyme, { mount } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../../../store";
import ViewProjects from "./index";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => {
  return mount(
    <MemoryRouter>
      <Provider store={store}>
        <ViewProjects />
      </Provider>
    </MemoryRouter>
  );
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
describe("ViewProjects Testing", () => {
  test("ViewProjects is defined", () => {
    expect(ViewProjects).toBeDefined();
  });

  test("check the main heading", () => {
    const wrapper = setup();
    const adminName = findByTestAttr(wrapper, "main-heading");
    expect(adminName.exists()).toBe(true);
  });

  test("check the (create project) button", () => {
    const wrapper = setup();
    const createProjectButton = findByTestAttr(
      wrapper,
      "create-project-button"
    );
    expect(createProjectButton.exists()).toBe(false);
  });

  test("Check the table", () => {
    const wrapper = setup();
    const listTable = findByTestAttr(wrapper, "list-table");
    expect(listTable.exists()).toBe(true);
  });

  test("Check the sort by drop down", () => {
    const wrapper = setup();
    const sortByDropDown = findByTestAttr(wrapper, "sortby-dropdown");
    expect(sortByDropDown.exists()).toBe(true);
  });
});
