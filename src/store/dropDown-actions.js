import { dropDownActions } from "./dropDown-slice";
import axios from "../helpers/axiosInstance";
import { uiActions } from "./ui-slice";

export const getAllDropDownName = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(`/dropdowns`);
      if (response.status === "failure") {
        throw new Error("Could not fetch dropdown Name");
      }
      return response.data.data;
    };
    try {
      const data = await fetchData();
      dispatch(dropDownActions.dropDownList(data));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
    }
  };
};

export const getSelectedDropDownName = (name) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(`/dropdowns?dropdownName=${name}`);
      if (response.status === "failure") {
        throw new Error("Could not fetch dropdown Name");
      }
      return response.data.data[0].dropdownArray;
    };
    try {
      const data = await fetchData();
      dispatch(dropDownActions.selectedDropDown(data));
      return true;
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
      return false;
    }
  };
};

export const updateDropDownName = (name, values) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.put(
        `/dropdowns/update?name=${name}`,
        values
      );
      if (response.status === "failure") {
        throw new Error("Could not fetch dropdown Name");
      }
      return response.data.data;
    };
    try {
      await fetchData();
      return true;
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
      return false;
    }
  };
};

export const RemoveDropDownName = (name, values) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.put(
        `/dropdowns/remove?name=${name}`,
        values
      );
      if (response.status === "failure") {
        throw new Error("Could not fetch dropdown Name");
      }
      return response.data.data;
    };
    try {
      await fetchData();
      return true;
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          message: error.message,
        })
      );
      return false;
    }
  };
};
