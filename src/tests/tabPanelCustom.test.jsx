import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import TabPanel from "../components/templates/tabPanelCustom.component";
import { ThemeProvider } from "@mui/system";
import store from "../store";
import { theme } from "../theme";

describe("Tab Panel component testing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <TabPanel />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  test("Component to be defined", () => {
    expect(wrapper).toBeDefined();
  });

  test("Edit Mode Switch is there", () => {
    expect(wrapper.find(`[data-test="tab-panel-test"]`).exists()).toBe(true);
  });
});
