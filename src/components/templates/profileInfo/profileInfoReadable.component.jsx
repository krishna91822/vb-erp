import React from "react";

import { Grid, Avatar, LinearProgress, Box } from "@mui/material";

import { CustomGridBox } from "./profileInfoReadable.styles";

import PersonIcon from "@mui/icons-material/Person";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BadgeIcon from "@mui/icons-material/Badge";

import { profileInfoConstant } from "./profileInfo.constant";

import {
  StyledTabs,
  StyledTab,
  TitleTypo,
  SubTitleTypo,
  ContentBoldTypo,
} from "./../../UI/commonStyles";

const ProfileInfoReadable = ({
  value,
  setValue,
  currentEmployee,
  profileProgress,
}) => {
  const {
    empName,
    empId,
    empEmail,
    empDepartment,
    empDesignation,
    empDoj,
    empReportingManager,
  } = currentEmployee;

  const profilePercentage = profileProgress();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const profileProgress = (employeeData) => {
  //   const totalFields = Object.keys(employeeData).length;
  //   const completedFields = Object.values(employeeData).filter(
  //     (d) => d !== null && d !== "" && d.length !== 0 && d[0] !== ""
  //   ).length;
  //   const percentage = Math.floor((completedFields / totalFields) * 100);
  //   return percentage;
  // };

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
            {empName}
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
          <StyledTabs value={value} onChange={handleChange}>
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
            <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
              {profileInfoConstant.employeeId} - {empId}
            </ContentBoldTypo>
            <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
              {profileInfoConstant.emailId} - {empEmail}
            </ContentBoldTypo>
            <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
              {profileInfoConstant.department} - {empDepartment}
            </ContentBoldTypo>
            <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
              {profileInfoConstant.designation} -{" "}
              {empDesignation ? empDesignation.toUpperCase() : empDesignation}
            </ContentBoldTypo>
            <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
              {profileInfoConstant.dateOfJoining} -{" "}
              {empDoj ? new Date(empDoj).toDateString().slice(4) : ""}
            </ContentBoldTypo>
            <ContentBoldTypo sx={{ textTransform: "capitalize", pl: 1 }}>
              {profileInfoConstant.reportingManager} - {empReportingManager}
            </ContentBoldTypo>
          </CustomGridBox>
        </Box>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default ProfileInfoReadable;
