import React, { useState, useEffect } from "react";

import {
  Box,
  Container,
  Modal,
  Paper,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
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

import {
  modalStyle,
  CustomTextField,
  GreenButton,
} from "./profileContent.styles";

import { addFieldOptions } from "./profileContent.constant";
import { StyledGrid } from "../../UI/commonStyles";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
const ProfileContent = (props) => {
  const dispatch = useDispatch();
  const {
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
    const totalFields = inEditMode
      ? Object.keys(updateRequest).length +
        updateRequest?.personalDetails.length +
        updateRequest?.professionalDetails.length +
        updateRequest?.skillsDetails.length -
        3
      : Object.keys(currentEmployee).length +
        currentEmployee?.personalDetails.length +
        currentEmployee?.professionalDetails.length +
        currentEmployee?.skillsDetails.length -
        3;

    const completedFields = inEditMode
      ? Object.values(updateRequest).filter(
          (field) =>
            field !== undefined &&
            field !== null &&
            field !== "" &&
            field.length !== 0
        ).length +
        updateRequest.personalDetails.filter((field) => field.fieldValue !== "")
          .length +
        updateRequest.professionalDetails.filter(
          (field) => field.fieldValue !== ""
        ).length +
        updateRequest.skillsDetails.filter((field) => field.fieldValue !== "")
          .length -
        3
      : Object.values(currentEmployee).filter(
          (field) =>
            field !== undefined &&
            field !== null &&
            field !== "" &&
            field.length !== 0
        ).length +
        currentEmployee.personalDetails.filter(
          (field) => field.fieldValue !== ""
        ).length +
        currentEmployee.professionalDetails.filter(
          (field) => field.fieldValue !== ""
        ).length +
        currentEmployee.skillsDetails.filter((field) => field.fieldValue !== "")
          .length -
        3;
    const percentage = Math.floor((completedFields / totalFields) * 100);
    return percentage;
  };

  profileProgress();

  const [value, setValue] = useState(0);

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

  const [errors, setErrors] = useState({});
  const validate = (values) => {
    const errorsObj = {};
    if (values?.empName.length === 0) {
      errorsObj.empName = "Full name is required";
    }
    if (values?.empEmail.length === 0) {
      errorsObj.empEmail = "Company Email is required";
    }
    if (values?.empEmail.length !== 0 && !validator.isEmail(values?.empEmail)) {
      errorsObj.empEmail = "Invalid email";
    }
    if (values?.empDepartment.length === 0) {
      errorsObj.empDepartment = "Department is required";
    }
    if (values?.empDesignation.length === 0) {
      errorsObj.empDesignation = "Department is required";
    }
    if (!values?.empDoj) {
      errorsObj.empDoj = "doj is required";
    }
    if (!values?.empReportingManager.length === 0) {
      errorsObj.empReportingManager = "Reporting manager is required";
    }
    if (!values?.empDob) {
      errorsObj.empDob = "dob is required";
    }
    if (values?.empPersonalEmail.length === 0) {
      errorsObj.empPersonalEmail = "Personal Email is required";
    }
    if (
      values?.empPersonalEmail.length !== 0 &&
      !validator.isEmail(values?.empPersonalEmail)
    ) {
      errorsObj.empPersonalEmail = "Invalid email";
    }
    setErrors(errorsObj);
    return errorsObj;
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
            errors={errors}
            validate={validate}
          />
        );
      } else {
        return (
          <ProfileInfoReadable
            value={value}
            setValue={setValue}
            currentEmployee={currentEmployee}
            profileProgress={profileProgress}
          />
        );
      }
    } else {
      return (
        <ProfileInfoReadable
          value={value}
          setValue={setValue}
          currentEmployee={currentEmployee}
          profileProgress={profileProgress}
        />
      );
    }
  };

  return (
    <Grid>
      <Grid item>
        <Box>{renderProfileInfo()}</Box>
      </Grid>
      <Grid item mt={1}>
        <Container maxWidth="xl">
          <StyledGrid item lg={8} md={6} xs={6}>
            <Card>
              <CardHeader
                title={
                  <Grid item sm={11}>
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
                    empData={updateRequest}
                    setEmpData={setUpdateRequest}
                    personalDetails={personalDetails}
                    setPersonalDetails={setPersonalDetails}
                    errors={errors}
                    validate={validate}
                  />
                ) : (
                  <Grid item lg={12} md={6} xs={6}>
                    <Grid item>
                      <PersonalReadable empData={currentEmployee} />
                    </Grid>
                  </Grid>
                )}
              </TabPanelCustom>
              <TabPanelCustom value={value} index={1}>
                {inEditMode ? (
                  <ProfessionalEditable
                    empData={updateRequest}
                    setEmpData={setUpdateRequest}
                    professionalDetails={professionalDetails}
                    setProfessionalDetails={setProfessionalDetails}
                    errors={errors}
                    validate={validate}
                  />
                ) : (
                  <Grid item lg={12} md={6} xs={6}>
                    <Grid item>
                      <ProfessionalReadable empData={currentEmployee} />
                    </Grid>
                  </Grid>
                )}
              </TabPanelCustom>
              <TabPanelCustom value={value} index={2}>
                {inEditMode ? (
                  <SkillEditable
                    empData={updateRequest}
                    setEmpData={setUpdateRequest}
                    skillsDetails={skillsDetails}
                    setSkillsDetails={setSkillsDetails}
                    errors={errors}
                    validate={validate}
                  />
                ) : (
                  <Grid item lg={12} md={6} xs={6}>
                    <Grid item>
                      <SkillReadable empData={currentEmployee} />
                    </Grid>
                  </Grid>
                )}
              </TabPanelCustom>
              <TabPanelCustom value={value} index={3}>
                <ProjectTab
                  editable={inEditMode}
                  empData={inEditMode ? updateRequest : currentEmployee}
                  setEmpData={setUpdateRequest}
                  // projectDetails={skillsDetails}
                  // setProjectDetails={setSkillsDetails}
                  errors={errors}
                  validate={validate}
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
                // value={field.name}
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
            <GreenButton
              variant="contained"
              onClick={() => handleCreateNewField()}
              sx={{ width: "40%", mt: 1 }}
            >
              Add field
            </GreenButton>
          </Paper>
        </Modal>
      </div>
    </Grid>
  );
};

export default ProfileContent;
