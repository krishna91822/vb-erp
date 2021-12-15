import { createSlice } from "@reduxjs/toolkit";

const addressFields = {
  addressLine1: "",
  addressLine2: "",
  pincode: "",
  country: "",
  state: "",
  district: "",
  city: "",
  landmark: "",
};

const contactFields = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  otherContactNumber: "",
};

const initialFields = {
  designation: "",
  brandName: "",
  domain: "",
  baseLocation: "",
  gstNumber: "",
  panNumber: "",
  companyType: "",
  registeredAddress: { ...addressFields },
  communicationAddress: { ...addressFields },
  contacts: {
    primaryContact: { ...contactFields },
    secondaryContact: { ...contactFields },
    tertiaryContact: { ...contactFields },
  },
};

const locFields = {
  state: "",
  districts: {
    "": [""],
  },
};

const initialState = {
  form: {
    ...JSON.parse(JSON.stringify(initialFields)),
    registeredAddress: {
      ...JSON.parse(JSON.stringify(initialFields)).registeredAddress,
      country: "India-in",
    },
    communicationAddress: {
      ...JSON.parse(JSON.stringify(initialFields)).communicationAddress,
      country: "India-in",
    },
    companyType: "GST Registered",
  },
  errors: JSON.parse(JSON.stringify(initialFields)),
  countries: {},
  RegCcode: "in",
  ComCcode: "in",
  locReg: { ...locFields },
  locCom: { ...locFields },
  clientsList: [],
  editMode: true,
  navigateBack: true,
  brandFocus: false,
  pages: 1,
  pageNo: 1,
  sortBy: "createdAt",
  filterBy: 1,
  sortingOrder: -1,
  searchBy: "",
  popUpOpen: false,
  popUpMessage: "",
  popUpOk: "",
};

const cimsSlice = createSlice({
  name: "cims",
  initialState,
  reducers: {
    resetForm(state, action) {
      state.form = initialState.form;
      state.errors = initialState.errors;
      state.RegCcode = initialState.RegCcode;
      state.ComCcode = initialState.ComCcode;
      state.locReg = initialState.locReg;
      state.locCom = initialState.locCom;
    },
    createForm(state, action) {
      state.form = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setCountries(state, action) {
      state.countries = action.payload;
    },
    setRegCcode(state, action) {
      state.RegCcode = action.payload;
    },
    setComCcode(state, action) {
      state.ComCcode = action.payload;
    },
    setNavigateBack(state, action) {
      state.navigateBack = action.payload;
    },
    setBrandFocus(state, action) {
      state.brandFocus = action.payload;
    },
    setLocReg(state, action) {
      const data = action.payload;
      const stateName = state.form.registeredAddress.state
        ? state.form.registeredAddress.state
        : data["state"];
      const districtName = state.form.registeredAddress.district
        ? state.form.registeredAddress.district
        : Object.keys(data["districts"])[0];
      const cityName = state.form.registeredAddress.city
        ? state.form.registeredAddress.city
        : data["districts"][districtName][0];
      state.locReg = data;
      state.form = {
        ...state.form,
        registeredAddress: {
          ...state.form.registeredAddress,
          state: stateName,
          district: districtName,
          city: cityName,
        },
      };
    },
    setLocCom(state, action) {
      const data = action.payload;
      const stateName = state.form.communicationAddress.state
        ? state.form.communicationAddress.state
        : data["state"];
      const districtName = state.form.communicationAddress.district
        ? state.form.communicationAddress.district
        : Object.keys(data["districts"])[0];
      const cityName = state.form.communicationAddress.city
        ? state.form.communicationAddress.city
        : data["districts"][districtName][0];
      state.locCom = data;
      state.form = {
        ...state.form,
        communicationAddress: {
          ...state.form.communicationAddress,
          state: stateName,
          district: districtName,
          city: cityName,
        },
      };
    },
    getClientsList(state, action) {
      state.clientsList = action.payload;
    },
    setClientData(state, action) {
      state.form = action.payload;
    },
    toggleEditMode(state, action) {
      state.editMode = action.payload;
    },
    resetComAddress(state, action) {
      state.locCom = { ...locFields };
      state.form = {
        ...state.form,
        communicationAddress: { ...addressFields, country: "India-in" },
      };
    },
    handelInvalidPincode(state, action) {
      const add = action.payload;
      state.form = {
        ...state.form,
        [add]: {
          ...state.form[add],
          city: "",
          district: "",
          state: "",
          pincode: "",
        },
      };
    },
    setPages(state, action) {
      state.pages = action.payload;
    },
    setPageNo(state, action) {
      state.pageNo = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setFilterBy(state, action) {
      state.filterBy = action.payload;
    },
    setSortingOrder(state, action) {
      state.sortingOrder = action.payload;
    },
    setSearchBy(state, action) {
      state.searchBy = action.payload;
    },
    setPopUp(state, action) {
      state.popUpMessage = action.payload.message;
      state.popUpOpen = action.payload.popUpOpen;
      state.popUpOk = action.payload.ok || "";
    },
  },
});

export const cimsActions = cimsSlice.actions;

export default cimsSlice;
