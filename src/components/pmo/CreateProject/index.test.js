import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import CreateProject from "./index";
import store from "../../../store";
Enzyme.configure({ adapter: new Adapter() });
describe("User Name testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateProject />
        </MemoryRouter>
      </Provider>
    );
  });

  test("testing page title", () => {
    expect(wrapper.find(`[data-test="page-title"]`).text()).toContain("PMO");
  });
  test("testing form title", () => {
    expect(wrapper.find(`[data-test="form-title"]`).text()).toContain(
      "Project Information"
    );
  });
  test("testing project-id", () => {
    expect(wrapper.find(`[data-test="project-id"]`).text()).toContain(
      "Project Id"
    );
  });
  test("testing create project form", () => {
    expect(wrapper.find(`[data-test="create-project-form"]`).exists()).toBe(
      true
    );
  });
  test("testing submit button", () => {
    expect(wrapper.find(`[data-test="submit-button"]`).exists()).toBe(true);
  });
  test("testing client name label", () => {
    expect(wrapper.find(`[data-test="client-name-label"]`).text()).toContain(
      "Client Name"
    );
  });
  test("testing client name input", () => {
    expect(wrapper.find(`[data-test="client-name-input"]`).exists()).toBe(true);
  });

  test("testing project name input", () => {
    expect(wrapper.find(`[data-test="project-name-input"]`).exists()).toBe(
      true
    );
  });

  test("testing client project manager label", () => {
    expect(
      wrapper.find(`[data-test="client-project-manager-label"]`).text()
    ).toContain("Client Project Manager");
  });
  test("testing client project manager input", () => {
    expect(
      wrapper.find(`[data-test="client-project-manager-input"]`).exists()
    ).toBe(true);
  });
  test("testing client primary contact label", () => {
    expect(
      wrapper.find(`[data-test="client-primary-contact-label"]`).text()
    ).toContain("Client Primary Contact");
  });
  test("testing client primary contact input", () => {
    expect(
      wrapper.find(`[data-test="client-project-manager-input"]`).exists()
    ).toBe(true);
  });
  test("testing client project sponsor label", () => {
    expect(
      wrapper.find(`[data-test="client-project-sponsor-label"]`).text()
    ).toContain("Client Project Sponsor");
  });
  test("testing client project sponsor input", () => {
    expect(
      wrapper.find(`[data-test="client-project-sponsor-input"]`).exists()
    ).toBe(true);
  });
  test("testing Domain/Sector label", () => {
    expect(wrapper.find(`[data-test="domain-sector-label"]`).text()).toContain(
      "Domain/Sector"
    );
  });
  test("testing Domain/Sector input", () => {
    expect(wrapper.find(`[data-test="domain-sector-input"]`).exists()).toBe(
      true
    );
  });
  test("testing Client Finance Controller label", () => {
    expect(
      wrapper.find(`[data-test="client-finance-controller-label"]`).text()
    ).toContain("Client Finance Controller");
  });
  test("testing Client Finance Controller input", () => {
    expect(
      wrapper.find(`[data-test="client-finance-controller-input"]`).exists()
    ).toBe(true);
  });
  test("testing Start Date label", () => {
    expect(wrapper.find(`[data-test="start-date-label"]`).text()).toContain(
      "Start Date"
    );
  });
  test("testing Start Date input", () => {
    expect(wrapper.find(`[data-test="start-date-input"]`).exists()).toBe(true);
  });
  test("testing End Date label", () => {
    expect(wrapper.find(`[data-test="end-date-label"]`).text()).toContain(
      "End Date"
    );
  });
  test("testing End Date input", () => {
    expect(wrapper.find(`[data-test="end-date-input"]`).exists()).toBe(true);
  });
  test("testing VB Project Manager label", () => {
    expect(
      wrapper.find(`[data-test="vb-project-manager-label"]`).text()
    ).toContain("VB Project Manager");
  });
  test("testing VB Project Manager input", () => {
    expect(
      wrapper.find(`[data-test="vb-project-manager-input"]`).exists()
    ).toBe(false);
  });
  test("testing Project Status label", () => {
    expect(wrapper.find(`[data-test="project-status-label"]`).text()).toContain(
      "Project Status"
    );
  });
  test("testing Project Status input", () => {
    expect(wrapper.find(`[data-test="project-status-input"]`).exists()).toBe(
      true
    );
  });
});
