import axios from "../../helpers/axiosInstance";

import { tabViewActions } from "./CMSpoSow-main-slices";

export const fetchPO_SOW_data = () => {
  return async function (dispatch) {
    const res = await axios.get("http://localhost:8000/getPoDetails");
    dispatch(tabViewActions.setTabViewData(res.data));
  };
};
export const fetchSpecificPO_SOW = (ROW_ID) => {
  return async function (dispatch) {
    const res = await axios.get(
      `http://localhost:8000/getPoDetailsByID/${ROW_ID}`
    );
    dispatch(tabViewActions.setspecificPOSOWdata([res.data]));
  };
};
