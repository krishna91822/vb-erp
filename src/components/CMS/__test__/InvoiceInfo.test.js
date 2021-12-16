/* eslint-disable prettier/prettier */
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import InvoiceInfo from "../InvoiceInfo";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import store from "../../../../src/store/index";
import {
  fireEvent,
  getByTestId,
  waitFor,
  screen,
} from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe("Main POSOW Tab view page", () => {
  let wrapper, row, node;
  let table;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <InvoiceInfo />
        </MemoryRouter>
      </Provider>
    );
    table = wrapper.find(".Table-row-po-sow");
    row = table.find(".table-row-posow");
    node = table.find("TableCell");
  });
  test("Header testing", () => {
    expect(wrapper.find(`[data-test="MainHeading"]`).text()).toContain(
      "Invoice Information"
    );
  });
  test("Sort by button testing", () => {
    expect(wrapper.find(".sort-by-button").first().text()).toContain("Sort by");
  });
  test("Capture Button test", () => {
    expect(wrapper.find(".button1").exists()).toBe(true);
  });
  test("Capture Button test", () => {
    expect(wrapper.find(".button1").text()).toContain("Capture Invoice");
  });
  test("Table row testing", () => {
    expect(wrapper.find(".Table-row-po-sow").first().text()).toContain(
      "IDClient NameProject NamePO/SOW OrderPO/SOW AmountInvoice raisedInvoice Amount received"
    );
  });
  test("Table row testing", () => {
    // console.log(wrapper.find(".table-row-posow").first())
  });
  test("Menu items testing", () => {
    // console.log(wrapper.find(".menu-by-id").first().exists())
  });
  test("Pagination testing", () => {
    expect(wrapper.find(".Pagination").exists()).toBe(true);
  });
  test("Pagination testing", () => {
    expect(wrapper.find(".Pagination").text()).toContain("Page:");
  });
  test("Numbering testing", () => {
    expect(wrapper.find(".numbering").exists()).toBe(true);
  });
  test("table cell testing", () => {
    console.log(wrapper.find(".table-cell").exists());
  });
  test("table grid", () => {
    expect(table).toHaveLength(3);
    expect(row).toHaveLength(3);
    expect(node).toHaveLength(0);
  });
  it("Table row", () => {
    console.log(row.find(".table-cell").exists());
  });
});
describe("59892259", () => {
  const setup = () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <InvoiceInfo />
        </MemoryRouter>
      </Provider>
    );
    return container;
  };
  test("Capture PO/SOW was clicked", () => {
    const component = setup();
    fireEvent.click(component.querySelector(".button1"));
  });
  test("edit button should open form dialog", () => {
    const component = setup();
    const type = screen.getByText(/Sort by/i);
    //console.log(type)
    fireEvent.click(type);
  });
});
