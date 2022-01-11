/* eslint-disable prettier/prettier */
import axios from "../../helpers/axiosInstance";
import { PoSowActions } from "./POSOW-slice";
import { uiActions } from "../ui-slice";

export const createNewPO_SOW = (formData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/poSow`, formData);
      if (response.status === 200) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Saved Successfully!",
          })
        );
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
    }
  };
};
export const UpdatePO_SOW = (formData, id) => {
  return async function (dispatch) {
    try {
      const response = await axios.patch(`/poSow/${id}`, formData);
      if (response.status === 200) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Updated Successfully!",
          })
        );
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
    }
  };
};
export const SendForApproval = (curr_status, id) => {
  return async function (dispatch) {
    try {
      const response = await axios.patch(`/poSow/status/${id}?status=${curr_status}`);
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
export const paginationFetchPosow = (filename, page, limit) => {
  return async function (dispatch) {
    const res = await axios.get(
      `/poSow/sort/${filename}/?page=${page}&limit=${limit}`
    );
    const total = res.data.data.totalCount;
    dispatch(PoSowActions.setTabViewData(res.data.data.results));
    dispatch(PoSowActions.setTotalCount(total));
  };
};
export const fetchSpecificPO_SOW = (ROW_ID) => {
  return async function (dispatch) {
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
          message: "Could not update data",
        })
      );
    }
  };
};
export const fetchPOs_emp_data = (po_id) => {
  return async function (dispatch) {
    const res = await axios.get(`/assign/${po_id}`);
    dispatch(PoSowActions.setPOEmpTabData(res.data.data.results));
  };
};

export const AddEmpToThisPO = (formData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/assign`, formData);
      if (response.status === 200) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Employee Added Successfully!",
          })
        );
        dispatch(PoSowActions.setRedirect(false));
      } else {
        throw new Error("Request Failed");
      }
    } catch (error) {
      dispatch(uiActions.toggleLoader());
      setTimeout(function () {
        dispatch(uiActions.toggleLoader());
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Could not Save data!",
          })
        );
      }, 1000);
    }
  };
};
export const UpdateEmpData = (formData, emp_id) => {
  return async function (dispatch) {
    try {
      const response = await axios.patch(`/assign/${emp_id}`, formData);
      if (response.status === 200) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Updated Successfully!",
          })
        );
        dispatch(PoSowActions.setRedirect(false));
      } else {
        throw new Error("Could not update!");
      }
    } catch (error) {
      dispatch(uiActions.toggleLoader());
      setTimeout(function () {
        dispatch(uiActions.toggleLoader());
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Could not update!",
          })
        );
      }, 1000);
    }
  };
};

export const UnAssignThisEmp = (emp_id) => {
  return async function (dispatch) {
    try {
      const response = await axios.patch(`/assign/unassign/${emp_id}`);
      if (response.status === 200) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Unassigned Employee",
          })
        );
        dispatch(PoSowActions.setRedirect(false));
      } else {
        throw new Error("Could not Unassign!");
      }
    } catch (error) {
      dispatch(uiActions.toggleLoader());
      setTimeout(function () {
        dispatch(uiActions.toggleLoader());
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Something went wrong",
          })
        );
      }, 1000);
    }
  };
};

export const fetchAllClients = () => {
  return async function (dispatch) {
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
    }
  };
};
export const fetchAllClientProjects = (clientName) => {
  return async function (dispatch) {
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
    }
  };
};
export const fetchClientProjectSponsor = (projectId) => {
  return async function (dispatch) {
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
    }
  };
};

export const searchPoSow = (keyword) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`poSow/sort/Id?keyword=${keyword}`);
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
