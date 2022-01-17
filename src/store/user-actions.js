import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";
import axios from "../helpers/axiosInstance";
export const validateUser = (username, password) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const userDetail = {};
      userDetail.email = username;
      userDetail.password = password;
      // const response = await axios.get(
      //   `/tempUsers?username=${username}&pass=${password}`
      // );
      const response = await axios.post("/login", userDetail);
      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data;
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        return data;
      } else if (response.data.code === 422) {
        response.data.message = "Invalid email or password";
      }
      throw new Error(
        response.data.message || "Something went wrong! Please try again..."
      );
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await fetchData();
      dispatch(userActions.setUser(data));
      return true;
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Invalid Email Id or Password",
          })
        );
      }, 1000);
      return false;
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const tokenValidate = () => {
  return async (dispatch) => {
    const fetchTOkenandSetData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] =
          localStorage.getItem("token");
        const response = await axios.get("/validateToken");
        if (response.data.code === 200 || response.data.status === "success") {
          const data = response.data.data;
          return data;
        }
        throw new Error(
          response.data.message || "Something went wrong! Please try again..."
        );
      }
    };
    try {
      dispatch(uiActions.toggleLoader());
      const data = await fetchTOkenandSetData();
      dispatch(userActions.setUser(data));
      return true;
    } catch (error) {
      return false;
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    const logout = async () => {
      const response = await axios.get("/logout");
      if (response.status === "failure") {
        throw new Error(response.data.message);
      }
      return response;
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await logout();
      dispatch(userActions.resetForm());
      localStorage.removeItem("token");
      return true;
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
      return false;
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
