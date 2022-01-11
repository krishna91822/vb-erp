import React, { useEffect, useRef, useState } from "react";

import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { Box, Button, MenuItem, Modal, Paper, Typography } from "@mui/material";

import {
  createProfileConstant,
  addFieldOptions,
} from "./createProfile.constant";

import {
  ContainerStyle,
  BoxStyle,
  GreenButton,
  BlueButton,
  TitleTypo,
  ContainerStyleTop,
  modalStyle,
  CustomTextField,
  ModalBoxItem,
} from "./createProfile.styles";

import ProfileInfoEditable from "./../../components/templates/profileInfo/profileInfoEditable.component";
import TabPanelCustom from "./../../components/templates/tabPanelCustom.component";
import PersonalEditable from "../../components/templates/personal/personalEditable.component";
import ProfessionalEditable from "../../components/templates/professional/professionalEditable.component";
import SkillEditable from "../../components/templates/skill/skillEditable.component";
import Spinner from "../../components/UI/spinner/spinner";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentEmployee } from "./../../store/employeeSlice";

import axiosInstance from "./../../helpers/axiosInstance";

import { uiActions } from "./../../store/ui-slice";
import validator from "validator";

import { useForm } from "react-hook-form";

const CreateProfile = ({
  editEmployeeData,
  toggleEditEmployee,
  setToggleEditEmployee,
}) => {
  const { user } = useSelector((state) => state.user);
  const email = user.email;
  const { currentEmployee } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const { toggleLoader, showNotification } = uiActions;

  // const { register, handleSubmit, errors } = useForm();
  useEffect(() => {
    axiosInstance
      .get(`/employees?${email}`)
      .then((response) => {
        dispatch(setCurrentEmployee(response.data.data[0]));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

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
  };

  const [employee, setEmployee] = useState(
    editEmployeeData
      ? editEmployeeData
      : {
          ...empInitial,
          empDoj: new Date(),
        }
  );

  const [tab, setTab] = useState(0);

  //modal
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
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
    const totalFields =
      Object.keys(employee).length +
      personalDetails.length +
      professionalDetails.length +
      skillsDetails.length;
    const completedFields =
      Object.values(employee).filter(
        (field) =>
          field !== undefined &&
          field !== null &&
          field !== "" &&
          field.length !== 0
      ).length +
      personalDetails.filter((field) => field.fieldValue !== "").length +
      professionalDetails.filter((field) => field.fieldValue !== "").length +
      skillsDetails.filter((field) => field.fieldValue !== "").length;

    const percentage = Math.floor((completedFields / totalFields) * 100);
    return percentage;
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
    if (tab === 0) setPersonalDetails([...personalDetails, newFieldData]);
    if (tab === 1)
      setProfessionalDetails([...professionalDetails, newFieldData]);
    if (tab === 2) setSkillsDetails([...skillsDetails, newFieldData]);
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

  const handleConfirm = (event) => {
    setErrors(validate(employee));
    if (Object.keys(validate(employee)).length !== 0) return;
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
      axiosInstance
        .post("/employees", createEmployee.employeeDetails)
        .then(function (response) {
          setEmployee(empInitial);
          dispatch(toggleLoader());
          handleOpenModal();
          // console.log(response);
        })
        .catch(function (error) {
          dispatch(toggleLoader());
          handleOpenModalError();
          console.log(error);
        });
    } else if (
      createEmployee?.reqType === "profile-update" &&
      ["hr_admin", "super_admin"].some((el) => user.roles.includes(el))
    ) {
      let employeeObject = { ...createEmployee.employeeDetails };
      ["_id", "empId", "createdAt", "updatedAt", "count"].map(
        (el) => delete employeeObject[el]
      );
      axiosInstance
        .patch(`/employees/${editEmployeeData._id}`, employeeObject)
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
          // handleOpenModal();
        })
        .catch(function (error) {
          dispatch(toggleLoader());
          // handleOpenModalError();
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
          // console.log(response);
        })
        .catch(function (error) {
          dispatch(toggleLoader());
          handleOpenModalError();
          console.log(error);
        });
    }
  };

  return currentEmployee &&
    ["super_admin", "hr_admin"].some((el) => user.roles.includes(el)) ? (
    <BoxStyle data-test="create-profile-test">
      <ContainerStyleTop>
        {/* <TitleTypo sx={{ textTransform: "capitalize", mb: 0.5 }}>
          {currentEmployee ? currentEmployee.empName : ""}
        </TitleTypo> */}
        <Box
          sx={{
            display: "flex",
            width: 1,
            alignItems: "center",
            justifyContent: editEmployeeData ? "flex-end" : "space-between",
          }}
        >
          {editEmployeeData ? null : (
            <TitleTypo sx={{ textTransform: "capitalize", fontSize: 24 }}>
              {createProfileConstant.createUser}
            </TitleTypo>
          )}
          <Box>
            <GreenButton
              data-test="confirm-button-test"
              // onClick={handleSubmit(handleConfirm)}
              onClick={handleConfirm}
              variant="contained"
            >
              {createProfileConstant.confirm}
            </GreenButton>
            <BlueButton
              data-test="custome-button-test"
              onClick={handleOpen}
              variant="contained"
            >
              {createProfileConstant.addCustomField}
            </BlueButton>
          </Box>
        </Box>
      </ContainerStyleTop>
      <ContainerStyle>
        <div>
          <ProfileInfoEditable
            tab={tab}
            setTab={setTab}
            employee={employee}
            setEmployee={setEmployee}
            profileProgress={profileProgress}
            // register={register}
            errors={errors}
            validate={validate}
          />
        </div>
        <Box sx={{}}>
          <TabPanelCustom value={tab} index={0}>
            <PersonalEditable
              empData={employee}
              setEmpData={setEmployee}
              personalDetails={personalDetails}
              setPersonalDetails={setPersonalDetails}
              // register={register}
              errors={errors}
            />
          </TabPanelCustom>
          <TabPanelCustom value={tab} index={1}>
            <ProfessionalEditable
              empData={employee}
              setEmpData={setEmployee}
              professionalDetails={professionalDetails}
              setProfessionalDetails={setProfessionalDetails}
              // register={register}
              errors={errors}
            />
          </TabPanelCustom>
          <TabPanelCustom value={tab} index={2}>
            <SkillEditable
              empData={employee}
              setEmpData={setEmployee}
              skillsDetails={skillsDetails}
              setSkillsDetails={setSkillsDetails}
              // register={register}
              errors={errors}
            />
          </TabPanelCustom>
        </Box>
      </ContainerStyle>
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