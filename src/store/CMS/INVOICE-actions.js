import axios from "../../helpers/axiosInstance";
import { invoiceActions } from "./INVOICE-slice";
import { PoSowActions } from "./POSOW-slice";

export const createNew_INVOICE = (formData) => {
  return async function (dispatch) {
    const rqst = await axios.post("http://localhost:8000/invoice", formData);
    dispatch(invoiceActions.PopUpON("Saved Successfully"));
    dispatch(PoSowActions.setRedirect(true));
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
export const fetch_INVOICE_data = (sortBy) => {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:8000/invoice/sort/${sortBy}`);

    dispatch(invoiceActions.setTabViewData(res.data.data));
  };
};
export const fetchSpecificINVOICE = (ROW_ID) => {
  return async function (dispatch) {
    const res = await axios.get(`http://localhost:8000/invoice/${ROW_ID}`);
    console.log(res.data.data);
    dispatch(invoiceActions.SetSpecific([res.data.data]));
  };
};
