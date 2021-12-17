import Enzyme, { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ViewProfile from ".././components/templates/viewProfile/viewProfile.component";
import { ThemeProvider } from "@mui/system";
import store from "../store";
import { theme } from "../theme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { render, screen } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe("ViewProfile Page testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <ViewProfile />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  });

  test("Component to be defined", () => {
    expect(wrapper).toBeDefined();
  });

  describe("ViewProfile", () => {
    test("renders component", () => {
      render(<ViewProfile />);
      expect(screen.findByTitle("Edit Employee"));
    });
  });

  describe("ViewProfile", () => {
    test("renders component", () => {
      render(<ViewProfile />);
      expect(screen.findByTitle("Download as PDF"));
    });
  });
});
