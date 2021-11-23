import React, { Component } from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import Enzyme, { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import { CapturePO_SOW } from "../CapturePO_SOW";
import rootReducer from "../../../store/rootReducer";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { combineReducers } from "redux";
import SOW_reducer from "../SOW_reducer";
import postsReducer from "../../Main/posts.reducers";
import { PopUp_up, PopUp_close, getSpecificPO_SOW } from "../actionTypes";
import userEvent from "@testing-library/user-event";

const names = [
  "Harsha Bendi",
  "John dave",
  "Vimal K",
  "Aquib",
  "yash DY",
  "tanmay k",
  "Yussuf Sh",
  "Ayushi S",
];
const projects = ["xyz23", "asd34", "abc56", "yusah98", "ydy APPs"];
const clientFinController = ["ABC", "XYZ", "EFG"];
const targetedResources = ["ABC", "XYZ", "EFG", "ZZZ"];
const clientSponsors = ["ABC", "XYZ"];
const types = ["PO", "SOW"];
const currencies = ["INR", "USD"];
const DocumentTypes = [".docx", ".pdf", ".excel"];

const mockStore = configureStore([ReduxThunk]);
const store = mockStore({});

export function createTestStore() {
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  return store;
}

describe("SOW component", () => {
  let store;
  beforeEach(() => {
    store = createTestStore();
  });

  test("save button should be there if editBtn and toggleState are set false", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CapturePO_SOW editBtn={false} toggleState={false} />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByTestId("saveBtn");
    expect(element).toBeInTheDocument();
  });
  test("update button should be there if editBtn and toggleState are set true", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CapturePO_SOW editBtn={true} toggleState={true} />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByTestId("UpdateBtn");
    expect(element).toBeInTheDocument();
  });
  test("Edit Toggle button should be there if editBtn is set true", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CapturePO_SOW editBtn={true} toggleState={true} />
        </BrowserRouter>
      </Provider>
    );

    const element = screen.getByTestId("EditToggleBtn");
    expect(element).toBeInTheDocument();
  });

  it("SOW Reducer should return default state", () => {
    const newState = SOW_reducer(undefined, {});
    expect(newState).toEqual({
      inputFieldsData: {
        names: names,
        projects: projects,
        clientFinController: clientFinController,
        targetedResources: targetedResources,
        clientSponsors: clientSponsors,
        types: types,
        currencies: currencies,
        DocumentTypes: DocumentTypes,
      },
      popup: false,
      dataByID: [
        {
          Client_Name: "",
          Project_Name: "",
          Client_Sponser: [""],
          Client_Finance_Controller: [""],
          Targetted_Resources: ["", ""],
          Status: "",
          Type: "",
          PO_Number: "",
          PO_Amount: 0,
          Currency: "",
          Document_Name: "",
          Document_Type: "",
          Remarks: "",
        },
      ],
    });
  });
  it("SOW Reducer should return changed state when PopUp_up action is specified", () => {
    const newState = SOW_reducer(undefined, { type: PopUp_up });
    expect(newState.popup).toEqual(true);
  });
  it("SOW Reducer should return changed state when PopUp_close action is specified", () => {
    const newState = SOW_reducer(undefined, { type: PopUp_close });
    expect(newState.popup).toEqual(false);
  });
  it("SOW Reducer should return changed state when getSpecificPO_SOW action is specified", () => {
    const data = [
      {
        Client_Name: "tanmay k",
        Project_Name: "abc56",
        Client_Sponser: ["ABC"],
        Client_Finance_Controller: ["XYZ"],
        Targetted_Resources: ["ABC", "XYZ", "EFG"],
        Status: "Pending",
        Type: "SOW",
        PO_Number: "sdsfdfw4234",
        PO_Amount: 23432,
        Currency: "USD",
        Document_Name: "Aquib nazmi 12th Marksheet.pdf",
        Document_Type: ".pdf",
        Remarks: "some remarks.some more remarks.",
      },
    ];
    const newState = SOW_reducer(undefined, {
      type: getSpecificPO_SOW,
      payload: data,
    });
    expect(newState.dataByID).toEqual(data);
  });
});
