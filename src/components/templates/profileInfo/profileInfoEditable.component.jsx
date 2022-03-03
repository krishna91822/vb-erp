/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
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
  Badge,
  IconButton,
  Input,
} from "@mui/material";
import { StyledTypography } from "../../../assets/GlobalStyle/style";
import { ContentBox } from "../personal/personalReadable.styles";
import { TitleTypo, ContentTypo } from "./../../UI/commonStyles";
import PersonIcon from "@mui/icons-material/Person";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { deepOrange } from "@mui/material/colors";

import { profileInfoConstant } from "./profileInfo.constant";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
import Select from "react-select";

import { CustomTextField } from "./personalInfoEditable.styles";

import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import axiosInstance from "./../../../helpers/axiosInstance";
import { useLocation } from "react-router-dom";

import validator from "validator";

const ProfileInfoEditable = (props) => {
  const {
    tab,
    setTab,
    employee,
    setEmployee,
    profileProgress,
    editSwitch,
    errors,
    setErrors,
    validateForm,
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

  const ref = useRef();
  const [profilePicture, setProfilePicture] = useState(null);
  let avatarChar = empName ? empName.charAt(0).toUpperCase() : "";
  const handlePicture = (event) => {
    const files = Array.from(event.target.files);
    const file = files[0];
    setProfilePicture(URL.createObjectURL(file));
  };
  const [empDetails, setEmpDetails] = useState({});
  const [empNameLoading, setEmpNameLoading] = useState(true);
  const [reportingTo, setReportingTo] = useState(
    empReportingManager
      ? { label: empReportingManager, value: empReportingManager }
      : null
  );

  //dropdown department
  const [department, setDepartment] = useState(
    empDepartment ? { label: empDepartment, value: empDepartment } : null
  );
  const [departmentOption, setDepartmentOption] = useState([]);
  const [departmentLoading, setDepartmentLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/dropdowns?dropdownName=department`)
      .then(function (response) {
        setDepartmentLoading(false);
        const filteredDepartmentOption =
          response.data.data[0].dropdownArray.map((el) => {
            return { label: el.label, value: el.value };
          });
        setDepartmentOption(filteredDepartmentOption);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  //dropdown designation
  const [designation, setDesignation] = useState(
    empDesignation ? { label: empDesignation, value: empDesignation } : null
  );
  const [designationOption, setDesignationOption] = useState([]);
  const [designationLoading, setDesignationLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get(`/dropdowns?dropdownName=designation`)
      .then(function (response) {
        setDesignationLoading(false);
        const filteredDesignationOption =
          response.data.data[0].dropdownArray.map((el) => {
            return { label: el.label, value: el.value };
          });
        setDesignationOption(filteredDesignationOption);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

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
          });
        setEmpNameLoading((prev) => !prev);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setReportingTo(
      empReportingManager
        ? { label: empReportingManager, value: empReportingManager }
        : null
    );
    setDepartment(
      empDepartment ? { label: empDepartment, value: empDepartment } : null
    );
    setDesignation(
      empDesignation ? { label: empDesignation, value: empDesignation } : null
    );
  }, [empReportingManager, empDepartment, empDesignation]);

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
                    mb={5}
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <>
                      <Input
                        ref={ref}
                        type="file"
                        accept="image/*"
                        onChange={handlePicture}
                        id="uploadButton"
                        style={{ display: "none" }}
                      />
                      <label htmlFor="uploadButton">
                        <IconButton component="span">
                          <Badge
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={<CloudUploadIcon />}
                            overlap="circular"
                          >
                            <Avatar
                              mt={2}
                              sx={{
                                height: 64,
                                mb: 2.3,
                                width: 64,
                                background: "rgb(237,108,2)",
                              }}
                              src={profilePicture}
                            >
                              {avatarChar.length > 0 ? (
                                avatarChar
                              ) : (
                                <PersonIcon
                                  sx={{
                                    height: "100%",
                                    width: "60%",
                                    color: "rgb(17,24,39)",
                                  }}
                                />
                              )}
                            </Avatar>
                          </Badge>
                        </IconButton>
                      </label>
                    </>

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
                          validateForm(e);
                        }}
                        error={Boolean(errors.empName)}
                        helperText={errors?.empName}
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
                              validateForm(e);
                            }}
                            error={Boolean(errors?.empEmail)}
                            helperText={errors?.empEmail}
                          />
                        </ContentTypo>
                      </ContentBox>
                    </Box>

                    <Box>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.department}</TitleTypo>
                        <ContentTypo>
                          <Select
                            maxMenuHeight={130}
                            className="basic-single"
                            classNamePrefix="select"
                            value={department ? department : null}
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
                            isLoading={departmentLoading}
                            isSearchable
                            name="empDepartment"
                            options={departmentOption}
                            onChange={(value) => {
                              setDepartment(value);
                              setEmployee({
                                ...employee,
                                empDepartment: value?.value,
                              });
                              validateForm(null, ["empDepartment", value]);
                            }}
                          />
                        </ContentTypo>
                      </ContentBox>
                    </Box>

                    <Box>
                      <ContentBox>
                        <TitleTypo>{profileInfoConstant.designation}</TitleTypo>
                        <ContentTypo>
                          <Select
                            maxMenuHeight={130}
                            className="basic-single"
                            classNamePrefix="select"
                            value={designation ? designation : null}
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
                            isLoading={designationLoading}
                            isSearchable
                            name="empDesignation"
                            options={designationOption}
                            onChange={(value) => {
                              setDesignation(value);
                              setEmployee({
                                ...employee,
                                empDesignation: value?.value,
                              });
                              validateForm(null, ["empDesignation", value]);
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
                                  empDoj:
                                    newValue?.toString() === "Invalid Date"
                                      ? null
                                      : newValue,
                                });
                                validateForm(null, ["empDoj", newValue]);
                              }}
                              renderInput={(params) => (
                                <CustomTextField
                                  {...params}
                                  name="empDoj"
                                  helperText={errors?.empDoj}
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
                                empReportingManager: value?.value,
                              });
                              validateForm(null, [
                                "empReportingManager",
                                value,
                              ]);
                            }}
                            name="empReportingManager"
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
                                  empDob:
                                    newValue?.toString() === "Invalid Date"
                                      ? null
                                      : newValue,
                                });
                                validateForm(null, ["empDob", newValue]);
                              }}
                              renderInput={(params) => (
                                <CustomTextField
                                  {...params}
                                  name="empDob"
                                  error={Boolean(errors?.empDob)}
                                  helperText={errors?.empDob}
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
