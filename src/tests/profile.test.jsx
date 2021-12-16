import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Profile from "../pages/myProfile/profile.component";
import { ThemeProvider } from "@mui/system";
import store from "../store";
import { theme } from "../theme";

describe("Profile component testing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Profile />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  test("Component to be defined", () => {
    expect(wrapper).toBeDefined();
  });

  test("Profile Page is there", () => {
    expect(wrapper.find(`[data-test="profile-page-test"]`).exists()).toBe(true);
  });
});
