import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Invoice from "../Invoice";
import date from "../date";
import dialog from "../dialog";

// import AddEmpToPO from "../AddEmpToPO";
import {
  render,
  fireEvent,
  getByTestId,
  waitFor,
} from "@testing-library/react";
import { shallow } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";
import store from "../../../../store/index";
import { DatePicker } from "@mui/lab";
Enzyme.configure({ adapter: new Adapter() });

describe("INVOICE FORM", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Invoice invoicereceived={true} />
        </MemoryRouter>
      </Provider>
    );
  });
  test("testing doc head text", () => {
    expect(wrapper.find(`[data-test="mainheading"]`).text()).toContain(
      "Invoice"
    );
  });
  test("testing doc sub head text", () => {
    expect(wrapper.find(`[data-test="poheading"]`).text()).toContain(
      "PO Information"
    );
  });
  test("testing Save Button", () => {
    expect(wrapper.find(`[data-test="invoicesavebtn"]`).exists()).toBe(true);
  });

  test("testing project name label", () => {
    expect(wrapper.find(`[data-test="projectnamelabel"]`).text()).toContain(
      "Project Name"
    );
  });
  test("testing project name Drop down", () => {
    expect(wrapper.find(`[data-test="projectname"]`).exists()).toBe(true);
  });
  test("testing client name label", () => {
    expect(wrapper.find(`[data-test="clientnamelabel"]`).text()).toContain(
      "Client Name"
    );
  });
  ////////////////////////////////////////////////
  test("testing client sponsor label", () => {
    expect(wrapper.find(`[data-test="clientsponsorlabel"]`).text()).toContain(
      "Client Sponsor"
    );
  });
  test("testing client finance controller label", () => {
    expect(wrapper.find(`[data-test="clientfinancelabel"]`).text()).toContain(
      "Client Finance Controller"
    );
  });
  test("testing client po amt label", () => {
    expect(wrapper.find(`[data-test="clientpoamtlabel"]`).text()).toContain(
      "PO Amount"
    );
  });
  test("testing client name label", () => {
    expect(wrapper.find(`[data-test="clientponumberlabel"]`).text()).toContain(
      "PO Number"
    );
  });
  test("testing client po amt left label", () => {
    expect(wrapper.find(`[data-test="clientpoamtleft"]`).text()).toContain(
      "PO Amount Left"
    );
  });
  test("testing invoice status heading", () => {
    expect(wrapper.find(`[data-test="invoiceh3"]`).text()).toContain(
      "Invoice Status"
    );
  });
  /////////////////////////////////////
  test("testing invoice raised label heading", () => {
    expect(wrapper.find(`[data-test="invoiceraised"]`).text()).toContain(
      "Invoice raised"
    );
  });
  test("testing invoice amt received label", () => {
    expect(wrapper.find(`[data-test="invoiceamtreceived"]`).text()).toContain(
      "Invoice amount received"
    );
  });
  test("testing VB Bank Account heading", () => {
    expect(wrapper.find(`[data-test="vbbank"]`).text()).toContain(
      "VB Bank Account"
    );
  });
  test("testing Amount Received on heading", () => {
    expect(wrapper.find(`[data-test="invoicedate"]`).text()).toContain(
      "Amount Received on"
    );
  });
  //----------------------------------------------------------------------------------
  describe("testing on change/click on capture new Invoice page", () => {
    const setup = () => {
      const { container } = render(
        <Provider store={store}>
          <MemoryRouter>
            <Invoice invoicereceived={true} />
          </MemoryRouter>
        </Provider>
      );
      return container;
    };
    test("should call onChange of projects dropdown", () => {
      const component = setup();
      const projectDropdown = getByTestId(component, "projectselecttest");
      fireEvent.change(projectDropdown, { target: { value: "" } });
      expect(projectDropdown.value).toBe("");
    });
    ////////////////////////////
    test("should call onChange of client dropdown", () => {
      const component = setup();
      const clientdropdown = getByTestId(component, "clientselecttest");
      fireEvent.change(clientdropdown, { target: { value: "" } });
      expect(clientdropdown.value).toBe("");
    });
    test("should call onChange of Finance controller dropdown", () => {
      const component = setup();
      const clientfinance = getByTestId(component, "clientfinancetest");
      fireEvent.change(clientfinance, { target: { value: "" } });
      expect(clientfinance.value).toBe("");
    });
    test("should call onChange of Invoice raised dropdown", () => {
      const component = setup();
      const invoiceraised = getByTestId(component, "invoiceraisedtest");
      fireEvent.change(invoiceraised, { target: { value: "" } });
      expect(invoiceraised.value).toBe("");
    });

    test("should call onChange of Invoice amt received dropdown", () => {
      const component = setup();
      const invamtreceived = getByTestId(component, "invoiceamttest");
      fireEvent.change(invamtreceived, { target: { value: "" } });
      expect(invamtreceived.value).toBe("");
    });

    test("should call onChange of Invoice raised dropdown", () => {
      const component = setup();
      const vbbank = getByTestId(component, "vbbanktest");
      fireEvent.change(vbbank, { target: { value: "" } });
      expect(vbbank.value).toBe("");
    });
  });
});
