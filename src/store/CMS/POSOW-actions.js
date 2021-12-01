import axios from "../../helpers/axiosInstance";
import { PoSowActions } from "./POSOW-slice";
import { uiActions } from "../ui-slice";
import { useDispatch } from "react-redux";

export const createNewPO_SOW = (formData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:8000/savePoDetails",
        formData
      );
      if (response.status === 201) {
        dispatch(PoSowActions.PopUpON("Saved Successfully"));
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
      .patch(`http://localhost:8000/updatePoDetails/${id}`, formData)
      .then((res) => {
        console.log(res.status);
      })
      .then(dispatch(PoSowActions.PopUpON("Updated Successfully")));
  };
};
export const SendForApproval = (curr_status, id) => {
  return async function (dispatch) {
    const rqst = await axios
      .patch(`http://localhost:8000/updatePoStatus/${id}`, curr_status)
      .then((res) => {
        console.log(res.status);
      })
      .then(dispatch(PoSowActions.PopUpON("Sent for review")));
  };
};
export const fetchPO_SOW_data = () => {
  return async function (dispatch) {
    const res = await axios.get("http://localhost:8000/getPoDetails");
    dispatch(PoSowActions.setTabViewData(res.data));
  };
};
export const fetchSpecificPO_SOW = (ROW_ID) => {
  return async function (dispatch) {
    const res = await axios.get(
      `http://localhost:8000/getPoDetailsByID/${ROW_ID}`
    );
    dispatch(PoSowActions.SetSpecific([res.data]));
  };
};
export const fetchPOs_emp_data = (po_id) => {
  return async function (dispatch) {
    const res = await axios.get(
      `http://localhost:8000/getAssignEmployee/${po_id}`
    );
    dispatch(PoSowActions.setPOEmpTabData(res.data));
  };
};

export const AddEmpToThisPO = (formData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:8000/addAssignee",
        formData
      );
      if (response.status === 201) {
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
        `http://localhost:8000/updateDetails/${emp_id}`,
        formData
      );
      if (response.status === 201) {
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
        `http://localhost:8000/unassign/${emp_id}`
      );
      if (response.status === 201) {
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
    const res = await axios.get(`http://localhost:8000/sort/${product}`);
    dispatch(PoSowActions.setTabViewData(res.data));
  };
};
