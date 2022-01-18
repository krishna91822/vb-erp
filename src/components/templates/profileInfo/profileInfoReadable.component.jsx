import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Avatar,
  LinearProgress,
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  CardHeader,
} from "@mui/material";
import { StyledTypography } from "../../../assets/GlobalStyle/style";
import { CustomGridBox } from "./profileInfoReadable.styles";
import PersonIcon from "@mui/icons-material/Person";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BadgeIcon from "@mui/icons-material/Badge";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";

import { profileInfoConstant } from "./profileInfo.constant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  StyledTabs,
  StyledTab,
  TitleTypo,
  SubTitleTypo,
  ContentBoldTypo,
  ContentTypo,
  ProfileNameTypo,
} from "./../../UI/commonStyles";
import { ContentBox } from "../personal/personalReadable.styles";

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
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [changeVariant, setChangeVariant] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChangeVariant(true);
    }, 2000);
  });
  return (
    <div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
        }}
      >
        <Container maxWidth="xl">
          <StyledTypography sx={{ mb: 3 }} variant="h4">
            Account
          </StyledTypography>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    mt={6.5}
                    mb={6}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      mt={2}
                      sx={{
                        height: 64,
                        mb: 2,
                        width: 64,
                      }}
                    >
                      <PersonIcon
                        sx={{
                          height: "60%",
                          width: "60%",
                          color: "rgb(17,24,39)",
                        }}
                      />
                    </Avatar>

                    <ProfileNameTypo>{empName}</ProfileNameTypo>

                    <Box sx={{ width: "75%", margin: "15px 0" }}>
                      <LinearProgress
                        variant="indeterminate"
                        value={profilePercentage ? profilePercentage : 0}
                        color="warning"
                        sx={{
                          height: 5,
                          borderRadius: 50,
                        }}
                        {...(changeVariant && {
                          variant: "determinate",
                        })}
                      />
                    </Box>

                    <Typography color="textSecondary" variant="body2">
                      {profilePercentage ? profilePercentage : 0}
                      {profileInfoConstant.profilePercentage}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item lg={8} md={6} xs={6}>
              <Card>
                <CardContent>
                  <Grid item sm={8}>
                    <Box mt={2}>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.employeeId}</TitleTypo>
                        <ContentTypo>{empId}</ContentTypo>
                      </ContentBox>
                    </Box>
                    <Box mt={2}>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.emailId}</TitleTypo>
                        <ContentTypo>{empEmail}</ContentTypo>
                      </ContentBox>
                    </Box>
                    <Box mt={2}>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.department}</TitleTypo>
                        <ContentTypo>{empDepartment}</ContentTypo>
                      </ContentBox>
                    </Box>
                    <Box mt={2}>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.designation}</TitleTypo>
                        <ContentTypo>{empDesignation}</ContentTypo>
                      </ContentBox>
                    </Box>
                    <Box mt={2}>
                      <ContentBox>
                        <TitleTypo>
                          {profileInfoConstant.dateOfJoining}
                        </TitleTypo>
                        <ContentTypo>
                          {empDoj
                            ? new Date(empDoj).toDateString().slice(4)
                            : ""}
                        </ContentTypo>
                      </ContentBox>
                    </Box>
                    <Box mt={2}>
                      <ContentBox>
                        <TitleTypo>
                          {profileInfoConstant.reportingManager}
                        </TitleTypo>
                        <ContentTypo>{empReportingManager}</ContentTypo>
                      </ContentBox>
                    </Box>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default ProfileInfoReadable;
