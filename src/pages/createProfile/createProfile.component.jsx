import React, { useEffect, useState } from "react";

import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { StyledTabs, StyledTab } from "../../components/UI/commonStyles";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Paper,
  Typography,
  Grid,
  Card,
  CardHeader,
  Divider,
  Container,
} from "@mui/material";

import { StyledGrid } from "../../components/UI/commonStyles";

import {
  createProfileConstant,
  addFieldOptions,
} from "./createProfile.constant";

import {
  BoxStyle,
  ContainerStyleTop,
  modalStyle,
  CustomTextField,
  ModalBoxItem,
} from "./createProfile.styles";

import { StyledTypography } from "../../assets/GlobalStyle/style";
import ProfileInfoEditable from "./../../components/templates/profileInfo/profileInfoEditable.component";
import TabPanelCustom from "./../../components/templates/tabPanelCustom.component";
import PersonalEditable from "../../components/templates/personal/personalEditable.component";
import ProfessionalEditable from "../../components/templates/professional/professionalEditable.component";
import SkillEditable from "../../components/templates/skill/skillEditable.component";
import Spinner from "../../components/UI/spinner/spinner";
import BadgeIcon from "@mui/icons-material/Badge";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentEmployee } from "./../../store/employeeSlice";

import axiosInstance from "./../../helpers/axiosInstance";

import { uiActions } from "./../../store/ui-slice";
import validator from "validator";

import ProjectTab from "../../components/templates/project/project.component";
import PlagiarismIcon from "@mui/icons-material/Plagiarism";
import { useNavigate, useLocation } from "react-router-dom";
import { progressBarCalculation } from "./../../helpers/progressBar";

const CreateProfile = ({
  editEmployeeData,
  toggleEditEmployee,
  setToggleEditEmployee,
  editSwitch,
  editEmployee,
  setEditEmployee,
  setLoader,
}) => {
  const { user } = useSelector((state) => state.user);
  const email = user.email;
  const { currentEmployee } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const { toggleLoader, showNotification } = uiActions;
  const navigate = useNavigate();
  const [emailUser, setEmailUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`/employees?empEmail=${email}`)
      .then((response) => {
        dispatch(setCurrentEmployee(response.data.data[0]));
      })
      .catch((err) => console.log(err));
  }, [dispatch, email]);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const empInitial = {
    empName: "",
    empEmail: "",
    empDepartment: "",
    empDesignation: "",
    empDoj: null,
    empDob: null,
    empReportingManager: "",
    empPersonalEmail: "",
    empAboutMe: "",
    empBand: "",
    empCertifications: [],
    empConnections: 0,
    empCurrentAddress: undefined,
    empGraduation: "",
    empGraduationUniversity: "",
    empHobbies: [],
    empSkillSet: [],
    empPrimaryCapability: [],
    empPostGraduation: "",
    empPostGraduationUniversity: "",
    empResidentialAddress: undefined,
    project: [],
  };

  const [employee, setEmployee] = useState(
    editEmployeeData
      ? editEmployeeData
      : {
          ...empInitial,
          empDoj: new Date(),
        }
  );
  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setEmployee({
        ...employee,
        empEmail: location.state.email,
        empName: location.state.first_name,
      });
    }
    // eslint-disable-next-line
  }, [location.state]);
  const [tab, setTab] = useState(0);

  //modal
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    !location.state
      ? navigate("/createuserprofile", {
          state: { name: nameUser, email: emailUser },
        })
      : navigate("/my-profile");
  };
  const handleOpenModalError = () => setOpenModalError(true);
  const handleCloseModalError = () => setOpenModalError(false);

  const types = [...addFieldOptions];

  //new fields data according to tabs
  const newFieldTemplate = {
    fieldName: "",
    fieldValue: "",
    fieldType: "",
  };
  const [personalDetails, setPersonalDetails] = useState(
    editEmployeeData ? [...editEmployeeData.personalDetails] : []
  );
  const [professionalDetails, setProfessionalDetails] = useState(
    editEmployeeData ? [...editEmployeeData.professionalDetails] : []
  );
  const [skillsDetails, setSkillsDetails] = useState(
    editEmployeeData ? [...editEmployeeData.skillsDetails] : []
  );

  //calculate percentage progress
  const profileProgress = () => {
    return progressBarCalculation(employee);
  };

  //render value input field according to types
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

  const handleFieldChange = (event) => {
    setNewFieldData({
      ...newFieldData,
      [event.target.name]: event.target.value,
    });
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

  const validateData = (data) => {
    const errorsObj = {};
    if (data.empName.length === 0) {
      errorsObj.empName = "Full name is required";
    }
    if (data.empEmail.length === 0) {
      errorsObj.empEmail = "Email is required";
    }
    if (data.empEmail.length !== 0 && !validator.isEmail(data.empEmail)) {
      errorsObj.empEmail = "Invalid email";
    }
    if (!data.empDepartment || data.empDepartment.length === 0) {
      errorsObj.empDepartment = "Department is required";
    }
    if (!data.empDesignation || data.empDesignation.length === 0) {
      errorsObj.empDesignation = "designation is required";
    }
    if (!data.empDoj) {
      errorsObj.empDoj = "Date of joining is required";
    }
    if (data.empDoj?.toString() === "Invalid Date") {
      errorsObj.empDoj = "Date of joining is invalid";
    }
    if (!data.empReportingManager || data.empReportingManager.length === 0) {
      errorsObj.empReportingManager = "Reporting manager is required";
    }
    if (!data.empDob) {
      errorsObj.empDob = "Date of birth is required";
    }
    if (data.empDob?.toString() === "Invalid Date") {
      errorsObj.empDob = "Date of birth is invalid";
    }
    if (
      data.empPersonalEmail?.length !== 0 &&
      !validator.isEmail(data.empPersonalEmail)
    ) {
      errorsObj.empPersonalEmail = "Invalid email";
    }
    if (data.empAboutMe.length > 500) {
      errorsObj.empAboutMe = "About me exceeded the limit";
    }
    return errorsObj;
  };

  const handleConfirm = (event) => {
    const formErrors = validateData(employee);
    setErrors(formErrors);
    if (Object.keys(formErrors).length !== 0) return;
    dispatch(toggleLoader());
    // Profile - Update;
    let createEmployee;
    editEmployeeData
      ? (createEmployee = {
          reqName: currentEmployee.empName,
          reqType: "profile-update",
          employeeDetails: {
            ...employee,
            personalDetails,
            professionalDetails,
            skillsDetails,
          },
        })
      : (createEmployee = {
          reqName: currentEmployee.empName,
          reqType: "profile-creation",
          employeeDetails: {
            ...employee,
            personalDetails,
            professionalDetails,
            skillsDetails,
          },
        });
    if (createEmployee?.reqType === "profile-creation") {
      setNameUser(createEmployee.employeeDetails.empName);
      setEmailUser(createEmployee.employeeDetails.empEmail);
      axiosInstance
        .post("/employees", createEmployee.employeeDetails)
        .then(function (response) {
          setEmployee(empInitial);
          setValue(0);
          dispatch(toggleLoader());
          handleOpenModal();
        })
        .catch(function (error) {
          dispatch(toggleLoader());
          handleOpenModalError();
          console.log(error);
        });
    } else if (
      createEmployee?.reqType === "profile-update" &&
      user.permissions.includes("create_employee_dashboard")
    ) {
      let employeeObject = { ...createEmployee.employeeDetails };
      ["_id", "empId", "createdAt", "updatedAt", "count"].map(
        (el) => delete employeeObject[el]
      );
      axiosInstance
        .patch(`/employees/${editEmployeeData._id}`, employeeObject)
        .then(function (response) {
          setEmployee(empInitial);
          setEditEmployee && setEditEmployee(false);
          setLoader && setLoader((prev) => prev + 1);
          dispatch(toggleLoader());
          dispatch(
            showNotification({
              status: "success",
              title: "Employee has been updated.",
              message: "Employee has been updated.",
            })
          );
        })
        .catch(function (error) {
          dispatch(toggleLoader());
          dispatch(
            showNotification({
              status: "error",
              title: "Something went wrong!",
              message: "Something went wrong!",
            })
          );
          console.log(error);
        });
    } else if (createEmployee?.reqType === "profile-update") {
      axiosInstance
        .post("/reviews", createEmployee)
        .then(function (response) {
          setEmployee(empInitial);
          dispatch(toggleLoader());
          dispatch(
            showNotification({
              status: "success",
              title: "Employee has been updated.",
              message: "Employee has been updated.",
            })
          );
        })
        .catch(function (error) {
          dispatch(toggleLoader());
          handleOpenModalError();
          console.log(error);
        });
    }
  };

  return currentEmployee &&
    user.permissions.includes("create_employee_dashboard") ? (
    <BoxStyle data-test="create-profile-test">
      <div>
        <ProfileInfoEditable
          tab={tab}
          setTab={setTab}
          employee={employee}
          setEmployee={setEmployee}
          profileProgress={profileProgress}
          editSwitch={editSwitch}
          errors={errors}
          setErrors={setErrors}
          validateForm={validateForm}
        />
      </div>
      <Box mt={1}>
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
                <PersonalEditable
                  empData={employee}
                  setEmpData={setEmployee}
                  personalDetails={personalDetails}
                  setPersonalDetails={setPersonalDetails}
                  errors={errors}
                  validateForm={validateForm}
                />
              </TabPanelCustom>

              <TabPanelCustom value={value} index={1}>
                <ProfessionalEditable
                  empData={employee}
                  setEmpData={setEmployee}
                  professionalDetails={professionalDetails}
                  setProfessionalDetails={setProfessionalDetails}
                />
              </TabPanelCustom>
              <TabPanelCustom value={value} index={2}>
                <SkillEditable
                  empData={employee}
                  setEmpData={setEmployee}
                  skillsDetails={skillsDetails}
                  setSkillsDetails={setSkillsDetails}
                />
              </TabPanelCustom>
              <TabPanelCustom value={value} index={3}>
                <ProjectTab
                  editable={true}
                  empData={employee}
                  setEmpData={setEmployee}
                />
              </TabPanelCustom>
              <ContainerStyleTop>
                <Box
                  sx={{
                    display: "flex",
                    width: 1,
                    alignItems: "center",
                    justifyContent: editEmployeeData
                      ? "flex-end"
                      : "space-between",
                  }}
                >
                  {editEmployeeData ? null : (
                    <StyledTypography></StyledTypography>
                  )}
                  <Box>
                    <Button
                      data-test="confirm-button-test"
                      onClick={handleConfirm}
                      variant="contained"
                      style={{ marginRight: "1rem" }}
                    >
                      {createProfileConstant.confirm}
                    </Button>
                    {value !== 3 && (
                      <Button
                        data-test="custome-button-test"
                        onClick={handleOpen}
                        variant="contained"
                        style={{ marginRight: "1rem" }}
                      >
                        {createProfileConstant.addCustomField}
                      </Button>
                    )}
                  </Box>
                </Box>
              </ContainerStyleTop>
            </Card>
          </StyledGrid>
        </Container>
      </Box>
      <div>
        <Modal
          open={open}
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
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalBoxItem>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {createProfileConstant.modalMessageSuccess}
          </Typography>
          <Button variant="contained" onClick={handleCloseModal}>
            {createProfileConstant.modalBtn}
          </Button>
        </ModalBoxItem>
      </Modal>
      <Modal open={openModalError} onClose={handleCloseModalError}>
        <ModalBoxItem>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {createProfileConstant.modalMessageFail}
          </Typography>
          <Button variant="contained" onClick={handleCloseModalError}>
            {createProfileConstant.modalBtnTryAgain}
          </Button>
        </ModalBoxItem>
      </Modal>
    </BoxStyle>
  ) : (
    <Spinner data-test="spinner-test" />
  );
};

export default CreateProfile;
