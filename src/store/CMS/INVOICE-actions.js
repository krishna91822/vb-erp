import axios from "../../helpers/axiosInstance";
import { invoiceActions } from "./INVOICE-slice";
import { PoSowActions } from "./POSOW-slice";

export const createNew_INVOICE = (formData) => {
  return async function (dispatch) {
    const rqst = await axios.post(
      "http://localhost:8000/savePoDetails",
      formData
    );
    dispatch(invoiceActions.PopUpON("Saved Successfully"));
    //  dispatch(
    //     uiActions.showNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "Sending data!",
    //     })
    //   );
  };
};
export const Update_INVOICE = (formData, id) => {
  return async function (dispatch) {
    const rqst = await axios
      .patch(`/updatePoDetails/${id}`, formData)
      .then((res) => {
        console.log(res.status);
      })
      .then(dispatch(invoiceActions.PopUpON("Updated Successfully")));
  };
};
export const fetch_INVOICE_data = () => {
  return async function (dispatch) {
    const res = await axios.get("getPoDetails");
    dispatch(invoiceActions.setTabViewData(res.data));
  };
};
export const fetchSpecificINVOICE = (ROW_ID) => {
  return async function (dispatch) {
    const res = await axios.get(`/getPoDetailsByID/${ROW_ID}`);
    dispatch(invoiceActions.SetSpecific([res.data]));
  };
};
/* export const sortProducts = (product) => {
  return async function (dispatch) {
    const res = await axios.get(`/sort/${product}`);
    dispatch(PoSowActions.setTabViewData(res.data));
  };
};
 */
