import React, { useState } from "react";

import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  Box,
  Button,
  Container,
  MenuItem,
  Modal,
  Paper,
  Typography,
} from "@mui/material";

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

import { useSelector } from "react-redux";

import axiosInstance from "./../../helpers/axiosInstance";

const CreateProfile = ({
  editEmployeeData,
  toggleEditEmployee,
  setToggleEditEmployee,
}) => {
  const { currentEmployee } = useSelector((state) => state.employee);

  const empInitial = {
    empName: "",
    empEmail: "",
    empDepartment: "",
    empDesignation: "",
    empDoj: null,
    empReportingManager: "",
    empAboutMe: "",
    empBand: "",
    empCertifications: "",
    empConnections: "",
    empCurrentAddress: "",
    empDob: null,
    empGraduation: "",
    empGraduationUniversity: "",
    empHobbies: "",
    empPersonalEmail: "",
    empPostGraduation: "",
    empPostGraduationUniversity: "",
    empPrimaryCapability: "",
    empResidentialAddress: "",
    empSkillSet: "",
  };

  const [employee, setEmployee] = useState(
    editEmployeeData ? editEmployeeData : empInitial
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
  const [personalDetails, setPersonalDetails] = useState([]);
  const [professionalDetails, setProfessionalDetails] = useState([]);
  const [skillsDetails, setSkillsDetails] = useState([]);

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

  const handleConfirm = (event) => {
    if (
      employee.empName === "" ||
      employee.empEmail === "" ||
      employee.empDoj === "" ||
      employee.empDob === ""
    ) {
      alert("Fields are empty");
    } else {
      // Profile - Update;
      let creatEmployee;
      editEmployeeData
        ? (creatEmployee = {
            reqName: currentEmployee.empName,
            reqType: "profile-update",
            employeeDetails: {
              ...employee,
              personalDetails,
              professionalDetails,
              skillsDetails,
            },
          })
        : (creatEmployee = {
            reqName: currentEmployee.empName,
            reqType: "profile-creation",
            employeeDetails: {
              ...employee,
              personalDetails,
              professionalDetails,
              skillsDetails,
            },
          });
      axiosInstance
        .post("/reviews", creatEmployee)
        .then(function (response) {
          setEmployee(empInitial);
          handleOpenModal();
          console.log(response);
        })
        .catch(function (error) {
          handleOpenModalError();
          console.log(error);
        });
    }
  };

  return (
    <BoxStyle>
      <ContainerStyleTop>
        <TitleTypo sx={{ textTransform: "capitalize", mb: 0.5 }}>
          {createProfileConstant.user}
        </TitleTypo>
        <Box
          sx={{
            display: "flex",
            width: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TitleTypo sx={{ textTransform: "capitalize", fontSize: 24, ml: 2 }}>
            {createProfileConstant.createUser}
          </TitleTypo>
          <Box>
            <GreenButton onClick={handleConfirm} variant="contained">
              {createProfileConstant.confirm}
            </GreenButton>
            <BlueButton onClick={handleOpen} variant="contained">
              {createProfileConstant.addCustomField}
            </BlueButton>
          </Box>
        </Box>
      </ContainerStyleTop>
      <ContainerStyle>
        <Container>
          <ProfileInfoEditable
            tab={tab}
            setTab={setTab}
            employee={employee}
            setEmployee={setEmployee}
          />
        </Container>
        <Container sx={{ width: "calc(100% - 16px)" }}>
          <TabPanelCustom value={tab} index={0}>
            <PersonalEditable
              empData={employee}
              setEmpData={setEmployee}
              personalDetails={personalDetails}
              setPersonalDetails={setPersonalDetails}
            />
          </TabPanelCustom>
          <TabPanelCustom value={tab} index={1}>
            <ProfessionalEditable
              empData={employee}
              setEmpData={setEmployee}
              professionalDetails={professionalDetails}
              setProfessionalDetails={setProfessionalDetails}
            />
          </TabPanelCustom>
          <TabPanelCustom value={tab} index={2}>
            <SkillEditable
              empData={employee}
              setEmpData={setEmployee}
              skillsDetails={skillsDetails}
              setSkillsDetails={setSkillsDetails}
            />
          </TabPanelCustom>
        </Container>
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
  );
};

export default CreateProfile;
