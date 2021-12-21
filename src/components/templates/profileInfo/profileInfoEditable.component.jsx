import React, { useState, useEffect } from "react";

import { Grid, Avatar, LinearProgress, Box, TextField } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BadgeIcon from "@mui/icons-material/Badge";

import { profileInfoConstant } from "./profileInfo.constant";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

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
    register,
    errors,
  } = props;

  const {
    empName,
    empEmail,
    empDepartment,
    empDesignation,
    empDoj,
    empReportingManager,
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
      minHeight: "30px",
      height: "30px",
      display: "flex",
      alignContent: "center",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      width: "30px",
      padding: "0",
      // paddingRight: "2px",
      // color: "gray",
    }),
  };

  const [empDetails, setEmpDetails] = useState({});
  const [empNameLoading, setEmpNameLoading] = useState(true);
  const [reportingTo, setReportingTo] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/employees?fields=empName,empId,-_id")
      .then((response) => {
        const data = response.data.data.map((item) => {
          return {
            label: `${item.empName} (${item.empId})`,
            value: item.empName,
          };
        });
        setEmpDetails(data);
        setReportingTo(data[0]);
        setEmployee({
          ...employee,
          empReportingManager: data[0].value,
        });
        setEmpNameLoading((prev) => !prev);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid
      container
      spacing={0}
      sx={{
        minHeight: "100px",
        borderBottom: "2px solid",
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
              sx={{ height: "60%", width: "55%", color: "textColor.lightDark" }}
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
              onChange={handleChange}
              error={Boolean(errors.empName)}
              helperText={errors.empName?.message}
              inputRef={register({
                required: "Full name is required.",
              })}
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
        <Box sx={{ width: "100%" }}>
          <StyledTabs value={tab} onChange={handleTabChange}>
            <StyledTab
              icon={<LocalCafeIcon />}
              label={profileInfoConstant.tabs.personal}
            />
            <StyledTab
              icon={<ImportContactsIcon />}
              label={profileInfoConstant.tabs.professional}
            />
            <StyledTab
              icon={<BadgeIcon />}
              label={profileInfoConstant.tabs.skills}
            />
          </StyledTabs>
        </Box>
        <Box
          sx={{
            width: "calc(100% - 20px)",
            minHeight: 90,
            border: "2px solid",
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
                onChange={handleChange}
                error={Boolean(errors.empEmail)}
                helperText={errors.empEmail?.message}
                inputRef={register({
                  required: "Company email is required.",
                  pattern: {
                    value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                    message: "Enter valid email.",
                  },
                })}
              />
            </FieldBox>
            <FieldBox>
              <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                {profileInfoConstant.department}
                <Box component="span" sx={{ color: "red" }}>
                  &nbsp;*
                </Box>
              </ContentBoldTypo>
              <CustomTextField
                placeholder="Enter department"
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={empDepartment}
                type="text"
                name="empDepartment"
                onChange={handleChange}
                error={Boolean(errors.empDepartment)}
                helperText={errors.empDepartment?.message}
                inputRef={register({
                  required: "Department is required.",
                })}
              />
            </FieldBox>
            <FieldBox>
              <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                {profileInfoConstant.designation}
                <Box component="span" sx={{ color: "red" }}>
                  &nbsp;*
                </Box>
              </ContentBoldTypo>
              <CustomTextField
                placeholder="Enter designation"
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={empDesignation}
                type="text"
                name="empDesignation"
                onChange={handleChange}
                error={Boolean(errors.empDesignation)}
                helperText={errors.empDesignation?.message}
                inputRef={register({
                  required: "Department is required.",
                })}
              />
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
                  inputFormat="dd/MM/yyyy"
                  value={empDoj}
                  onChange={(newValue) => {
                    setEmployee({ ...employee, empDoj: newValue });
                  }}
                  renderInput={(params) => (
                    <CustomTextField {...params} name="empDoj" />
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
                  height: "28px",
                  fontSize: "14px",
                  marginLeft: "8px",
                }}
              >
                <CreatableSelect
                  value={reportingTo ? reportingTo : null}
                  isLoading={empNameLoading}
                  styles={customStyles}
                  isSearchable
                  name="empReportingManager"
                  options={empDetails}
                  onChange={(value) => {
                    setReportingTo(value);
                    setEmployee({
                      ...employee,
                      empReportingManager: value.value,
                    });
                  }}
                />
              </Box>
            </FieldBox>
          </CustomGridBox>
        </Box>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default ProfileInfoEditable;
