import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CapturePO_SOW } from "../CapturePO_SOW";
import DenseTable from "../Table";
import FormDialog from "../AddEmpToPO";
// import AddEmpToPO from "../AddEmpToPO";
import store from "../../../../store/index";
Enzyme.configure({ adapter: new Adapter() });

describe("POSOW FORM", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CapturePO_SOW />
        </MemoryRouter>
      </Provider>
    );
  });
  test("testing doc head text", () => {
    expect(wrapper.find(`[data-test="Doc Heading"]`).text()).toContain(
      "PO/SOW"
    );
  });
  test("testing Save Button", () => {
    expect(wrapper.find(`[data-test="POSOW-save-btn"]`).exists()).toBe(true);
  });
  test("testing client Drop down", () => {
    expect(wrapper.find(`[data-test="client-name-dropdown"]`).exists()).toBe(
      true
    );
  });
  test("testing client sponosor check box label", () => {
    expect(
      wrapper.find(`[data-test="client-sponsor-chkBox-label"]`).text()
    ).toContain("Client Sponsor");
  });
  test("testing finance controller check box label", () => {
    expect(
      wrapper.find(`[data-test="client-finController-chkBox-label"]`).text()
    ).toContain("Client Finance Controller");
  });
  test("testing Targeted Resources check Box label", () => {
    expect(
      wrapper.find(`[data-test="TargetedRes-chkBox-label"]`).text()
    ).toContain("Targeted Resources");
  });
  test("testing client sponsor check box input", () => {
    expect(wrapper.find(`[data-test="client ChkBox Input"]`).exists()).toBe(
      true
    );
  });
  test("testing client finance controller check box input", () => {
    expect(
      wrapper.find(`[data-test="client-finController-chkBox-input"]`).exists()
    ).toBe(true);
  });
  test("testing targeted Resources check box input", () => {
    expect(
      wrapper.find(`[data-test="targetedRes-chkBox-input"]`).exists()
    ).toBe(true);
  });
  test("testing doc head text", () => {
    expect(wrapper.find(`[data-test="doc-info-label"]`).text()).toContain(
      "Document information"
    );
  });
  test("testing doc type dropdown input", () => {
    expect(wrapper.find(`[data-test="Doc-Type-dropdown"]`).exists()).toBe(true);
  });
  test("testing PO/SOW textbox input", () => {
    expect(wrapper.find(`[data-test="po-sow-num"]`).exists()).toBe(true);
  });
  test("testing po/sow amount input", () => {
    expect(wrapper.find(`[data-test="po-sow-amt"]`).exists()).toBe(true);
  });
  test("testing currency dropdown input", () => {
    expect(wrapper.find(`[data-test="currency-dropdown"]`).exists()).toBe(true);
  });
  test("testing uploaded doc input", () => {
    expect(
      wrapper.find(`[data-test="uploaded-doc-name-txtBox"]`).exists()
    ).toBe(true);
  });
  test("testing doc type for upload selecter input", () => {
    expect(
      wrapper.find(`[data-test="doc-typeForUpload-dropdown"]`).exists()
    ).toBe(true);
  });
  test("testing doc type for upload selecter input", () => {
    expect(
      wrapper.find(`[data-test="doc-typeForUpload-dropdown"]`).exists()
    ).toBe(true);
  });
  test("testing upload button input", () => {
    expect(wrapper.find(`[data-test="upload-file-input"]`).exists()).toBe(true);
  });

  test("testing comments/remarks text box input", () => {
    expect(wrapper.find(`[data-test="comments-remarks-txtBox"]`).exists()).toBe(
      true
    );
  });
});
describe("POSOW READ/Edit", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CapturePO_SOW editBtn={true} toggleState={false} />
        </MemoryRouter>
      </Provider>
    );
  });
  test("testing download link", () => {
    expect(wrapper.find(`[data-test="download-link"]`).exists()).toBe(true);
  });
  test("testing status label", () => {
    expect(wrapper.find(`[data-test="status-label"]`).text()).toContain(
      "STATUS"
    );
  });
  test("testing edit mode label", () => {
    expect(wrapper.find(`[data-test="editModeSwitch-label"]`).text()).toContain(
      "Edit mode"
    );
  });
  test("testing edit mode toggle check Btn", () => {
    expect(wrapper.find(`[data-test="EditToggleBtn"]`).exists()).toBe(true);
  });
});

describe("Assigned Emp Table", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <DenseTable />
        </MemoryRouter>
      </Provider>
    );
  });
  test("testing table header", () => {
    expect(wrapper.find(`[data-test="emp-table-head"]`).exists()).toBe(true);
  });
  test("testing emp dialog box availaibility on edit btn click", () => {
    expect(wrapper.find(`[data-test="Add-emp-dialogBox"]`).exists()).toBe(true);
  });
  test("testing unassign button availibility", () => {
    expect(wrapper.find(`[data-test="Unassign-emp-btn"]`).exists()).toBe(true);
  });
});
describe("Adding Emp dialog box", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <FormDialog />
        </MemoryRouter>
      </Provider>
    );
  });
  test("testing add plus icon button", () => {
    expect(wrapper.find(`[data-test="plus-icon-btn"]`).exists()).toBe(true);
  });
  // test("testing emp name autocomplete text box input", () => {
  //   expect(
  //     wrapper.find(`[data-test="EmpName-AutoCompleteTxtBox"]`).exists()
  //   ).toBe(true);
  // });
  // test("testing edit button icon", () => {
  //   expect(wrapper.find(`[data-test="edit-btn-icon"]`).exists()).toBe(true);
  // });
});
