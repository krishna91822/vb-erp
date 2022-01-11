import React, { useState, useEffect } from "react";

import { Grid, Avatar, LinearProgress, Box, TextField } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BadgeIcon from "@mui/icons-material/Badge";

import { profileInfoConstant } from "./profileInfo.constant";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";

import {
  CustomTextField,
  CustomGridBox,
  FieldBox,
  ContentBoldTypo,
} from "./personalInfoEditable.styles";

import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  StyledTabs,
  StyledTab,
  TitleTypo,
  SubTitleTypo,
} from "./../../UI/commonStyles";

import axiosInstance from "./../../../helpers/axiosInstance";

const ProfileInfoEditable = (props) => {
  const {
    tab,
    setTab,
    employee,
    setEmployee,
    profileProgress,
    // register,
    validate,
    errors,
  } = props;

  const {
    empName,
    empEmail,
    empDepartment,
    empDesignation,
    empDoj,
    empReportingManager,
    empDob,
  } = employee;

  const profilePercentage = profileProgress();

  const handleChange = (event, newValue) => {
    const { value, name } = event.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "35px",
      height: "35px",
      display: "flex",
      alignContent: "center",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      width: "30px",
      padding: "0",
    }),
  };

  const [empDetails, setEmpDetails] = useState({});
  const [empNameLoading, setEmpNameLoading] = useState(true);
  const [reportingTo, setReportingTo] = useState(
    empReportingManager
      ? { label: empReportingManager, value: empReportingManager }
      : null
  );

  //dropdown
  const department = profileInfoConstant.departmentDropdown;
  const designation = profileInfoConstant.designationDropdown;
  const departmentOptions = department.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const designationOptions = designation.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
  const [departmentDropdown, setDepartmentDropdown] = useState(
    empDepartment ? { label: empDepartment, value: empDepartment } : null
  );
  const [designationDropdown, setDesignationDropdown] = useState(
    empDesignation ? { label: empDesignation, value: empDesignation } : null
  );

  useEffect(() => {
    axiosInstance
      .get(`/employees?fields=empName,empId,-_id&page=1&limit=200`)
      .then((response) => {
        const data = response.data.data.map((item) => {
          return {
            label: `${item.empName} (${item.empId})`,
            value: item.empName,
          };
        });
        setEmpDetails(data);
        if (empReportingManager === "") setReportingTo(data[0]);
        if (empDepartment === "" && empDesignation === "")
          setEmployee({
            ...employee,
            empReportingManager: data[0].value,
            // empDepartment: departmentDropdown.value,
            // empDesignation: designationDropdown.value,
          });
        setEmpNameLoading((prev) => !prev);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadEmployeeOptions = (inputValue, callback) => {
    axiosInstance
      .get(`/employees?fields=empName,empId,-_id&search=${inputValue}`)
      .then(function (response) {
        callback(
          response.data.data.map((item) => {
            return {
              label: `${item.empName} (${item.empId})`,
              value: `${item.empName} (${item.empId})`,
            };
          })
        );
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <div>
      <Grid
        container
        spacing={0}
        sx={{
          minHeight: "100px",
          borderBottom: "0.1em solid",
          borderColor: "textColor.paletteGrey",
        }}
      >
        <Grid item sm={4}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: "20px 0",
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                backgroundColor: "textColor.light",
              }}
            >
              <PersonIcon
                sx={{
                  height: "60%",
                  width: "55%",
                  color: "textColor.lightDark",
                }}
              />
            </Avatar>
            <TitleTypo sx={{ mt: 1, textTransform: "capitalize" }}>
              <TextField
                id="standard-basic"
                placeholder="Full Name *"
                variant="standard"
                type="text"
                name="empName"
                value={empName}
                onChange={(e) => {
                  handleChange(e);
                  validate(employee);
                }}
                error={Boolean(errors.empName)}
                // helperText={errors.empName}
                sx={{
                  "& .MuiInput-input": {
                    color: "textColor",
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: "center",
                  },
                }}
              />
            </TitleTypo>
            <Box sx={{ width: "75%", margin: "8px 0" }}>
              <LinearProgress
                variant="determinate"
                value={profilePercentage}
                color="primary"
                sx={{
                  height: 5,
                  borderRadius: 50,
                }}
              />
            </Box>
            <SubTitleTypo sx={{ textTransform: "lowercase" }}>
              {profilePercentage}
              {profileInfoConstant.profilePercentage}
            </SubTitleTypo>
          </Box>
        </Grid>
        <Grid item sm={8}>
          <Box
            sx={{
              // width: "calc(100% - 20px)",
              minHeight: 90,
              border: "0.1em solid",
              borderRadius: "5px",
              borderColor: "textColor.paletteGrey",
              mt: 1,
              mb: 1,
            }}
          >
            <CustomGridBox sx={{ mt: 1, mb: 1 }}>
              <FieldBox>
                <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                  {profileInfoConstant.emailId}
                  <Box component="span" sx={{ color: "red" }}>
                    &nbsp;*
                  </Box>
                </ContentBoldTypo>
                <CustomTextField
                  placeholder="company email"
                  autoComplete="off"
                  required
                  id="outlined-basic"
                  variant="outlined"
                  value={empEmail}
                  type="text"
                  name="empEmail"
                  onChange={(e) => {
                    handleChange(e);
                    validate(employee);
                  }}
                  error={Boolean(errors?.empEmail)}
                  // helperText={errors?.empEmail}
                />
              </FieldBox>
              <FieldBox>
                <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                  {profileInfoConstant.department}
                  <Box component="span" sx={{ color: "red" }}>
                    &nbsp;*
                  </Box>
                </ContentBoldTypo>
                <Box
                  sx={{
                    width: "80%",
                    height: "35px",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  <CreatableSelect
                    value={departmentDropdown ? departmentDropdown : null}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: "35px",
                        height: "35px",
                        display: "flex",
                        alignContent: "center",
                        borderColor: errors?.empDepartment
                          ? "#D32F2F"
                          : "hsl(0, 0%, 80%)",
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        width: "30px",
                        padding: "0",
                      }),
                    }}
                    // isLoading={empNameLoading}
                    isSearchable
                    name="empDepartment"
                    options={departmentOptions}
                    onChange={(value) => {
                      setDepartmentDropdown(value);
                      setEmployee({
                        ...employee,
                        empDepartment: value.value,
                      });
                      validate(employee);
                    }}
                  />
                </Box>
              </FieldBox>
              <FieldBox>
                <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                  {profileInfoConstant.designation}
                  <Box component="span" sx={{ color: "red" }}>
                    &nbsp;*
                  </Box>
                </ContentBoldTypo>
                <Box
                  sx={{
                    width: "80%",
                    height: "35px",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  <CreatableSelect
                    value={designationDropdown ? designationDropdown : null}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: "35px",
                        height: "35px",
                        display: "flex",
                        alignContent: "center",
                        borderColor: errors?.empDesignation
                          ? "#D32F2F"
                          : "hsl(0, 0%, 80%)",
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        width: "30px",
                        padding: "0",
                      }),
                    }}
                    // isLoading={empNameLoading}
                    isSearchable
                    name="empDesignation"
                    options={designationOptions}
                    onChange={(value) => {
                      setDesignationDropdown(value);
                      setEmployee({
                        ...employee,
                        empDesignation: value.value,
                      });
                      validate(employee);
                    }}
                  />
                </Box>
              </FieldBox>
              <FieldBox>
                <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                  {profileInfoConstant.dateOfJoining}
                  <Box component="span" sx={{ color: "red" }}>
                    &nbsp;*
                  </Box>
                </ContentBoldTypo>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    errorText={"error"}
                    inputFormat="dd/MM/yyyy"
                    value={empDoj}
                    onChange={(newValue) => {
                      setEmployee({ ...employee, empDoj: newValue });
                      validate(employee);
                    }}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        name="empDoj"
                        error={Boolean(errors?.empDoj)}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FieldBox>
              <FieldBox>
                <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                  {profileInfoConstant.reportingManager}
                  <Box component="span" sx={{ color: "red" }}>
                    &nbsp;*
                  </Box>
                </ContentBoldTypo>
                <Box
                  sx={{
                    width: "80%",
                    height: "35px",
                    fontSize: "14px",
                    marginLeft: "8px",
                  }}
                >
                  <AsyncSelect
                    value={reportingTo ? reportingTo : null}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        minHeight: "35px",
                        height: "35px",
                        display: "flex",
                        alignContent: "center",
                        borderColor: errors?.empReportingManager
                          ? "#D32F2F"
                          : "hsl(0, 0%, 80%)",
                      }),
                      indicatorsContainer: (provided, state) => ({
                        ...provided,
                        width: "30px",
                        padding: "0",
                      }),
                    }}
                    cacheOptions
                    loadOptions={loadEmployeeOptions}
                    defaultOptions
                    onChange={(value) => {
                      setReportingTo(value);
                      setEmployee({
                        ...employee,
                        empReportingManager: value.value,
                      });
                      validate(employee);
                    }}
                    name="empReportingManager"
                    // placeholder="Select univeristy"
                  />
                </Box>
              </FieldBox>
              <FieldBox>
                <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                  {profileInfoConstant.dob}
                  <Box component="span" sx={{ color: "red" }}>
                    &nbsp;*
                  </Box>
                </ContentBoldTypo>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    maxDate={new Date()}
                    inputFormat="dd/MM/yyyy"
                    value={empDob}
                    onChange={(newValue) => {
                      setEmployee({ ...employee, empDob: newValue });
                      validate(employee);
                    }}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        name="empDob"
                        error={Boolean(errors?.empDob)}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FieldBox>
            </CustomGridBox>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ width: "100%" }}>
        <StyledTabs value={tab} onChange={handleTabChange}>
          <StyledTab
            icon={<LocalCafeIcon />}
            label={profileInfoConstant.tabs.personal}
            sx={{ fontSize: "16px" }}
          />
          <StyledTab
            icon={<ImportContactsIcon />}
            label={profileInfoConstant.tabs.professional}
            sx={{ fontSize: "16px" }}
          />
          <StyledTab
            icon={<BadgeIcon />}
            label={profileInfoConstant.tabs.skills}
            sx={{ fontSize: "16px" }}
          />
        </StyledTabs>
      </Box>
    </div>
  );
};

export default ProfileInfoEditable;