import React from "react";

import { Grid, Avatar, LinearProgress, Box, TextField } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BadgeIcon from "@mui/icons-material/Badge";

import { profileInfoConstant } from "./profileInfo.constant";

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

const ProfileInfoEditable = (props) => {
  const { tab, setTab, employee, setEmployee, profileProgress } = props;

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
    setEmployee({ ...employee, [name]: value });
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

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
              placeholder="Username"
              variant="standard"
              type="text"
              name="empName"
              value={empName}
              onChange={handleChange}
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
            <StyledTab icon={<LocalCafeIcon />} label="Personal" />
            <StyledTab icon={<ImportContactsIcon />} label="professional" />
            <StyledTab icon={<BadgeIcon />} label="Skills And Qualifications" />
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
              </ContentBoldTypo>
              <CustomTextField
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={empEmail}
                type="text"
                name="empEmail"
                onChange={handleChange}
              />
            </FieldBox>
            <FieldBox>
              <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                {profileInfoConstant.department}
              </ContentBoldTypo>
              <CustomTextField
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={empDepartment}
                type="text"
                name="empDepartment"
                onChange={handleChange}
              />
            </FieldBox>
            <FieldBox>
              <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                {profileInfoConstant.designation}
              </ContentBoldTypo>
              <CustomTextField
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                value={empDesignation}
                type="text"
                name="empDesignation"
                onChange={handleChange}
              />
            </FieldBox>
            <FieldBox>
              <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
                {profileInfoConstant.dateOfJoining}
              </ContentBoldTypo>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  inputFormat="dd/MM/yyyy"
                  value={empDoj ? empDoj : new Date()}
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
              </ContentBoldTypo>
              <CustomTextField
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                placeholder="sunilee"
                value={empReportingManager ? empReportingManager : "sunilee"}
                type="text"
                name="empReportingManager"
                onChange={handleChange}
              />
            </FieldBox>
          </CustomGridBox>
        </Box>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default ProfileInfoEditable;
