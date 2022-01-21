import { uiActions } from "./ui-slice";
import { userAccountActions } from "./userAccount-slice";
import axios from "../helpers/axiosInstance";

export const searchEmployees = (empName) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `/employees/rewars/employeesearch?search=${empName}`
      );
      if (response.status === "failure") {
        throw new Error("Could not fetch employeesName");
      }
      const data = response.data.data;
      return data;
    };

    try {
      const data = await fetchData();
      dispatch(userAccountActions.setUserAccount(data));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "No Records Found",
          })
        );
      }, 1000);
    }
  };
};

export const createUserAccount = (user) => {
  return async (dispatch) => {
    const createAccount = async () => {
      const response = await axios.post("/users", user);
      if (response.status === "failure") {
        throw new Error("Could not fetch employeesName");
      }
      const data = response.data.data;
      return data;
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await createAccount();
      dispatch(
        uiActions.showNotification({
          status: "success",
          message:
            "User created successfull and email sent to user to reset password",
        })
      );
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Something Went Wrong",
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const setUserPassword = (id, password) => {
  return async (dispatch) => {
    const setPassword = async () => {
      const user = {
        password: " ",
      };
      const response = await axios.put(`/${id}/setPassword`, password);
      console.log(response.data.data, "=====CreateUSer");
      if (response.status === "failure") {
        throw new Error("Could not fetch employeesName");
      }
      const data = response.data.data;
      return data;
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await setPassword();
      dispatch(
        uiActions.showNotification({
          status: "success",
          message: "password change successfully",
        })
      );
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Something Went Wrong",
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
