/* eslint-disable prettier/prettier */
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Main, StyledMenu } from "../Main";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import store from "../../../../src/store/index";
import {
  fireEvent,
  getByTestId,
  waitFor,
  screen,
  getByPlaceholderText,
  queryByTestId,
} from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe("Main POSOW Tab view page", () => {
  let wrapper, row, node;
  let table;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );
    table = wrapper.find(".Table-row-po-sow");
    row = table.find(".table-row-posow");
    node = table.find("TableCell");
  });
  test("Header testing", () => {
    expect(wrapper.find(`[data-test="MainHeading"]`).text()).toContain(
      "PO/SOW's Information"
    );
  });
  test("Sort by button testing", () => {
    expect(wrapper.find(`[data-test="SortByButton"]`).first().text()).toContain(
      "Sort by"
    );
  });
  test("StyledMenu", () => {
    expect(wrapper.find(`[data-test="StyledMenu"]`).first().text()).toContain(
      ""
    );
  });
  test("Capture Button test", () => {
    expect(wrapper.find(".button1").exists()).toBe(true);
  });
  test("Capture Button test", () => {
    expect(wrapper.find(".button1").text()).toContain("Capture PO/SOW");
  });
  test("Table row testing", () => {
    expect(wrapper.find(".Table-row-po-sow").first().text()).toContain(
      "IDClient NameProject NamePO/SOW NumberPO/SOW AmountClient SponsorActionStatus"
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
    //console.log(wrapper.find(".table-cell").exists())
  });
  test("table grid", () => {
    expect(table).toHaveLength(3);
    expect(row).toHaveLength(3);
    expect(node).toHaveLength(0);
  });
  it("Table row", () => {
    //console.log(row.find(".table-cell").exists())
  });
});
describe("59892259", () => {
  const setup = () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      </Provider>
    );
    return container;
  };
  test("Capture PO/SOW was clicked", () => {
    const component = setup();
    fireEvent.click(component.querySelector(".button1"));
  });
  test("Sort by button click test", () => {
    const component = setup();
    const type = screen.getByText(/Sort by/i);
    //console.log(type)
    fireEvent.click(type);
  });
  test("Capture POSOW testing", () => {
    const component = setup();
    const type = screen.getByText(/Capture/i);
    fireEvent.click(type);
  });
  test("Capture POSOW testing", () => {
    const component = setup();
    // const type = screen.getByText(/Nasdaq/i);
    // fireEvent.click(type);
  });
  test("row clickable", () => {
    const component = setup();
    const rows = queryByTestId(component, "row-click2");
    // fireEvent.click(rows);
  });
  test("StyleMenu clickable", () => {
    const component = setup();
    const rows = queryByTestId(component, "row-click-1");
    console.log(rows);
  });
});
