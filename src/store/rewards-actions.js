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
          totalRewards: data.data.data.totalCount,
          searchValue: "",
          sorting: "",
          defaultPage: 1,
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
          totalRewards: data.data.data.totalCount,
          searchValue: "",
          sorting: "",
          defaultPage: pageNumber,
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
  const searchValue = data;
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
          totalRewards: data.data.data.totalCount,
          searchValue: searchValue,
          sorting: "",
          defaultPage: 1,
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

export const getRewardsDataWithPageAndSearch = (searchValue, pageNumber) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.get(
        `/rewards/search?search=${searchValue}&page=${pageNumber}`
      );

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
          totalRewards: data.data.data.totalCount,
          searchValue: searchValue,
          sorting: "",
          defaultPage: pageNumber,
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

export const deleteRewardData = (id, defaultPage, sorting, searchValue) => {
  console.log(defaultPage);
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
        if (defaultPage !== 1 && searchValue !== "") {
          dispatch(getRewardsDataWithPageAndSearch(searchValue, defaultPage));
        } else if (defaultPage !== 1 && sorting !== "") {
          dispatch(filterDataWithPageAndFilter(sorting, defaultPage));
        } else {
          dispatch(getRewardsData());
        }
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
    let sortingStatus;
    const fetchData = async () => {
      let response;
      if (filterValue === "Default") {
        response = axios.get(`/rewards`);
        sortingStatus = "";
      } else {
        sortingStatus = filterValue;
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
          totalRewards: data.data.data.totalCount,
          searchValue: "",
          sorting: sortingStatus,
          defaultPage: 1,
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

export const filterDataWithPageAndFilter = (filterValue, pageNumber) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.get(
        `/rewards/?page=${pageNumber}&status=${filterValue}`
      );

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
          totalRewards: data.data.data.totalCount,
          searchValue: "",
          sorting: filterValue,
          defaultPage: pageNumber,
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
      const data = await fetchData();
      console.log(data);
      toast.success("Reward Added");
      dispatch(rewardsActions.updateRewardStatus());
    } catch (error) {
      dispatch(uiActions.toggleLoader());
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const updateRewardStatus = (
  id,
  number,
  defaultPage,
  sorting,
  searchValue
) => {
  return async (dispatch) => {
    console.log(id);
    const fetchData = async () => {
      let status;
      if (number === 1) {
        status = { status: "Stopped" };
      } else if (number === 2) {
        status = { status: "In Progress" };
      }
      const response = axios.put(`/rewards/${id}`, status);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      } else {
        if (number === 1) {
          toast.success("Status changed to Stopped");
        } else {
          toast.success("Status changed to In Progress");
        }
      }
      return response;
    };

    try {
      await fetchData();
      if (defaultPage !== 1 && searchValue !== "") {
        dispatch(getRewardsDataWithPageAndSearch(searchValue, defaultPage));
      } else if (defaultPage !== 1 && sorting !== "") {
        dispatch(filterDataWithPageAndFilter(sorting, defaultPage));
      } else {
        dispatch(getRewardsData());
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

export const updateRewardEmployeeIdArray = (dataIds, rewardId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = axios.put(`/rewards/${rewardId}`, dataIds);

      if (response.status === "failure") {
        throw new Error("Could not fetch cart data!");
      } else {
        toast.success("Employees Updated");
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
