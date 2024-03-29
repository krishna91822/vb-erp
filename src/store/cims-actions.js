import { uiActions } from "./ui-slice";
import { cimsActions } from "./cims-slice";
import axios from "../helpers/axiosInstance";

const baseURL = process.env.REACT_APP_API_BASE_URL;

const contactSchema = {
  designation: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  otherContactNumber: "",
};

export const getClientsData = (
  pageNo,
  sortBy,
  filter,
  sortingOrder,
  searchBy
) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get(
        `/cims?page=${pageNo}&sort=${sortBy}&filter=${filter}&sortOrder=${sortingOrder}&searchData=${searchBy}`
      );
      if (response.data.code === 200 || response.data.status === "success") {
        const data = response.data.data;
        return data;
      } else if (response.data.code === 404) {
        const data = response.data.data;
        setTimeout(function () {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: response.data.message,
            })
          );
        }, 1000);
        return data;
      }
      throw new Error(
        response.data.error[0].message ||
          response.data.error ||
          response.data.message ||
          "Something went wrong! Please try again..."
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
      setTimeout(function () {
        dispatch(cimsActions.resetForm());
      }, 2000);
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: data.message,
          })
        );
      }, 2000);
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
      setTimeout(function () {
        dispatch(cimsActions.resetForm());
      }, 2000);
      setTimeout(function () {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success!",
            message: data.message,
          })
        );
      }, 2000);
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

export const checkLegalName = (legal) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("/checklegalname", {
        headers: {
          legalname: legal,
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
      if (data) dispatch(cimsActions.setLegalFocus(false));
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

export const setDomainSector = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await axios.get("/dropdowns?dropdownName=domain-sector");

      if (response.data.code !== 200) {
        throw new Error(
          response.data.message || "Something went wrong! Please try again..."
        );
      }
      return response.data;
    };

    try {
      dispatch(uiActions.toggleLoader());
      const data = await fetchData();
      if (data) dispatch(cimsActions.setDomain(data));
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
