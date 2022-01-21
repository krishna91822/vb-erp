import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Avatar,
  LinearProgress,
  Box,
  TextField,
  Container,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { StyledTypography } from "../../../assets/GlobalStyle/style";
import { ContentBox } from "../personal/personalReadable.styles";
import {
  TitleTypo,
  ContentTypo,
  ProfileNameTypo,
} from "./../../UI/commonStyles";
import PersonIcon from "@mui/icons-material/Person";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BadgeIcon from "@mui/icons-material/Badge";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";

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

// import {
//   StyledTabs,
//   StyledTab,
//   TitleTypo,
//   SubTitleTypo,
// } from "./../../UI/commonStyles";

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
    editSwitch,
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0,
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Grid item lg={6} md={6} xs={6}>
              <StyledTypography sx={{ mb: 3 }} variant="h4">
                Account
              </StyledTypography>
            </Grid>
            <Grid item lg={6} md={6} xs={6}>
              <Box sx={{ mb: 3 }}>{editSwitch}</Box>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item lg={4} md={12} xs={12}>
              <Card>
                <CardContent>
                  <Box
                    mt={8}
                    mb={7}
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

                    <Box sx={{ width: "75%", margin: "20px 0" }}>
                      <LinearProgress
                        variant="determinate"
                        value={profilePercentage}
                        color="warning"
                        sx={{
                          height: 5,
                          borderRadius: 50,
                        }}
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

            <Grid item lg={8} md={12} xs={12}>
              <Card>
                <CardContent>
                  <Grid item sm={8}>
                    <Box>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.emailId}</TitleTypo>
                        <ContentTypo>
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
                        </ContentTypo>
                      </ContentBox>
                    </Box>

                    <Box>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.department}</TitleTypo>
                        <ContentTypo>
                          <CreatableSelect
                            value={
                              departmentDropdown ? departmentDropdown : null
                            }
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
                        </ContentTypo>
                      </ContentBox>
                    </Box>

                    <Box>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.designation}</TitleTypo>
                        <ContentTypo>
                          <CreatableSelect
                            value={
                              designationDropdown ? designationDropdown : null
                            }
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
                        </ContentTypo>
                      </ContentBox>
                    </Box>
                    <Box>
                      <ContentBox>
                        <TitleTypo>
                          {profileInfoConstant.dateOfJoining}
                        </TitleTypo>
                        <ContentTypo>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              errorText={"error"}
                              inputFormat="dd/MM/yyyy"
                              value={empDoj}
                              onChange={(newValue) => {
                                setEmployee({
                                  ...employee,
                                  empDoj: newValue,
                                });
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
                        </ContentTypo>
                      </ContentBox>
                    </Box>
                    <Box>
                      <ContentBox>
                        <TitleTypo>
                          {profileInfoConstant.reportingManager}
                        </TitleTypo>
                        <ContentTypo>
                          <AsyncSelect
                            maxMenuHeight={70}
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
                            overflow="scroll"
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
                        </ContentTypo>
                      </ContentBox>
                    </Box>

                    <Box>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.dob}</TitleTypo>
                        <ContentTypo>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              maxDate={new Date()}
                              inputFormat="dd/MM/yyyy"
                              value={empDob}
                              onChange={(newValue) => {
                                setEmployee({
                                  ...employee,
                                  empDob: newValue,
                                });
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
                        </ContentTypo>
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
export default ProfileInfoEditable;
