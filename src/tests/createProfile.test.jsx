import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CreateProfile from "../pages/createProfile/createProfile.component";
import { ThemeProvider } from "@mui/system";
import store from "../store";
import { theme } from "../theme";

describe("Create Profile component testing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CreateProfile />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  test("Component to be defined", () => {
    expect(wrapper).toBeDefined();
  });

  test("Spinner is there", () => {
    expect(wrapper.find(`[data-test="spinner-test"]`).exists()).toBe(true);
  });
});
