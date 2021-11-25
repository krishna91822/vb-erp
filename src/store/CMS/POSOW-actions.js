import axios from "../../helpers/axiosInstance";
import { PoSowActions } from "./POSOW-slice";
import { uiActions } from "../ui-slice";

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
      // console.error(error.message);
      // dispatch(PoSowActions.PopUpON("unsuccessfull"));
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
