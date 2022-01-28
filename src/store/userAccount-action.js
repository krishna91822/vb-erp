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
      const response = await axios.put(`/${id}/setPassword`, password);
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
const sampledata = [
  "user",
  "super_admin",
  "hr_admin_test",
  "user",
  "super_admin",
  "hr_admin_test",
  "hr_admin_test",
];
export const SetRoles = () => {
  return async (dispatch) => {
    const setUserRoles = async () => {
      const response = await axios.get("/roles/getallroles");
      if (response.status === "failure") {
        throw new Error("Could not fetch roles");
      }
      const data = response.data.data;
      return data;
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await setUserRoles();
      dispatch(userAccountActions.setUserRole(data));
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

export const getUserDetails = (id) => {
  return async (dispatch) => {
    const getUserData = async () => {
      const response = await axios.get(`/users/${id}`);
      if (response.status === "failure") {
        throw new Error("Could not fetch employeesName");
      }
      const data = response.data.data;
      return data;
    };

    try {
      const data = await getUserData();
      console.log(data, "data here");
      dispatch(userAccountActions.setUserDetails(data));
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
export const getUser = (email) => {
  return async (dispatch) => {
    const getuserbyemail = async () => {
      const response = await axios.get(`/users/?email=${email}`);
      if (response.status === "failure") {
        throw new Error("user not found");
      }
      const data = response.data.data.results;
      return data;
    };

    try {
      const data = await getuserbyemail();
      dispatch(userAccountActions.setuser(data));
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
