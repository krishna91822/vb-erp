import { uiActions } from "./ui-slice";
// import { userActions } from "./user-slice";
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
      dispatch(uiActions.toggleLoader());
      const data = await fetchData();
      dispatch(userAccountActions.setUserAccount(data));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Could not fetch employeesName",
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const createUserAccount = (user) => {
  return async (dispatch) => {
    const createAccount = async () => {
      // const user = {
      //   first_name: "Rupesh Sharma",
      //   email: "rupesh@valuebound,com",
      //   role: ["user"],
      //   password: " ",
      // };
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
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Could not fetch employeesName",
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const setUserPassword = () => {
  return async (dispatch) => {
    const setPassword = async () => {
      const user = {
        password: " ",
      };
      const response = await axios.post(
        "/61e40c58e616cc19530f9003/setPassword",
        user
      );
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
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Could not fetch employeesName",
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
