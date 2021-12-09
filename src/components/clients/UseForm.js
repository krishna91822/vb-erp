import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { cimsActions } from "../../store/cims-slice";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";

const companyTypes = ["GST Registered", "GST Unregistered", "Overseas"];
const contactSchema = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  otherContactNumber: "",
};

const initialContacts = [
  { label: "Primary Contact *", title: "primaryContact" },
  { label: "Secondary Contact *", title: "secondaryContact" },
  { label: "Tertiary Contact", title: "tertiaryContact" },
];

const fields = [
  { id: "title", label: "Designation *" },
  { id: "firstName", label: "First name *" },
  { id: "lastName", label: "Last name *" },
  { id: "email", label: "Email address *" },
  { id: "contactNumber", label: "Contact Number *" },
  { id: "otherContactNumber", label: "Other contact number" },
];

const addressFields = [
  { name: "addressLine1", label: "Address Line 1 *" },
  { name: "addressLine2", label: "Address Line 2" },
  { name: "country", label: "Country *" },
  { name: "pincode", label: "Postal/Pin Code *" },
  { name: "state", label: "State *" },
  { name: "district", label: "District *" },
  { name: "city", label: "Area *" },
  { name: "landmark", label: "Landmark" },
];

export default function UseForm() {
  const formData = useSelector((state) => state.cims.form);
  const errors = useSelector((state) => state.cims.errors);
  const RegCcode = useSelector((state) => state.cims.RegCcode);
  const ComCcode = useSelector((state) => state.cims.ComCcode);
  const locReg = useSelector((state) => state.cims.locReg);
  const locCom = useSelector((state) => state.cims.locCom);
  const countries = useSelector((state) => state.cims.countries);
  const brandFocus = useSelector((state) => state.cims.brandFocus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchData() {
    const response = await fetch("http://localhost:4000/countries");
    const data = await response.json();
    if (data.code === 200 || data.status === "success")
      dispatch(cimsActions.setCountries(data.data));
    else console.log(data.error);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOthers = (e) => {
    const d = e.currentTarget.dataset;
    setContacts([...initialContacts, { ...d }]);
    setValue(d.title);
    handleClose();
  };

  const [value, setValue] = useState("primaryContact");

  const [contacts, setContacts] = useState(initialContacts);
  const [n, setN] = useState(Object.keys(formData.contacts).length);
  const [addOthers, setAddOthers] = useState(false);

  // Handel errors
  const validate = (type = "", fieldValues) => {
    let temp = JSON.parse(JSON.stringify(errors));
    if ("title" in fieldValues)
      temp["contacts"][type].title = fieldValues.title
        ? ""
        : "This field is required.";
    if ("firstName" in fieldValues)
      temp["contacts"][type].firstName = fieldValues.firstName
        ? ""
        : "This field is required.";
    if ("lastName" in fieldValues)
      temp["contacts"][type].lastName = fieldValues.lastName
        ? ""
        : "This field is required.";
    if ("email" in fieldValues) {
      temp["contacts"][type].email = fieldValues.email
        ? ""
        : "This field is required.";
      if (fieldValues.email)
        temp["contacts"][type].email = /^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/.test(
          fieldValues.email
        )
          ? ""
          : "Email is not valid.";
    }
    if ("contactNumber" in fieldValues) {
      temp["contacts"][type].contactNumber =
        fieldValues.contactNumber.length > 3 ? "" : "This field is required.";
      if (fieldValues.contactNumber)
        temp["contacts"][type].contactNumber = /^(?:[0-9] ?){6,14}[0-9]$/.test(
          fieldValues.contactNumber
        )
          ? ""
          : "Contact number is not valid.";
    }
    if ("otherContactNumber" in fieldValues) {
      if (fieldValues.otherContactNumber)
        temp["contacts"][type].otherContactNumber =
          /^(?:[0-9] ?){6,14}[0-9]$/.test(fieldValues.otherContactNumber)
            ? ""
            : "Other contact number is not valid.";
      else temp["contacts"][type].otherContactNumber = "";
    }
    setTimeout(() => {
      dispatch(cimsActions.setErrors({ ...temp }));
    }, 100);
  };

  const validateOptional = (type = "", fieldValues) => {
    let temp = JSON.parse(JSON.stringify(errors));
    if (
      fieldValues.title ||
      fieldValues.firstName ||
      fieldValues.lastName ||
      fieldValues.email ||
      fieldValues.contactNumber ||
      fieldValues.otherContactNumber
    ) {
      if (fieldValues.email)
        temp["contacts"][type].email = /^[^@\s]+@[^@\s]+\.[^@\s]{2,4}$/.test(
          fieldValues.email
        )
          ? ""
          : "Email is not valid.";
      else temp["contacts"][type].email = "";
      if (fieldValues.contactNumber)
        temp["contacts"][type].contactNumber = /^(?:[0-9] ?){6,14}[0-9]$/.test(
          fieldValues.contactNumber
        )
          ? ""
          : "Contact number is not valid.";
      else temp["contacts"][type].contactNumber = "";
      if (fieldValues.otherContactNumber)
        temp["contacts"][type].otherContactNumber =
          /^(?:[0-9] ?){6,14}[0-9]$/.test(fieldValues.otherContactNumber)
            ? ""
            : "Other contact number is not valid.";
      else temp["contacts"][type].otherContactNumber = "";
    } else {
      temp["contacts"][type].title = "";
      temp["contacts"][type].firstName = "";
      temp["contacts"][type].lastName = "";
      temp["contacts"][type].email = "";
      temp["contacts"][type].contactNumber = "";
      temp["contacts"][type].otherContactNumber = "";
    }
    dispatch(cimsActions.setErrors({ ...temp }));
    return (
      Object.values(temp["contacts"][type]).every((x) => x === "") &&
      fields
        .map((field) =>
          field.id === "otherContactNumber"
            ? true
            : formData["contacts"][type][field.id] !== ""
        )
        .every((x) => x)
    );
  };

  const validateBasic = (fieldValues) => {
    let temp = JSON.parse(JSON.stringify(errors));
    if ("designation" in fieldValues)
      temp.designation = fieldValues.designation
        ? ""
        : "This field is required.";
    if ("brandName" in fieldValues)
      temp.brandName = fieldValues.brandName ? "" : "This field is required.";
    if ("domain" in fieldValues)
      temp.domain = fieldValues.domain ? "" : "This field is required.";
    if ("baseLocation" in fieldValues)
      temp.baseLocation = fieldValues.baseLocation
        ? ""
        : "This field is required.";
    if ("gstNumber" in fieldValues) {
      temp.gstNumber = fieldValues.gstNumber ? "" : "This field is required.";
      if (fieldValues.gstNumber)
        temp.gstNumber =
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
            fieldValues.gstNumber
          )
            ? ""
            : "Invalid GST Number.";
    }
    if ("panNumber" in fieldValues) {
      temp.panNumber = fieldValues.panNumber ? "" : "This field is required.";
      if (fieldValues.panNumber)
        temp.panNumber = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(
          fieldValues.panNumber
        )
          ? ""
          : "Invalid PAN Number.";
    }
    if ("companyType" in fieldValues) {
      fieldValues.companyType === "GST Registered"
        ? (temp.panNumber = "")
        : (temp.gstNumber = "");
    }
    setTimeout(() => {
      dispatch(cimsActions.setErrors({ ...temp }));
    }, 100);
  };
  // End handel errors

  const handelSetAddOthers = (new_form) => {
    if (
      validateOptional(
        "tertiaryContact",
        new_form["contacts"]["tertiaryContact"]
      )
    ) {
      if (
        n === 3
          ? true
          : validateOptional(
              `otherContact${n - 3}`,
              new_form.contacts[`otherContact${n - 3}`]
            ) && Object.keys(new_form.contacts).length <= n
      ) {
        setAddOthers(true);
      } else {
        setAddOthers(false);
      }
    } else {
      setAddOthers(false);
    }
  };

  const handelMobile = (phone, field) => {
    let new_form = JSON.parse(JSON.stringify(formData));
    new_form["contacts"][value][field] = phone;
    validate(value, { [field]: phone });
    if (value !== "primaryContact" || value !== "secondaryContact")
      handelSetAddOthers(new_form);
    dispatch(cimsActions.createForm(new_form));
  };

  const setformvalue = (e) => {
    let new_form = JSON.parse(JSON.stringify(formData));
    if (e.target.name === "brandName")
      dispatch(cimsActions.setBrandFocus(true));
    e.target.id
      ? (new_form["contacts"][e.target.name][e.target.id] = e.target.value)
      : (new_form[e.target.name] = e.target.value);
    if (e.target.name === "companyType")
      e.target.value === "GST Registered"
        ? (new_form["panNumber"] = "")
        : (new_form["gstNumber"] = "");
    if (
      e.target.name === "primaryContact" ||
      e.target.name === "secondaryContact"
    )
      validate(e.target.name, { [e.target.id]: e.target.value });
    if (
      e.target.id &&
      e.target.name !== "primaryContact" &&
      e.target.name !== "secondaryContact"
    )
      validateOptional(e.target.name, new_form["contacts"][e.target.name]);
    if (!e.target.id) validateBasic({ [e.target.name]: e.target.value });
    handelSetAddOthers(new_form);
    dispatch(cimsActions.createForm(new_form));
  };

  const handelBrandName = async (e) => {
    const brand = e.target.value;
    setformvalue(e);
    if (brand) {
      const token = localStorage.getItem("authorization");
      await axios
        .get("http://localhost:4000/duplicates", {
          headers: {
            authorization: `bearer ${token}`,
            brandname: brand,
            id: formData._id ?? "",
          },
        })
        .then((res) => {
          console.log(res);
          res.data.code !== 200
            ? window.alert(res.data.message)
            : dispatch(cimsActions.setBrandFocus(false));
        });
    }
  };

  const validateAddress = (addType, fieldValues) => {
    let temp = JSON.parse(JSON.stringify(errors));
    if ("addressLine1" in fieldValues)
      temp[addType].addressLine1 = fieldValues.addressLine1
        ? ""
        : "This field is required.";
    if ("pincode" in fieldValues) {
      temp[addType].pincode = fieldValues.pincode
        ? ""
        : "This field is required.";
      if (fieldValues.pincode) {
        temp[addType].pincode = /^.{2,}$/.test(fieldValues.pincode)
          ? ""
          : "Pincode should have minimum 2 characters.";
        if (errors[addType].state)
          temp[addType].state = temp[addType].pincode
            ? "This field is required."
            : "";
        if (errors[addType].district)
          temp[addType].district = temp[addType].pincode
            ? "This field is required."
            : "";
        if (errors[addType].city)
          temp[addType].city = temp[addType].pincode
            ? "This field is required."
            : "";
      }
    }
    if ("country" in fieldValues) {
      temp[addType].country =
        fieldValues.country || formData[addType].country
          ? ""
          : "This field is required.";
    }
    if ("state" in fieldValues)
      temp[addType].state = fieldValues.state ? "" : "This field is required.";
    if ("district" in fieldValues)
      temp[addType].district =
        fieldValues.district || formData[addType].district
          ? ""
          : "This field is required.";
    if ("city" in fieldValues)
      temp[addType].city =
        fieldValues.city || formData[addType].city
          ? ""
          : "This field is required.";
    setTimeout(() => {
      dispatch(cimsActions.setErrors({ ...temp }));
    }, 100);
  };

  const setAddress = (e, addType) => {
    let new_form = JSON.parse(JSON.stringify(formData));
    if (e.target.name === "pincode") {
      new_form[addType]["city"] = "";
      new_form[addType]["district"] = "";
      new_form[addType]["state"] = "";
    }
    new_form[addType][e.target.name] = e.target.value;
    validateAddress(addType, { [e.target.name]: e.target.value });
    dispatch(cimsActions.createForm(new_form));
  };

  const handelInvalidPincode = (addType) => {
    let new_form = JSON.parse(JSON.stringify(formData));
    new_form[addType]["city"] = "";
    new_form[addType]["district"] = "";
    new_form[addType]["state"] = "";
    new_form[addType]["pincode"] = "";
    dispatch(cimsActions.createForm(new_form));
  };

  const getAddressByPincode = async (addType, pincode) => {
    try {
      await axios
        .get("http://localhost:4000/location", {
          headers: {
            pincode: pincode,
            country: addType === "registeredAddress" ? RegCcode : ComCcode,
          },
        })
        .then((res) => {
          if (res.data.code === 200 || res.data.status === "success")
            addType === "registeredAddress"
              ? dispatch(cimsActions.setLocReg(res.data.data))
              : dispatch(cimsActions.setLocCom(res.data.data));
          else {
            const errMsg = res.data.error[0].message;
            dispatch(
              uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: errMsg,
              })
            );
            handelInvalidPincode(addType);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handelAddressOnBlur = (e, addType) => {
    setAddress(e, addType);
    if (e.target.name === "pincode") {
      const data = e.target.value;
      if (
        data.length > 1 &&
        formData[addType].pincode !== "" &&
        errors[addType].pincode === ""
      )
        getAddressByPincode(addType, data);
    }
  };

  const handelCountry = (e, addType) => {
    let new_form = JSON.parse(JSON.stringify(formData));
    const data = e.target.value;
    const name = e.target.name;
    if (name === "country") {
      if (addType === "registeredAddress") {
        const code = data.split("-")[1];
        code === "in"
          ? (new_form["companyType"] = "GST Registered")
          : (new_form["companyType"] = "Overseas");
        dispatch(cimsActions.setRegCcode(code));
      } else dispatch(cimsActions.setComCcode(data.split("-")[1]));
      new_form[addType]["city"] = "";
      new_form[addType]["district"] = "";
      new_form[addType]["state"] = "";
      new_form[addType]["pincode"] = "";
    }
    new_form[addType][name] = data;
    if (name === "district" && data !== "") {
      const loc = addType === "registeredAddress" ? locReg : locCom;
      new_form[addType]["state"] = loc.state;
      new_form[addType]["city"] = loc["districts"][data][0];
    }
    dispatch(cimsActions.createForm(new_form));
  };

  const handelComAddress = (checked) => {
    if (checked) {
      dispatch(cimsActions.setLocCom({ ...locReg }));
      let new_form = JSON.parse(JSON.stringify(formData));
      new_form["communicationAddress"] = { ...new_form["registeredAddress"] };
      dispatch(cimsActions.createForm(new_form));
    } else {
      dispatch(cimsActions.resetComAddress());
    }
  };

  const handleAddOthers = () => {
    let new_form = JSON.parse(JSON.stringify(formData));
    new_form["contacts"] = {
      ...new_form["contacts"],
      [`otherContact${n - 2}`]: { ...contactSchema },
    };
    let new_errors = JSON.parse(JSON.stringify(errors));
    new_errors["contacts"] = {
      ...new_errors["contacts"],
      [`otherContact${n - 2}`]: { ...contactSchema },
    };
    const d = {
      label: `Other Contact ${n - 2}`,
      title: `otherContact${n - 2}`,
    };
    dispatch(cimsActions.createForm(new_form));
    setContacts([...initialContacts, { ...d }]);
    dispatch(cimsActions.setErrors(new_errors));
    setValue(d.title);
    setN(Object.keys(new_form.contacts).length);
    setAddOthers(false);
  };

  // Sam
  const [store, setStore] = useState("");
  const [login, setLogin] = useState(true);
  const authStore = () => {
    let store = localStorage.getItem("authorization");
    if (store && login) {
      setLogin(true);
      setStore(store);
    }
  };

  const validateOnSubmit = () => {
    const temp = JSON.parse(JSON.stringify(errors));
    const data = JSON.parse(JSON.stringify(formData));
    return (
      Object.keys(temp)
        .map((key) => {
          if (key === "contacts") {
            return Object.keys(temp["contacts"])
              .map((cKey) => {
                return Object.values(temp["contacts"][cKey]).every(
                  (x) => x === ""
                );
              })
              .every((x) => x);
          } else if (
            key === "registeredAddress" ||
            key === "communicationAddress"
          ) {
            return Object.values(temp[key]).every((x) => x === "");
          } else if (key === "gstNumber" || key === "panNumber") {
            return temp["gstNumber"] === "" || temp["panNumber"] === "";
          } else {
            return temp[key] === "";
          }
        })
        .every((x) => x) &&
      Object.keys(data)
        .map((key) => {
          if (key === "contacts") {
            return ["primaryContact", "secondaryContact"]
              .map((cKey) => {
                return fields
                  .map((field) =>
                    field.id === "otherContactNumber"
                      ? true
                      : data["contacts"][cKey][field.id] !== ""
                  )
                  .every((x) => x);
              })
              .every((x) => x);
          } else if (
            key === "registeredAddress" ||
            key === "communicationAddress"
          ) {
            return addressFields
              .map((field) =>
                field.name === "addressLine2" || field.name === "landmark"
                  ? true
                  : data[key][field.name] !== ""
              )
              .every((x) => x);
          } else if (key === "gstNumber" || key === "panNumber")
            return data["gstNumber"] !== "" || data["panNumber"] !== "";
          return data[key] !== "";
        })
        .every((x) => x) &&
      Object.keys(data["contacts"])
        .map((key) => {
          if (key === "primaryContact" || key === "secondaryContact")
            return true;
          return (
            fields
              .map((field) =>
                field.id === "otherContactNumber"
                  ? true
                  : data["contacts"][key][field.id] !== ""
              )
              .every((x) => x) ||
            fields
              .map((field) => data["contacts"][key][field.id] !== "")
              .every((x) => x === false)
          );
        })
        .every((x) => x) &&
      !brandFocus
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      const token = localStorage.getItem("authorization");
      try {
        await axios
          .post(
            "http://localhost:4000/cims",
            { ...formData },
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.status === "success" || res.data.code === 200) {
              setTimeout(() => {
                dispatch(cimsActions.resetForm());
              }, 100);
              window.alert("Data added successfully!");
              navigate("/cims");
            } else {
              window.alert(
                "Error occured while adding the data!\nPlease contact the maintenance team."
              );
              console.log(res.data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else window.alert("Some data missing!");
  };

  const updateForm = async (e) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      const token = localStorage.getItem("authorization");
      try {
        await axios
          .patch(
            "http://localhost:4000/cims",
            { ...formData },
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            if (res.data.status === "success" || res.data.code === 200) {
              setTimeout(() => {
                dispatch(cimsActions.resetForm());
              }, 100);
              window.alert("Data updated successfully!");
              navigate("/cims");
            } else {
              window.alert(
                "Error occured while updating the data!\nPlease contact the maintenance team."
              );
              console.log(res.data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else window.alert("Some data missing!");
  };

  return {
    fields,
    formData,
    value,
    setformvalue,
    contacts,
    setValue,
    open,
    handleClick,
    anchorEl,
    handleClose,
    n,
    handleOthers,
    addOthers,
    handleAddOthers,
    errors,

    authStore,
    submitForm,
    addressFields,
    handelCountry,
    handelAddressOnBlur,
    validateOnSubmit,
    handelMobile,

    RegCcode,
    ComCcode,
    locReg,
    locCom,
    countries,
    setAddress,
    companyTypes,
    handelComAddress,
    updateForm,
    handelBrandName,
  };
}
