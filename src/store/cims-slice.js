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
  clientName: "",
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
};

const cimsSlice = createSlice({
  name: "cims",
  initialState,
  reducers: {
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
    resetForm: () => initialState,
    getClientsList(state, action) {
      state.clientsList = action.payload;
    },
    getClientData(state, action) {
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
  },
});

export const cimsActions = cimsSlice.actions;

export default cimsSlice;
