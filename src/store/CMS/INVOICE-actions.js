import axios from "../../helpers/axiosInstance";
import { invoiceActions } from "./INVOICE-slice";

export const createNew_INVOICE = (formData) => {
  return async function (dispatch) {
    const rqst = await axios.post("/invoice", formData);
    dispatch(invoiceActions.PopUpON("Saved Successfully"));
    dispatch(invoiceActions.setRedirect(true));
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
    const res = await axios.get("/invoice");

    dispatch(invoiceActions.setTabViewData(res.data));
  };
};
export const paginationFetchInvoice = (filename, page, limit) => {
  return async function (dispatch) {
    const res = await axios.get(
      `/invoice/sort/${filename}/?page=${page}&limit=${limit}`
    );
    const total = res.data.data.totalCount;
    dispatch(invoiceActions.setTabViewData(res.data.data.results));
    dispatch(invoiceActions.setTotalCount(total));
  };
};
export const fetchSpecificINVOICE = (ROW_ID) => {
  return async function (dispatch) {
    const res = await axios.get(`/invoice/${ROW_ID}`);
    console.log(res.data);
    dispatch(invoiceActions.SetSpecific([res.data.data]));
  };
};
export const sortProducts = (product) => {
  return async function (dispatch) {
    const res = await axios.get(`/invoice/sort/${product}`);
    dispatch(invoiceActions.setTabViewData(res.data));
  };
};
