import { uiActions } from "./ui-slice";
import { cimsActions } from "./cims-slice";
import axios from "../helpers/axiosInstance";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const contactSchema = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  otherContactNumber: "",
};

export const getClientsData = (pageNo, sortBy, filter, sortingOrder) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `/cims?page=${pageNo}&sort=${sortBy}&filter=${filter}&sortOrder=${sortingOrder}`
      );
      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data;
        return data;
      }
      throw new Error(
        response.data.error || "Something went wrong! Please try again..."
      );
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await fetchData();
      dispatch(cimsActions.getClientsList(data.data || []));
      dispatch(cimsActions.setPages(data.totalPages || 1));
      if (pageNo > data.totalPages)
        dispatch(cimsActions.setPageNo(data.totalPages));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const fetchCountries = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}countries`);
      const res = await response.json();
      if (res.code === 200 || res.status === "success") {
        const data = await res.data;
        return data;
      }
      throw new Error(res.error || "Something went wrong! Please try again...");
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await fetchData();
      dispatch(cimsActions.setCountries(data || {}));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const getAddressByPincode = (addType, pincode, ccode) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("/location", {
        headers: {
          pincode: pincode,
          country: ccode,
        },
      });

      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data;
        return data;
      }
      throw new Error(
        response.data.error[0].message ||
          "Something went wrong! Please try again..."
      );
    };
    try {
      dispatch(uiActions.toggleLoader());
      const data = await fetchData();
      addType === "communicationAddress"
        ? dispatch(cimsActions.setLocCom(data))
        : dispatch(cimsActions.setLocReg(data));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          cimsActions.setPopUp({
            popUpOpen: true,
            message: error.message,
          })
        );
      }, 1000);
      dispatch(cimsActions.handelInvalidPincode(addType));
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const handelClientData = (clientId, mode, errors) => {
  return async (dispatch) => {
    const fetchLoc = async (addType, pincode, ccode) => {
      const response = await axios.get("/location", {
        headers: {
          pincode: pincode,
          country: ccode,
        },
      });

      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data;

        addType === "communicationAddress"
          ? dispatch(cimsActions.setLocCom(data))
          : dispatch(cimsActions.setLocReg(data));
        return;
      }
      throw new Error(
        response.data.error[0].message ||
          "Something went wrong! Please try again..."
      );
    };

    const fetchData = async () => {
      const response = await axios.get("/getclientinfo", {
        headers: {
          id: clientId,
        },
      });

      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data[0];
        return data;
      }
      throw new Error(
        response.data.error[0].message ||
          "Something went wrong! Please try again..."
      );
    };

    try {
      dispatch(uiActions.toggleLoader());
      dispatch(cimsActions.resetForm());

      const data = await fetchData();
      dispatch(cimsActions.setClientData(data));

      dispatch(cimsActions.setNavigateBack(false));
      dispatch(cimsActions.toggleEditMode(mode));

      const cccode = data.communicationAddress.country.split("-")[1];
      const rccode = data.registeredAddress.country.split("-")[1];
      dispatch(cimsActions.setComCcode(cccode));
      dispatch(cimsActions.setRegCcode(rccode));

      fetchLoc("registeredAddress", data.registeredAddress.pincode, rccode);
      fetchLoc(
        "communicationAddress",
        data.communicationAddress.pincode,
        cccode
      );

      if (Object.keys(data.contacts).length > 3) {
        var temp = JSON.parse(JSON.stringify(errors));
        for (let i = 0; i < Object.keys(data.contacts).length - 3; i++) {
          temp.contacts[`otherContact${i + 1}`] = contactSchema;
        }
        dispatch(cimsActions.setErrors({ ...temp }));
      }
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      }, 1000);
    }
  };
};

export const handelDuplicates = (brand, id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("/duplicates", {
        headers: {
          brandname: brand,
          id: id,
        },
      });

      if (response.data.code !== 200) {
        throw new Error(
          response.data.message || "Something went wrong! Please try again..."
        );
      }
      return true;
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await fetchData();
      if (data) dispatch(cimsActions.setBrandFocus(false));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          cimsActions.setPopUp({
            popUpOpen: true,
            message: error.message,
          })
        );
      }, 1000);
    } finally {
      dispatch(uiActions.toggleLoader());
    }
  };
};

export const addNewClient = (formData) => {
  return async (dispatch) => {
    const postData = async () => {
      const response = await axios.post("/cims", { ...formData });
      console.log(response);
      if (response.data.code === 200 || response.data.status === "success") {
        return response.data;
      }
      throw new Error(
        response.data.error.message ||
          "Something went wrong! Please try again..."
      );
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await postData();
      dispatch(cimsActions.resetForm());
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: data.message,
          })
        );
      }, 1000);
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      }, 1000);
    }
  };
};

export const updateClient = (formData) => {
  return async (dispatch) => {
    const postData = async () => {
      const response = await axios.patch("/cims", { ...formData });
      if (response.data.code === 200 || response.data.status === "success") {
        return response.data;
      }
      throw new Error(
        response.data.error || "Something went wrong! Please try again..."
      );
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await postData();
      dispatch(cimsActions.resetForm());
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: data.message,
          })
        );
      }, 1000);
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      }, 1000);
    }
  };
};

export const changeActiveStatus = (clientId, clientStatus, brandName) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.patch(
        `/cims/status?id=${clientId}&status=${clientStatus}&brandName=${brandName}`
      );
      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data;

        return data;
      }
      throw new Error(
        response.data.error || "Something went wrong! Please try again..."
      );
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await fetchData();
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: data.message,
          })
        );
      }, 1000);
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      }, 1000);
    }
  };
};

export const searchClient = (value, filterBy) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `/cims/search?searchData=${value}&filter=${filterBy}`
      );
      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data;

        return data;
      }
      throw new Error(
        response.data.message || "Something went wrong! Please try again..."
      );
    };

    try {
      const data = await fetchData();
      dispatch(cimsActions.getClientsList(data || []));
    } catch (error) {
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      }, 1000);
    }
  };
};
