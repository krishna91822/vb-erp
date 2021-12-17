import { uiActions } from "./ui-slice";
import { employeesActions } from "./employees-slice";
import axios from "../helpers/axiosInstance";

export const getEmployeesData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.get("/employees/reward/employee");

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      const data = await fetchData();
      dispatch(
        employeesActions.addEmployees({
          employees: data.data.data || [],
        })
      );
    } catch (error) {
      dispatch(uiActions.toggleLoader());
      setTimeout(function () {
        dispatch(uiActions.toggleLoader());
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching content data failed!",
          })
        );
      }, 3000);
    }
  };
};

export const searchEmployeeData = (data) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.get(
        `/employees/rewars/employeesearch?search=${data}`
      );
      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      const data = await fetchData();
      dispatch(
        employeesActions.addEmployees({
          employees: data.data.data || [],
        })
      );
    } catch (error) {
      dispatch(uiActions.toggleLoader());
      setTimeout(function () {
        dispatch(uiActions.toggleLoader());
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching content data failed!",
          })
        );
      }, 3000);
    }
  };
};
