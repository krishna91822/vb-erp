import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";
import axios from "../helpers/axiosInstance";

export const validateUser = (username, password) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `/tempUsers?username=${username}&pass=${password}`
      );
      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data;
        return data;
      }
      throw new Error(
        response.data.error[0].message ||
          response.data.error ||
          response.data.message ||
          "Something went wrong! Please try again..."
      );
    };

    const fetchRoles = async (role) => {
      const response = await axios.get(`/roles?role=${role}`);
      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data;
        return data;
      }
      throw new Error(
        response.data.error[0].message ||
          response.data.error ||
          response.data.message ||
          "Something went wrong! Please try again..."
      );
    };

    try {
      dispatch(uiActions.toggleLoader());
      const userData = await fetchData();
      const roles = await fetchRoles(userData.roles[0]);
      const data = {};
      data.name = username;
      data.roles = userData.roles;
      data.permissions = roles.permission;
      dispatch(userActions.setUser(data));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
