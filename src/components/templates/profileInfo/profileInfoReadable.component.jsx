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
import { grid } from "@mui/system";

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
            <TitleTypo
              sx={{ mt: 1, textTransform: "capitalize", fontSize: "16px" }}
            >
              {empName}
            </TitleTypo>
            <Box sx={{ width: "75%", margin: "8px 0" }}>
              <LinearProgress
                variant="determinate"
                value={profilePercentage ? profilePercentage : 0}
                color="primary"
                sx={{
                  height: 5,
                  borderRadius: 50,
                }}
              />
            </Box>
            <SubTitleTypo sx={{ textTransform: "lowercase" }}>
              {profilePercentage ? profilePercentage : 0}
              {profileInfoConstant.profilePercentage}
            </SubTitleTypo>
          </Box>
        </Grid>
        <Grid item sm={8}>
          <Box
            sx={{
              width: "calc( 100% - 80px )",
              minHeight: "80",
              border: "0.1em solid",
              borderColor: "textColor.paletteGrey",
              borderRadius: "5px",
              mt: 1,
              mb: 1,
            }}
          >
            <CustomGridBox sx={{ mt: 1, mb: 1 }}>
              <ContentBoldTypo
                sx={{ textTransform: "capitalize", pl: 1, fontSize: "16px" }}
              >
                {profileInfoConstant.employeeId} - {empId}
              </ContentBoldTypo>
              <ContentBoldTypo
                sx={{ textTransform: "capitalize", pl: 1, fontSize: "16px" }}
              >
                {profileInfoConstant.emailId} - {empEmail}
              </ContentBoldTypo>
              <ContentBoldTypo
                sx={{ textTransform: "capitalize", pl: 1, fontSize: "16px" }}
              >
                {profileInfoConstant.department} - {empDepartment}
              </ContentBoldTypo>
              <ContentBoldTypo
                sx={{ textTransform: "capitalize", pl: 1, fontSize: "16px" }}
              >
                {profileInfoConstant.designation} - {empDesignation}
              </ContentBoldTypo>
              <ContentBoldTypo
                sx={{ textTransform: "capitalize", pl: 1, fontSize: "16px" }}
              >
                {profileInfoConstant.dateOfJoining} -{" "}
                {empDoj ? new Date(empDoj).toDateString().slice(4) : ""}
              </ContentBoldTypo>
              <ContentBoldTypo
                sx={{ textTransform: "capitalize", pl: 1, fontSize: "16px" }}
              >
                {profileInfoConstant.reportingManager} - {empReportingManager}
              </ContentBoldTypo>
            </CustomGridBox>
          </Box>
        </Grid>

        <Grid item></Grid>
      </Grid>
      <Grid>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab
            icon={<LocalCafeIcon />}
            label="Personal"
            sx={{ fontSize: "16px" }}
          />
          <StyledTab
            icon={<ImportContactsIcon />}
            label="professional"
            sx={{ fontSize: "16px" }}
          />
          <StyledTab
            icon={<BadgeIcon />}
            label="Skills And Qualifications"
            sx={{ fontSize: "16px" }}
          />
        </StyledTabs>
      </Grid>
    </div>
  );
};

export default ProfileInfoReadable;
