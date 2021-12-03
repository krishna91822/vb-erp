import axios from "../../helpers/axiosInstance";
import { PoSowActions } from "./POSOW-slice";
import { uiActions } from "../ui-slice";
import { useDispatch } from "react-redux";

export const createNewPO_SOW = (formData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:8000/poSow",
        formData
      );
      if (response.status === 200) {
        dispatch(PoSowActions.PopUpON("Saved Successfully"));
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
    const rqst = await axios
      .patch(`http://localhost:8000/poSow/${id}`, formData)
      // .then((res) => {
      //   console.log(res.status);
      // })
      .then(dispatch(PoSowActions.PopUpON("Updated Successfully")))
      .then(dispatch(PoSowActions.setRedirect(true)));
  };
};
export const SendForApproval = (curr_status, id) => {
  return async function (dispatch) {
    const rqst = await axios
      .patch(`http://localhost:8000/poSow/status/${id}`, curr_status)
      // .then((res) => {
      //   console.log(res.status);
      // })
      .then(dispatch(PoSowActions.PopUpON("Sent for review")))
      .then(dispatch(PoSowActions.setRedirect(true)));
  };
};
export const fetchPO_SOW_data = () => {
  return async function (dispatch) {
    const res = await axios.get("http://localhost:8000/poSow");
    dispatch(PoSowActions.setTabViewData(res.data.data.results));
  };
};
export const fetchSpecificPO_SOW = (ROW_ID) => {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:8000/poSow/${ROW_ID}`);
    dispatch(PoSowActions.SetSpecific([res.data.data]));
  };
};
export const fetchPOs_emp_data = (po_id) => {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:8000/assign/${po_id}`);
    dispatch(PoSowActions.setPOEmpTabData(res.data.data.results));
  };
};

export const AddEmpToThisPO = (formData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:8000/assign",
        formData
      );
      if (response.status === 200) {
        dispatch(PoSowActions.PopUpON("Employee Added To This PO"));
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
      const response = await axios.patch(
        `http://localhost:8000/assign/${emp_id}`,
        formData
      );
      if (response.status === 200) {
        dispatch(PoSowActions.PopUpON("Updated"));
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
      const response = await axios.patch(
        `http://localhost:8000/assign/unassign/${emp_id}`
      );
      if (response.status === 200) {
        dispatch(PoSowActions.PopUpON("Unassigned"));
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
            message: "Fetching content data failed!",
          })
        );
      }, 1000);
    }
  };
};

export const sortProducts = (product) => {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:8000/poSow/sort/${product}`);
    dispatch(PoSowActions.setTabViewData(res.data.data.results));
  };
};
