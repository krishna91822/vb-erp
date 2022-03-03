import { uiActions } from "./ui-slice";
import { userAccountActions } from "./userAccount-slice";
import axios from "../helpers/axiosInstance";

export const searchEmployees = (empName) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `/employees?search=${empName}&status=active`
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
      await createAccount();
      return true;
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "User already exist!!!",
          })
        );
      }, 1000);
      return false;
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
      await setPassword();
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

export const checkEmployeeProfile = (email) => {
  return async (dispatch) => {
    const checkEmail = async () => {
      const response = await axios.get(`/employees?empEmail=${email}`);
      if (response.status === "failure") {
        throw new Error("user details not updated");
      }
      console.log(response.data.data);
      if (response.data.data.length !== 0) return true;
      else return false;
      // const data = response.data.data;
      // return data;
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await checkEmail();
      console.log(data);
      return data;
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "User already exist!!!",
          })
        );
      }, 1000);
      return false;
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
export const updateUserAccount = (id, updatedData) => {
  return async (dispatch) => {
    const updateUser = async () => {
      const response = await axios.put(`/users/${id}`, updatedData);
      if (response.status === "failure") {
        throw new Error("user details not updated");
      }
      const data = response.data.data;
      return data;
    };

    try {
      dispatch(uiActions.toggleLoader());
      await updateUser();
      return true;
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "User already exist!!!",
          })
        );
      }, 1000);
      return false;
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
