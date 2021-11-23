import axios from "../../helpers/axiosInstance";
import { PoSowActions } from "./POSOW-slice";
import { uiActions } from "../ui-slice";

export const createNewPO_SOW = (formData) => {
  return async function (dispatch) {
    const rqst = await axios.post(
      "http://localhost:8000/savePoDetails",
      formData
    );
    dispatch(PoSowActions.PopUpON("Saved Successfully"));
    //  dispatch(
    //     uiActions.showNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "Sending data!",
    //     })
    //   );
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
export const fetchSpecificPO_SOW = (ROW_ID) => {
  return async function (dispatch) {
    const res = await axios.get(
      `http://localhost:8000/getPoDetailsByID/${ROW_ID}`
    );
    dispatch(PoSowActions.SetSpecific([res.data]));
  };
};
