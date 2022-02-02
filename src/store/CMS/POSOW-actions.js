/* eslint-disable prettier/prettier */
import axios from "../../helpers/axiosInstance";
import { PoSowActions } from "./POSOW-slice";
import { uiActions } from "../ui-slice";

export const createNewPO_SOW = (formData) => {
  return async function (dispatch) {
    dispatch(uiActions.toggleLoader());
    try {
      const response = await axios.post(`/poSow`, formData);
      if (response.status === 200) {
        setTimeout(function () {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: "PO/SOW captured successfully!",
            })
          );
        }, 1000);
        dispatch(PoSowActions.setRedirect(true));
      } else {
        throw new Error("Could not Save data!");
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
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
export const UpdatePO_SOW = (formData, id) => {
  return async function (dispatch) {
    dispatch(uiActions.toggleLoader());
    try {
      const response = await axios.patch(`/poSow/${id}`, formData);
      if (response.status === 200) {
        setTimeout(function () {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "Success!",
              message: response.data.message,
            })
          );
        }, 1000);
        dispatch(PoSowActions.setRedirect(true));
      } else {
        throw new Error("Could not Save data!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Could not update data",
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
export const SendForApproval = (curr_status, id) => {
  return async function (dispatch) {
    try {
      const response = await axios.patch(
        `/poSow/status/${id}?status=${curr_status}`
      );
      if (response.status === 200) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Status Changed Successfully",
          })
        );
        dispatch(PoSowActions.setRedirect(true));
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Could not change status",
        })
      );
    }
  };
};
export const fetchPO_SOW_data = (sortBy) => {
  return async function (dispatch) {
    dispatch(uiActions.toggleLoader());
    try {
      const res = await axios.get(`poSow/sort/${sortBy}`);
      if (res.status === 200) {
        dispatch(PoSowActions.setTabViewData(res.data.data.results));
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong",
        })
      );
    }
  };
};
export const paginationFetchPosow = (filename, page, limit, keyword) => {
  return async function (dispatch) {
    dispatch(uiActions.toggleLoader());
    try {
      const res = await axios.get(
        `/poSow/sort/${filename}/?keyword=${keyword}&page=${page}&limit=${limit}`
      );
      if (res.status === 200) {
        const total = res.data.data.totalCount;
        dispatch(PoSowActions.setTabViewData(res.data.data.results));
        dispatch(PoSowActions.setTotalCount(total));
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong",
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
export const fetchSpecificPO_SOW = (ROW_ID) => {
  return async function (dispatch) {
    dispatch(uiActions.toggleLoader());
    try {
      const res = await axios.get(`/poSow/${ROW_ID}`);
      if (res.status === 200) {
        dispatch(PoSowActions.SetSpecific([res.data.data]));
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Could not get data",
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const fetchAllClients = () => {
  return async function (dispatch) {
    dispatch(uiActions.toggleLoader());
    try {
      const res = await axios.get("poSow/capturePO/clients");
      if (res.status === 200) {
        dispatch(PoSowActions.setClientsOptions(res.data.data));
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong",
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
export const fetchAllClientProjects = (clientName) => {
  return async function (dispatch) {
    dispatch(uiActions.toggleLoader());
    try {
      const res = await axios.get(`poSow/capturePO/clients/${clientName}`);
      if (res.status === 200) {
        dispatch(PoSowActions.setClientProjects(res.data.data));
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong",
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};
export const fetchClientProjectSponsor = (projectId) => {
  return async function (dispatch) {
    dispatch(uiActions.toggleLoader());
    try {
      const res = await axios.get(
        `poSow/capturePO/details?projectId=${projectId}`
      );

      if (res.status === 200 && [...res.data.data].length !== 0) {
        dispatch(
          PoSowActions.setClientProjectSponsor(
            res.data.data[0].projectId.clientProjectSponsor
          )
        );
        dispatch(
          PoSowActions.setClientFinanceController(
            res.data.data[0].projectId.clientFinanceController
          )
        );
        dispatch(PoSowActions.setTargetedResources(res.data.data));
        dispatch(PoSowActions.setAllocationRate(res.data.data));
      } else {
        dispatch(PoSowActions.clearData());
        throw new Error();
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Resources not allocated for this project",
        })
      );
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const searchPoSow = (keyword) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`poSow/sort/Id?keyword=${keyword}`);
      if (res.status === 200) {
        dispatch(PoSowActions.setTabViewData(res.data.data.results));
        const total = res.data.data.totalCount;
        dispatch(PoSowActions.setTotalCount(total));
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Something went wrong",
        })
      );
    }
  };
};
