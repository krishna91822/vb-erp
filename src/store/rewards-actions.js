import { uiActions } from "./ui-slice";
import { rewardsActions } from "./rewards-slice";
import axios from "../helpers/axiosInstance";
import { toast } from "react-toastify";

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
  return async (dispatch) => {
    const deleteData = async () => {
      const deletedData = axios.delete(`/rewards/${id}`);
      return deletedData;
    };

    try {
      const data = await deleteData();
      if (data.data.status === "success") {
        toast.success("Deleted", {
          icon: "🗑",
        });
        dispatch(getRewardsData());
      } else {
        toast.warning("Error");
      }
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
        toast.warning("Error");
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      await fetchData();

      toast.success("Reward Added");
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

export const EditRewardData = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.get(`/rewards/${id}`);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      const data = await fetchData();
      dispatch(
        rewardsActions.addEditRewardData({
          rewardData: data.data.data || {},
        })
      );

      dispatch(rewardsActions.updateRewardStatus());

      // console.log(data);
    } catch (error) {
      dispatch(uiActions.toggleLoader());
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching content data failed!",
        })
      );
    }
  };
};

export const UpdateRewardData = (data, id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.put(`/rewards/${id}`, data);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      await fetchData();

      dispatch(rewardsActions.updateRewardStatus());

      // console.log(data);
    } catch (error) {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const updateRewardStatus = (id, number) => {
  return async (dispatch) => {
    console.log(id);
    const fetchData = async () => {
      let status;
      if (number === 1) {
        status = { status: "Stopped" };
      } else if (number === 2) {
        status = { status: "Launch" };
      }
      const response = axios.put(`/rewards/${id}`, status);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      await fetchData();
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

export const updateRewardEmployeeIdArray = (employeeIdArrayData, rewardId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      let employees_id = [];
      employeeIdArrayData.map((data) => employees_id.push(data.employee_id));

      const data = {
        recipients_ids: employees_id,
      };
      // console.log(employees_id);
      const response = axios.put(`/rewards/${rewardId}`, data);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      }
      return response;
    };

    try {
      await fetchData();
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
