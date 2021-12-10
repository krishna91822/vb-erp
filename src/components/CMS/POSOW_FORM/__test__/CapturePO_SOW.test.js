import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CapturePO_SOW } from "../CapturePO_SOW";
import DenseTable from "../Table";
import FormDialog from "../AddEmpToPO";
import SimpleGrow from "../EmpList";

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
  test("testing response msg dialog box(should not be open)", () => {
    expect(wrapper.find(`[data-test="ResponseMsgDialogBox"]`).exists()).toBe(
      false
    );
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
    expect(wrapper.find(`[data-testid="po-sow-amt"]`).exists()).toBe(true);
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
describe("POSOW READ", () => {
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
  test("testing response msg dialog box(should not be open)", () => {
    expect(wrapper.find(`[data-test="ResponseMsgDialogBox"]`).exists()).toBe(
      false
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

describe("POSOW EDIT", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CapturePO_SOW editBtn={true} toggleState={true} />
        </MemoryRouter>
      </Provider>
    );
  });

  test("testing update button", () => {
    expect(wrapper.find(`[data-test="UpdateBtn"]`).exists()).toBe(true);
  });
  test("testing response msg dialog box(should not be open)", () => {
    expect(wrapper.find(`[data-test="ResponseMsgDialogBox"]`).exists()).toBe(
      false
    );
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
  const setup = () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FormDialog edit={true} />
        </MemoryRouter>
      </Provider>
    );
    return container;
  };
  test("edit button should open form dialog", () => {
    const component = setup();
    const editformDialog = getByTestId(component, "editBtn");
    fireEvent.click(editformDialog);
  });
});
describe("testing on change/click on capture new PO/SOW page", () => {
  const setup = () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CapturePO_SOW editBtn={false} toggleState={false} />
        </MemoryRouter>
      </Provider>
    );
    return container;
  };
  test("should call onChange of poSowAmt txt box", () => {
    const component = setup();
    const poAmt = getByTestId(component, "po-sow-amt");
    fireEvent.change(poAmt, { target: { value: 23 } });
    expect(poAmt.value).toBe("23");
  });
  test("should call onChange of poSowNum txt box", () => {
    const component = setup();
    const poSowNum = getByTestId(component, "po-sow-num");
    fireEvent.change(poSowNum, { target: { value: "abc123" } });
    expect(poSowNum.value).toBe("abc123");
  });
  test("should call onChange of poSowNum dropdown", () => {
    const component = setup();
    const type = getByTestId(component, "Doc-Type-dropdown");
    fireEvent.change(type, { target: { value: "SOW" } });
    expect(type.value).toBe("SOW");
  });
  test("should call onChange of clientname dropdown", () => {
    const component = setup();
    const clientNameDropDown = getByTestId(
      component,
      "clientNameDropdown-ChangeTest"
    );
    fireEvent.change(clientNameDropDown, { target: { value: "Nasdaq" } });
    expect(clientNameDropDown.value).toBe("Nasdaq");
  });
  test("should call onChange of projects dropdown", () => {
    const component = setup();
    const projectDropdown = getByTestId(
      component,
      "projectDropdown-ChangeTest"
    );
    fireEvent.change(projectDropdown, { target: { value: "project x" } });
    expect(projectDropdown.value).toBe("project x");
  });
  test("should call onChange of clientsponsor checkbox", () => {
    const component = setup();
    const ClientSponosrChkBox = getByTestId(component, "clientSponers1");
    fireEvent.click(ClientSponosrChkBox);
  });
  test("should call onChange of client fin controller checkboxs", () => {
    const component = setup();
    const ClientFinControllerChkBox = getByTestId(component, "clientfinCont1");
    fireEvent.click(ClientFinControllerChkBox);
  });
  test("should call onChange of client fin controller checkboxs", () => {
    const component = setup();
    const targetedResChkBox = getByTestId(component, "targetedRes1");
    fireEvent.click(targetedResChkBox);
  });
  test("should call onChange of currency dropdown", () => {
    const component = setup();
    const currencyDropdown = getByTestId(
      component,
      "currencyDropdown-onChangeTest"
    );
    fireEvent.change(currencyDropdown, { target: { value: "INR" } });
    expect(currencyDropdown.value).toBe("INR");
  });
  test("should call onChange of upload doc type dropdown", () => {
    const component = setup();
    const UploadDocTypeDropdown = getByTestId(
      component,
      "UploadDocTypeDropdown"
    );
    fireEvent.change(UploadDocTypeDropdown, { target: { value: ".pdf" } });
    expect(UploadDocTypeDropdown.value).toBe(".pdf");
  });

  test("should call onChange of remarks textbox", () => {
    const component = setup();
    const remarksTxtBox = getByTestId(component, "RemarksTxtBox");
    fireEvent.change(remarksTxtBox, { target: { value: "some remarks" } });
    expect(remarksTxtBox.value).toBe("some remarks");
  });
  test("save button event triggered on click", () => {
    const component = setup();
    const saveBtn = getByTestId(component, "save-btn");
    fireEvent.click(saveBtn);
  });
  test("upload button event triggered on click", () => {
    const component = setup();
    const uploadBtn = getByTestId(component, "upload-file-input-ClickTest");
    fireEvent.change(uploadBtn);
  });
});
describe("testing send for approval button", () => {
  const setup = () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CapturePO_SOW editBtn={true} toggleState={false} />
        </MemoryRouter>
      </Provider>
    );
    return container;
  };
  test("send for approval button event triggered on click", () => {
    const component = setup();
    const sendForApprovalBtn = getByTestId(
      component,
      "sendForApproval-btn-ClickTest"
    );
    fireEvent.click(sendForApprovalBtn);
  });
  test("edit toggle button should change state", () => {
    const component = setup();
    const edittoggleBtn = getByTestId(component, "EditToggleBtn");
    fireEvent.click(edittoggleBtn);
    expect(edittoggleBtn.checked).toEqual(true);
  });
});
describe("testing simplegrow", () => {
  const setup = () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SimpleGrow />
        </MemoryRouter>
      </Provider>
    );
    return container;
  };
  test("testing if simplegrow renders", () => {
    const component = setup();
    const expandAssignedEmpToggleSwitch = getByTestId(
      component,
      "empListGrowin"
    );
    fireEvent.click(expandAssignedEmpToggleSwitch);
  });
});
