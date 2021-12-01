import { createSlice } from "@reduxjs/toolkit";

const initialFields = {
  designation: "",
  brandname: "",
  clientname: "",
  domain: "",
  baselocation: "",
  addressLine1: "",
  addressLine2: "",
  pincode: "",
  country: "",
  state: "",
  district: "",
  city: "",
  landmark: "",
  contacts: {
    primaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
    secondaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
    tertiaryContact: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNumber: "",
      otherContactNumber: "",
    },
  },
};

const initialState = {
  form: { ...JSON.parse(JSON.stringify(initialFields)), country: "India-in" },
  errors: JSON.parse(JSON.stringify(initialFields)),
  countries: {},
  ccode: "in",
  loc: {
    state: "",
    districts: {
      "": [""],
    },
  },
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
    setCcode(state, action) {
      state.ccode = action.payload;
    },
    setLoc(state, action) {
      const data = action.payload;
      const stateName = data["state"];
      const districtName = Object.keys(data["districts"])[0];
      const cityName = data["districts"][districtName][0];
      state.loc = data;
      state.form = {
        ...state.form,
        state: stateName,
        district: districtName,
        city: cityName,
      };
    },
    resetForm: () => initialState,
  },
});

export const cimsActions = cimsSlice.actions;

export default cimsSlice;
