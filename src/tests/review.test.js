import Enzyme, { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Review from "../pages/review/review.component ";
import { ThemeProvider } from "@mui/system";
import store from "../store";
import { theme } from "../theme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { screen } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe("Review Page testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <Review />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  });

  test("Component to be defined", () => {
    expect(wrapper).toBeDefined();
  });

  test("testing Sort bar", () => {
    expect(wrapper.find(`[data-test="Sort-test"]`).exists()).toBe(true);
  });
  test("testing search bar", () => {
    expect(wrapper.find(`[data-test="Search By Req Name-test"]`).exists()).toBe(
      true
    );
  });
  test("testing labels", () => {
    expect(wrapper.find(`[data-test="reject-status-label"]`).exists()).toBe(
      false
    );
  });

  test("testing labels", () => {
    expect(wrapper.find(`[data-test="approve-status-label"]`).exists()).toBe(
      false
    );
  });

  test("button", () => {
    expect(screen.findByTitle("Approve"));
  });

  test("button", () => {
    expect(screen.findByTitle("Reject"));
  });
});
