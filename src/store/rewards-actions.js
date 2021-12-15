import { uiActions } from "./ui-slice";
import { rewardsActions } from "./rewards-slice";
import axios from "../helpers/axiosInstance";

export const getRewardsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.get("/rewards");

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      const data = await fetchData();
      dispatch(
        rewardsActions.addRewards({
          rewards: data.data.data.results || [],
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

export const getRewardsDataWithPageNumber = (pageNumber) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.get(`/rewards?page=${pageNumber}`);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      const data = await fetchData();
      dispatch(
        rewardsActions.addRewards({
          rewards: data.data.data.results || [],
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

export const searchData = (data) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.get(`/rewards/search?search=${data}`);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      const data = await fetchData();
      console.log(data);
      dispatch(
        rewardsActions.addRewards({
          rewards: data.data.data.results || [],
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

export const deleteRewardData = (id) => {
  console.log(id);
  return async (dispatch) => {
    const deleteData = async () => {
      const deletedData = axios.delete(`/rewards/${id}`);

      return deletedData;
    };

    try {
      await deleteData();
      dispatch(getRewardsData());
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

export const filterData = (filterValue) => {
  return async (dispatch) => {
    const fetchData = async () => {
      let response;
      if (filterValue === "Default") {
        response = axios.get(`/rewards`);
      } else {
        response = axios.get(`/rewards/?status=${filterValue}`);
      }

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      const data = await fetchData();
      dispatch(
        rewardsActions.addRewards({
          rewards: data.data.data.results || [],
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

export const addRewardData = (reward) => {
  return async (dispatch) => {
    dispatch(uiActions.toggleLoader());
    const fetchData = async () => {
      const response = axios.post("/rewards", reward);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      const data = await fetchData();
      // dispatch(
      //   rewardsActions.addRewards({
      //     rewards: data.data.data.results || [],
      //   })
      // );
      dispatch(rewardsActions.updateRewardStatus());
    } catch (error) {
      dispatch(uiActions.toggleLoader());
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
