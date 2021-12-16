import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import EditMode from "../components/templates/editMode/editMode.component";
import { ThemeProvider } from "@mui/system";
import store from "../store";
import { theme } from "../theme";

describe("Edit Mode component testing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <EditMode />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  test("Component to be defined", () => {
    expect(wrapper).toBeDefined();
  });

  test("Edit Mode is there", () => {
    expect(wrapper.find(`[data-test="edit-mode-test"]`).exists()).toBe(true);
  });

  test("Edit Mode tesxt is there", () => {
    expect(wrapper.find(`[data-test="edit-text-test"]`).exists()).toBe(true);
  });

  test("Edit Mode Switch is there", () => {
    expect(wrapper.find(`[data-test="edit-switch-test"]`).exists()).toBe(true);
  });
});
