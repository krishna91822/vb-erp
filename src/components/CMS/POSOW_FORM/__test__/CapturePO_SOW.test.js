import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CapturePO_SOW } from "../CapturePO_SOW";

import {
  render,
  fireEvent,
  getByTestId,
  waitFor,
  within,
  querySelector,
  getByRole,
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
  // test("testing Save Button", () => {
  //   expect(wrapper.find(`[data-test="POSOW-save-btn"]`).exists()).toBe(true);
  // });

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

  test("testing doc type dropdown input", () => {
    expect(wrapper.find(`[data-test="Doc-Type-dropdown"]`).exists()).toBe(true);
  });
  test("testing PO/SOW textbox input", () => {
    expect(wrapper.find(`[data-test="po-sow-num"]`).exists()).toBe(false);
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

  test("testing download link", () => {
    expect(wrapper.find(`[data-test="download-link"]`).exists()).toBe(true);
  });
});

// describe("POSOW EDIT", () => {
//   let wrapper;
//   beforeEach(() => {
//     wrapper = mount(
//       <Provider store={store}>
//         <MemoryRouter>
//           <CapturePO_SOW editBtn={true} toggleState={true} />
//         </MemoryRouter>
//       </Provider>
//     );
//   });
// });

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
  test("should call onChange of doc type dropdown", () => {
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
    const input = within(clientNameDropDown).getByRole("textbox");

    clientNameDropDown.focus();
    fireEvent.change(input, { target: { value: "" } });
  });
  test("should call onChange of projects dropdown", () => {
    const component = setup();
    const projectDropdown = getByTestId(
      component,
      "projectDropdown-ChangeTest"
    );
    const input = within(projectDropdown).getByRole("textbox");
    projectDropdown.focus();
    fireEvent.change(input, { target: { value: "" } });
  });

  // test("should call onChange of client fin controller checkboxs", () => {
  //   const component = setup();
  //   const targetedResChkBox = getByTestId(component, "targetedRes");
  //   fireEvent.click(targetedResChkBox);
  // });
  test("should call onChange of currency dropdown", () => {
    const component = setup();
    const currencyDropdown = getByTestId(
      component,
      "currencyDropdown-onChangeTest"
    );
    fireEvent.change(currencyDropdown, { target: { value: "INR" } });
    expect(currencyDropdown.value).toBe("INR");
  });

  test("should call onChange of remarks textbox", () => {
    const component = setup();
    const remarksTxtBox = getByTestId(component, "RemarksTxtBox");
    fireEvent.change(remarksTxtBox, { target: { value: "some remarks" } });
    expect(remarksTxtBox.value).toBe("some remarks");
  });
  // test("save button event triggered on click", () => {
  //   const component = setup();
  //   const saveBtn = getByTestId(component, "save-btn");
  //   fireEvent.click(saveBtn);
  // });
  test("upload button event triggered on click", () => {
    const component = setup();
    const uploadBtn = getByTestId(component, "upload-file-input-ClickTest");
    fireEvent.change(uploadBtn);
  });
});
// describe("testing send for approval button", () => {
//   const setup = () => {
//     const { container } = render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <CapturePO_SOW editBtn={true} toggleState={false} />
//         </MemoryRouter>
//       </Provider>
//     );
//     return container;
//   };
//   test("send for approval button event triggered on click", () => {
//     const component = setup();
//     const sendForApprovalBtn = getByTestId(
//       component,
//       "sendForApproval-btn-ClickTest"
//     );
//     fireEvent.click(sendForApprovalBtn);
//   });
//   test("edit toggle button should change state", () => {
//     const component = setup();
//     const edittoggleBtn = getByTestId(component, "EditToggleBtn");
//     fireEvent.click(edittoggleBtn);
//     expect(edittoggleBtn.checked).toEqual(true);
//   });
// });
