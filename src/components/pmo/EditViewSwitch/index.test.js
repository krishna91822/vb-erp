import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import EditViewSwitchs from "./index";
import store from "../../../store";
Enzyme.configure({ adapter: new Adapter() });
describe("User Name testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <EditViewSwitchs />
        </MemoryRouter>
      </Provider>
    );
  });
  test("testing edit mode span", () => {
    expect(wrapper.find(`[data-test="edit-mode-title"]`).text()).toContain(
      "Edit Mode"
    );
  });
  test("testing edit mode formgroup", () => {
    expect(wrapper.find(`[data-test="edit-mode-formgroup"]`).exists()).toBe(
      true
    );
  });
});
