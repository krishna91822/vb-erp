import { mount } from "enzyme";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Network from "../pages/network/network.component";
import { ThemeProvider } from "@mui/system";
import store from "../store";
import { theme } from "../theme";

describe("Network component testing", () => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Network />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  test("Component to be defined", () => {
    expect(wrapper).toBeDefined();
  });

  test("Table heading row is present", () => {
    expect(wrapper.find(`[data-test="networkTableHead"]`).exists()).toBe(true);
  });

  test("Search bar is there", () => {
    expect(wrapper.find(`[data-test="search-bar-test"]`).exists()).toBe(true);
  });

  test("Sort is there", () => {
    expect(wrapper.find(`[data-test="sort-test"]`).exists()).toBe(true);
  });

  test("Pagination is there", () => {
    expect(wrapper.find(`[data-test="pagination-test"]`).exists()).toBe(true);
  });

  test("Network Page is there", () => {
    expect(wrapper.find(`[data-test="network-page-test"]`).exists()).toBe(true);
  });
});
