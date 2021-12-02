import { uiActions } from "./ui-slice";
import { cimsActions } from "./cims-slice";
import axios from "../helpers/axiosInstance";

export const getClientsData = () => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const fetchData = async () => {
      const response = await axios.get("/cims");

      if (!response.ok) {
        throw new Error("Could not fetch clients data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const data = await fetchData();
      console.log(data);
      dispatch(cimsActions.getClientsList(data.data || []));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching content data failed!",
          })
        );
      }, 3000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const sendContentData = (content) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
  };
};
