import React, { useEffect, useState } from "react";

import { Grid, TextField, Box, Chip, Checkbox } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { personal } from "./personal.constant";

import {
  ListItem,
  CustomTextField,
  CustomTextFieldForChip,
  ContentBox,
  ContentTypo,
} from "./personalEditable.styles";

import { TitleTypo } from "../../UI/commonStyles";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  deepPurple,
  purple,
  pink,
  amber,
  deepOrange,
  teal,
  blue,
} from "@mui/material/colors";

import axiosInstance from "./../../../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { uiActions } from "./../../../store/ui-slice.js";

const PersonalEditable = (props) => {
  const { toggleLoader } = uiActions;
  const dispatch = useDispatch();

  const {
    empData,
    setEmpData,
    personalDetails,
    setPersonalDetails,
    register,
    errors,
  } = props;

  const {
    // empConnections,
    empHobbies,
    empPersonalEmail,
    empAboutMe,
    empCurrentAddress,
    empResidentialAddress,
  } = empData;

  const chipColor = [
    deepPurple[500],
    purple[500],
    pink[500],
    amber[500],
    deepOrange[500],
    teal[500],
    blue[500],
  ];

  const [chipData, setChipData] = useState([...empHobbies]);

  const handleNewFieldChange = (event, index) => {
    const updates = personalDetails.map((personalDetail, i) =>
      index === i
        ? { ...personalDetail, fieldValue: event.target.value }
        : personalDetail
    );
    setPersonalDetails(updates);
  };

  const removeFields = (index) => {
    const filteredFields = [...personalDetails];
    filteredFields.splice(index, 1);
    setPersonalDetails(filteredFields);
  };

  useEffect(() => {
    if (chipData.length !== 0) setEmpData({ ...empData, empHobbies: chipData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chipData]);

  const keyPress = (event) => {
    if (event.key === "Enter") {
      if (event.target.value.trim() === "") return;
      setChipData([...chipData, event.target.value.trim()]);
      event.target.value = "";
    }
  };

  const handleDelete = (i) => {
    // setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    const filteredHobbies = [...chipData];
    filteredHobbies.splice(i, 1);
    setChipData(filteredHobbies);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEmpData({ ...empData, [name]: value });
  };

  const [addresschecked, setAddressChecked] = useState(false);
  const handleAddressCheckedChange = (event) => {
    setAddressChecked(!addresschecked);
    setEmpData({ ...empData, empResidentialAddress: { ...currentAddress } });
  };

  const [currentAddress, setCurrentAddress] = useState(
    empCurrentAddress ? { ...empCurrentAddress } : {}
  );

  const handleCurrentAddressChange = (event) => {
    const { value, name } = event.target;
    if (addresschecked) {
      setCurrentAddress({ ...currentAddress, [name]: value });
      setResidentialAddress({ ...currentAddress, [name]: value });
      setEmpData({
        ...empData,
        empResidentialAddress: { ...currentAddress, [name]: value },
        empCurrentAddress: { ...currentAddress, [name]: value },
      });
    } else {
      setCurrentAddress({ ...currentAddress, [name]: value });
      setEmpData({
        ...empData,
        empCurrentAddress: { ...currentAddress, [name]: value },
      });
    }
  };

  const [residentialAddress, setResidentialAddress] = useState(
    empResidentialAddress ? { ...empResidentialAddress } : {}
  );
  const handleResidentialAddressChange = (event) => {
    const { value, name } = event.target;
    setResidentialAddress({ ...residentialAddress, [name]: value });
    setEmpData({
      ...empData,
      empResidentialAddress: { ...residentialAddress, [name]: value },
    });
  };

  const fetchCurrentAddress = (event) => {
    if (event.key === "Enter") {
      if (event.target.value.trim() === "") return;
      dispatch(toggleLoader());
      axiosInstance
        .get("/location", {
          headers: {
            country: "in",
            pincode: event.target.value,
          },
        })
        .then((response) => {
          if (addresschecked) {
            setEmpData({
              ...empData,
              empResidentialAddress: {
                ...currentAddress,
                empAddressCity: Object.keys(response.data.data.districts)[0],
                empAddressState: response.data.data.state,
              },
              empCurrentAddress: {
                ...currentAddress,
                empAddressCity: Object.keys(response.data.data.districts)[0],
                empAddressState: response.data.data.state,
              },
            });
          } else {
            setEmpData({
              ...empData,
              empCurrentAddress: {
                ...currentAddress,
                empAddressCity: Object.keys(response.data.data.districts)[0],
                empAddressState: response.data.data.state,
              },
            });
          }
          dispatch(toggleLoader());
        })
        .catch((err) => {
          dispatch(toggleLoader());
          console.log(err);
        });
    }
  };

  const fetchResidentialAddress = (event) => {
    if (event.key === "Enter") {
      if (event.target.value.trim() === "") return;
      dispatch(toggleLoader());
      axiosInstance
        .get("/location", {
          headers: {
            country: "in",
            pincode: event.target.value,
          },
        })
        .then((response) => {
          setEmpData({
            ...empData,
            empResidentialAddress: {
              ...residentialAddress,
              empAddressCity: Object.keys(response.data.data.districts)[0],
              empAddressState: response.data.data.state,
            },
          });
          dispatch(toggleLoader());
        })
        .catch((err) => {
          dispatch(toggleLoader());
          console.log(err);
        });
    }
  };

  return (
    <Grid container spacing={0} sx={{ minHeight: 150 }}>
      {/* <Grid
        item
        sm={5}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-input": {
            minHeight: 200,
          },
          "& .MuiFormControl-root": { minHeight: 200 },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "0.1em solid",
            borderColor: "textColor.paletteGrey",
            borderRadius: "5px",
          },
        }}
      >
        <TitleTypo sx={{ textTransform: "capitalize", mb: 1, ml: 1 }}>
          {personal.aboutMe}
        </TitleTypo>
        <TextField
          placeholder="Write something about you"
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          fullWidth
          value={empAboutMe ? empAboutMe : ""}
          name="empAboutMe"
          onChange={handleChange}
          error={Boolean(errors.empAboutMe)}
          helperText={errors.empAboutMe?.message}
          inputRef={register({
            maxLength: {
              value: 300,
              message: "minimun length should be 300",
            },
          })}
        />
      </Grid> */}
      <Grid item sm={7}>
        <Box sx={{ mt: 4, ml: 4, mb: 5 }}>
          <ContentBox>
            <TitleTypo sx={{ textTransform: "capitalize", mt: 1 }}>
              {personal.aboutMe}
            </TitleTypo>
            <TextField
              placeholder="Write something about you"
              id="outlined-multiline-flexible"
              multiline
              value={empAboutMe ? empAboutMe : ""}
              name="empAboutMe"
              onChange={handleChange}
              // error={Boolean(errors.empAboutMe)}
              // helperText={errors.empAboutMe?.message}
              // inputRef={register({
              //   maxLength: {
              //     value: 300,
              //     message: "minimun length should be 300",
              //   },
              // })}
              sx={{
                "& .MuiOutlinedInput-root": {
                  width: "100%",
                  minHeight: "40px",
                },
              }}
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>
              {personal.personalEmail}
              <Box component="span" sx={{ color: "red" }}>
                &nbsp;*
              </Box>
            </ContentTypo>
            <CustomTextField
              placeholder="Enter personal email"
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empPersonalEmail ? empPersonalEmail : ""}
              type="email"
              name="empPersonalEmail"
              onChange={(event) => handleChange(event)}
              error={Boolean(errors.empPersonalEmail)}
              helperText={errors.empPersonalEmail?.message}
              inputRef={register({
                required: "Personal email is required.",
                pattern: {
                  value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                  message: "Enter valid email.",
                },
              })}
            />
          </ContentBox>

          {/* <ContentBox>
            <ContentTypo>
              {personal.dob}
              <Box component="span" sx={{ color: "red" }}>
                &nbsp;*
              </Box>
            </ContentTypo>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                maxDate={new Date()}
                inputFormat="dd/MM/yyyy"
                value={empDob}
                onChange={(newValue) => {
                  setEmpData({ ...empData, empDob: newValue });
                }}
                renderInput={(params) => (
                  <CustomTextField {...params} name="empDob" />
                )}
              />
            </LocalizationProvider>
          </ContentBox> */}

          <ContentBox>
            <ContentTypo>{personal.hobbies}</ContentTypo>
            <Box
              noValidate
              autoComplete="off"
              sx={{
                width: 1,
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {chipData[0] !== ""
                ? chipData.map((data, i) => (
                    <ListItem key={i}>
                      <Chip
                        label={data}
                        onDelete={() => handleDelete(i)}
                        sx={{
                          backgroundColor: chipColor[i],
                          color: "#fff",
                          height: 30,
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      />
                    </ListItem>
                  ))
                : ""}
              <CustomTextFieldForChip
                onKeyDown={keyPress}
                type="text"
                // onChange={handleChangeHobbies}
              />
            </Box>
          </ContentBox>
          {/* <ContentBox>
            <ContentTypo>{personal.connections}</ContentTypo>
            <CustomTextField
              placeholder="enter no. of connections"
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empConnections ? empConnections : ""}
              type="number"
              name="empConnections"
              onChange={handleChange}
            />
          </ContentBox> */}
          <ContentBox>
            <ContentTypo>{personal.currentAddress}</ContentTypo>
            <Box sx={{ width: 1 }}>
              <CustomTextField
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={
                  empCurrentAddress?.empAddressLineOne
                    ? currentAddress.empAddressLineOne
                    : ""
                }
                type="text"
                name="empAddressLineOne"
                onChange={(event) => {
                  handleCurrentAddressChange(event);
                }}
                placeholder="Address line 1"
                sx={{ width: "100%" }}
              />
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  mt: 1,
                }}
              >
                <CustomTextField
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    empCurrentAddress?.empAddressCity
                      ? empCurrentAddress.empAddressCity
                      : ""
                  }
                  type="text"
                  name="empAddressCity"
                  onChange={handleCurrentAddressChange}
                  placeholder="City"
                  sx={{ width: "30%" }}
                />
                <CustomTextField
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    empCurrentAddress?.empAddressState
                      ? empCurrentAddress.empAddressState
                      : ""
                  }
                  type="text"
                  name="empAddressState"
                  onChange={handleCurrentAddressChange}
                  placeholder="State"
                  sx={{ width: "30%" }}
                />
                <CustomTextField
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    empCurrentAddress?.empAddressPinCode
                      ? empCurrentAddress.empAddressPinCode
                      : ""
                  }
                  type="number"
                  name="empAddressPinCode"
                  onKeyDown={fetchCurrentAddress}
                  onChange={handleCurrentAddressChange}
                  placeholder="Pin code"
                  sx={{
                    width: "30%",
                  }}
                />
              </Box>
            </Box>
          </ContentBox>
          <Box
            sx={{
              width: 1,
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
            }}
          >
            <Checkbox
              checked={addresschecked}
              onChange={handleAddressCheckedChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <ContentTypo sx={{ fontWeight: "400" }}>
              {personal.addressCheckbox}
            </ContentTypo>
          </Box>
          <ContentBox>
            <ContentTypo>{personal.residentialAddress}</ContentTypo>
            <Box sx={{ width: 1 }}>
              <CustomTextField
                disabled={addresschecked}
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={
                  empResidentialAddress?.empAddressLineOne
                    ? empResidentialAddress.empAddressLineOne
                    : ""
                }
                type="text"
                name="empAddressLineOne"
                onChange={handleResidentialAddressChange}
                placeholder="Address line 1"
                sx={{ width: "100%" }}
              />
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  mt: 1,
                }}
              >
                <CustomTextField
                  disabled={addresschecked}
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    empResidentialAddress?.empAddressCity
                      ? empResidentialAddress.empAddressCity
                      : ""
                  }
                  type="text"
                  name="empAddressCity"
                  onChange={handleResidentialAddressChange}
                  placeholder="City"
                  sx={{ width: "30%" }}
                />
                <CustomTextField
                  disabled={addresschecked}
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    empResidentialAddress?.empAddressState
                      ? empResidentialAddress.empAddressState
                      : ""
                  }
                  type="text"
                  name="empAddressState"
                  onChange={handleResidentialAddressChange}
                  placeholder="State"
                  sx={{ width: "30%" }}
                />
                <CustomTextField
                  disabled={addresschecked}
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={
                    empResidentialAddress?.empAddressPinCode
                      ? empResidentialAddress.empAddressPinCode
                      : ""
                  }
                  type="text"
                  name="empAddressPinCode"
                  onKeyDown={fetchResidentialAddress}
                  onChange={handleResidentialAddressChange}
                  placeholder="Pin code"
                  sx={{ width: "30%" }}
                />
              </Box>
            </Box>
          </ContentBox>
          {personalDetails.map((field, index) => (
            <ContentBox key={index} sx={{ position: "relative" }}>
              <ContentTypo>{field.fieldName}</ContentTypo>
              {field.fieldType === "date" ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat="dd/MM/yyyy"
                    value={field.fieldValue ? field.fieldValue : null}
                    onChange={(newValue) => {
                      const updates = personalDetails.map((personalDetail, i) =>
                        index === i
                          ? {
                              ...personalDetail,
                              fieldValue: newValue,
                            }
                          : personalDetail
                      );
                      setPersonalDetails(updates);
                    }}
                    renderInput={(params) => (
                      <CustomTextField {...params} name="fieldValue" />
                    )}
                  />
                </LocalizationProvider>
              ) : (
                <TextField
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={field.fieldValue}
                  type={field.fieldType}
                  name={field.fieldName}
                  onChange={(event) => handleNewFieldChange(event, index)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      width: "80%",
                      height: "40px",
                    },
                  }}
                />
              )}
              <ClearIcon
                onClick={() => removeFields(index)}
                sx={{
                  fontSize: "20px",
                  cursor: "pointer",
                  position: "absolute",
                  right: "30px",
                }}
              />
            </ContentBox>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default PersonalEditable;
