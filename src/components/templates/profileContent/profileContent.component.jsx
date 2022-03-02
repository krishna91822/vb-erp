import React, { useState } from "react";

import {
  Box,
  Container,
  Modal,
  Paper,
  MenuItem,
  Grid,
  Card,
  CardHeader,
  Divider,
  Button,
} from "@mui/material";
import { StyledTabs, StyledTab } from "../../UI/commonStyles";
import ProfileInfoReadable from "../profileInfo/profileInfoReadable.component";
import TabPanelCustom from "../tabPanelCustom.component";
import PersonalReadable from "../personal/personalReadable.component";
import PersonalEditable from "../personal/personalEditable.component";
import ProfessionalReadable from "../professional/professionalReadable.component";
import ProfessionalEditable from "../professional/professionalEditable.component";
import SkillReadable from "../skill/skillReadable.component";
import SkillEditable from "../skill/skillEditable.component";
import ProfileInfoEditable from "./../profileInfo/profileInfoEditable.component";
import ProjectTab from "./../project/project.component";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import BadgeIcon from "@mui/icons-material/Badge";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";

import { modalStyle, CustomTextField } from "./profileContent.styles";

import { addFieldOptions } from "./profileContent.constant";
import { StyledGrid } from "../../UI/commonStyles";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { progressBarCalculation } from "./../../../helpers/progressBar";

const ProfileContent = (props) => {
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();
  const {
    value,
    setValue,
    currentEmployee,
    inEditMode,
    updateRequest,
    setUpdateRequest,
    personalDetails,
    setPersonalDetails,
    professionalDetails,
    setProfessionalDetails,
    skillsDetails,
    setSkillsDetails,
    open,
    handleClose,
  } = props;

  const { user } = useSelector((state) => state.user);

  //calculate percentage progress
  const profileProgress = () => {
    return inEditMode
      ? progressBarCalculation(updateRequest)
      : progressBarCalculation(currentEmployee);
  };

  profileProgress();

  const handleFieldChange = (event) => {
    setNewFieldData({
      ...newFieldData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const newFieldTemplate = {
    fieldName: "",
    fieldValue: "",
    fieldType: "",
  };

  const types = [...addFieldOptions];

  const [newFieldData, setNewFieldData] = useState(newFieldTemplate);

  const InputvalueFieldRender = (type) => {
    if (type === "date") {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat="dd/MM/yyyy"
            value={newFieldData.fieldValue ? newFieldData.fieldValue : null}
            onChange={(newValue) => {
              setNewFieldData({
                ...newFieldData,
                fieldValue: newValue,
              });
            }}
            renderInput={(params) => (
              <CustomTextField {...params} name="fieldValue" />
            )}
          />
        </LocalizationProvider>
      );
    } else if (type === "text" || type === "number") {
      return (
        <CustomTextField
          value={newFieldData.fieldValue}
          type={type}
          name="fieldValue"
          onChange={(event) => handleFieldChange(event)}
          placeholder="Enter value"
        />
      );
    } else {
      return;
    }
  };

  const handleCreateNewField = () => {
    if (
      newFieldData.fieldName === "" ||
      newFieldData.fieldValue === "" ||
      newFieldData.fieldType === ""
    ) {
      return;
    }
    if (value === 0) setPersonalDetails([...personalDetails, newFieldData]);
    if (value === 1)
      setProfessionalDetails([...professionalDetails, newFieldData]);
    if (value === 2) setSkillsDetails([...skillsDetails, newFieldData]);
    setNewFieldData(newFieldTemplate);
    handleClose();
  };

  //form validation
  const [errors, setErrors] = useState({});
  const validateForm = (event, value) => {
    const errorsObj = {};
    if (event) {
      if (event.target?.name === "empName" && event.target.value.length === 0) {
        errorsObj.empName = "Full name is required";
      }
      if (
        event.target?.name === "empEmail" &&
        event.target.value.length === 0
      ) {
        errorsObj.empEmail = "Company Email is required";
      }
      if (
        event.target?.name === "empEmail" &&
        event.target.value.length !== 0 &&
        !validator.isEmail(event.target.value)
      ) {
        errorsObj.empEmail = "Invalid email";
      }
      if (
        event.target?.name === "empPersonalEmail" &&
        event.target.value.length !== 0 &&
        !validator.isEmail(event.target.value)
      ) {
        errorsObj.empPersonalEmail = "Invalid email";
      }
      if (
        event.target?.name === "empAboutMe" &&
        event.target.value.length > 500
      ) {
        errorsObj.empName = "About me exceeded the limit";
      }
    }
    if (value) {
      if (value[0] === "empDepartment" && !value[1]) {
        errorsObj.empDepartment = "Department is required";
      }
      if (value[0] === "empDesignation" && !value[1]) {
        errorsObj.empDesignation = "Designation is required";
      }
      if (value[0] === "empDoj" && !value[1]) {
        errorsObj.empDoj = "Date of joining is required";
      }
      if (value[0] === "empDoj" && value[1]?.toString() === "Invalid Date") {
        errorsObj.empDoj = "Date of joining is invalid";
      }
      if (value[0] === "empReportingManager" && !value[1]) {
        errorsObj.empReportingManager = "Reporting manager is required";
      }
      if (value[0] === "empDob" && !value[1]) {
        errorsObj.empDob = "Date of birth is required";
      }
      if (value[0] === "empDob" && value[1]?.toString() === "Invalid Date") {
        errorsObj.empDob = "Date of birth is invalid";
      }
    }
    setErrors(errorsObj);
  };

  const renderProfileInfo = () => {
    if (inEditMode) {
      if (["super_admin", "hr_admin"].some((el) => user.roles.includes(el))) {
        return (
          <ProfileInfoEditable
            tab={value}
            setTab={setValue}
            employee={updateRequest}
            setEmployee={setUpdateRequest}
            profileProgress={profileProgress}
            editSwitch={props.switch}
            errors={errors}
            setErrors={setErrors}
            validateForm={validateForm}
          />
        );
      } else {
        return (
          <ProfileInfoReadable
            value={value}
            setValue={setValue}
            currentEmployee={currentEmployee || ""}
            profileProgress={profileProgress || ""}
            editSwitch={props.switch}
          />
        );
      }
    } else {
      return (
        <ProfileInfoReadable
          value={value}
          setValue={setValue}
          currentEmployee={currentEmployee || ""}
          profileProgress={profileProgress || ""}
          editSwitch={props.switch}
        />
      );
    }
  };
  return (
    <Grid>
      <Grid item>
        <Box sx={{ pb: 2 }}>{renderProfileInfo()}</Box>
      </Grid>
      <Grid item mt={1}>
        <Container maxWidth="xl">
          <StyledGrid item lg={8} md={6} xs={6}>
            <Card>
              <CardHeader
                sx={{ overflow: "scroll" }}
                title={
                  <Grid item>
                    <StyledTabs value={value} onChange={handleChange}>
                      <StyledTab
                        icon={<LocalCafeIcon />}
                        label="Personal"
                        sx={{ fontSize: "12px" }}
                      />
                      <StyledTab
                        icon={<ImportContactsIcon />}
                        label="professional"
                        sx={{ fontSize: "12px" }}
                      />
                      <StyledTab
                        icon={<BadgeIcon />}
                        label="Skills And Qualifications"
                        sx={{ fontSize: "12px" }}
                      />
                      <StyledTab
                        icon={<PlagiarismIcon />}
                        label="Project"
                        sx={{ fontSize: "12px" }}
                      />
                    </StyledTabs>
                  </Grid>
                }
              />
              <Divider />
              <TabPanelCustom value={value} index={0}>
                {inEditMode ? (
                  <PersonalEditable
                    empData={updateRequest || ""}
                    setEmpData={setUpdateRequest || ""}
                    personalDetails={personalDetails || ""}
                    setPersonalDetails={setPersonalDetails || ""}
                    errors={errors}
                    validateForm={validateForm}
                  />
                ) : (
                  <Grid item>
                    <Grid item>
                      <PersonalReadable empData={currentEmployee || ""} />
                    </Grid>
                  </Grid>
                )}
              </TabPanelCustom>
              <TabPanelCustom value={value} index={1}>
                {inEditMode ? (
                  <ProfessionalEditable
                    empData={updateRequest || ""}
                    setEmpData={setUpdateRequest || ""}
                    professionalDetails={professionalDetails || ""}
                    setProfessionalDetails={setProfessionalDetails || ""}
                    errors={errors}
                    validateForm={validateForm}
                  />
                ) : (
                  <Grid item>
                    <Grid item>
                      <ProfessionalReadable empData={currentEmployee || ""} />
                    </Grid>
                  </Grid>
                )}
              </TabPanelCustom>
              <TabPanelCustom value={value} index={2}>
                {inEditMode ? (
                  <SkillEditable
                    empData={updateRequest || ""}
                    setEmpData={setUpdateRequest || ""}
                    skillsDetails={skillsDetails || ""}
                    setSkillsDetails={setSkillsDetails || ""}
                    errors={errors}
                    validateForm={validateForm}
                  />
                ) : (
                  <Grid item>
                    <Grid item>
                      <SkillReadable empData={currentEmployee || ""} />
                    </Grid>
                  </Grid>
                )}
              </TabPanelCustom>
              <TabPanelCustom value={value} index={3}>
                <ProjectTab
                  editable={inEditMode}
                  empData={inEditMode ? updateRequest : currentEmployee}
                  setEmpData={setUpdateRequest || ""}
                  errors={errors}
                  validateForm={validateForm}
                />
              </TabPanelCustom>
              <Box>{inEditMode && props.btns}</Box>
            </Card>
          </StyledGrid>
        </Container>
      </Grid>
      <div>
        <Modal
          open={open ? open : false}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper elevation={3} sx={modalStyle}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CustomTextField
                autoComplete="off"
                required
                id="outlined-basic"
                variant="outlined"
                type="text"
                name="fieldName"
                onChange={(event) => handleFieldChange(event)}
                placeholder="Add a title"
              />
              {/* render input according to type */}
              {InputvalueFieldRender(newFieldData.fieldType)}
              <CustomTextField
                select
                value={newFieldData.fieldType}
                onChange={(event) => handleFieldChange(event)}
                name="fieldType"
              >
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Box>
            <Button
              variant="contained"
              onClick={() => handleCreateNewField()}
              sx={{ width: "40%", mt: 1 }}
            >
              Add field
            </Button>
          </Paper>
        </Modal>
      </div>
    </Grid>
  );
};

export default ProfileContent;
