/* eslint-disable prettier/prettier */
import axios from "../../helpers/axiosInstance";
import { invoiceActions } from "./INVOICE-slice";
import { PoSowActions } from "./POSOW-slice";
import { uiActions } from "../ui-slice";

export const createNew_INVOICE = (formData) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`/invoice`, formData);
      if (response.status === 201) {
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
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Could not save data",
        })
      );
    }
  };
};

export const Update_INVOICE = (formData, id) => {
  return async function (dispatch) {
    try {
      const response = await axios.patch(`/invoice/${id}`, formData);
      if (response.status === 200) {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: "Updated Successfully!",
          })
        );
        dispatch(invoiceActions.setRedirect(true));
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

export const fetch_INVOICE_data = (sortBy) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/invoice/sort/${sortBy}`);
      if (res.status === 200) {
        dispatch(invoiceActions.setTabViewData(res.data.data.results));
      } else {
        throw new Error("Could'nt fetch data!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Could'nt fetch data",
        })
      );
    }
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
    try {
      const res = await axios.get(`/invoice/${ROW_ID}`);
      if (res.status === 200) {
        dispatch(invoiceActions.SetSpecific([res.data.data]));
      } else {
        throw new Error("Could'nt fetch data!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Could'nt fetch data",
        })
      );
    }
  };
};

export const searchINVOICE = (keyword) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/invoice/sort/Id?keyword=${keyword}`);
      if (res.status === 200) {
        dispatch(invoiceActions.setTabViewData(res.data.data.results));
      } else {
        throw new Error("Could'nt fetch data!");
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Could'nt fetch data",
        })
      );
    }
  };
};
