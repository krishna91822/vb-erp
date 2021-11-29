import React, { useEffect, useState } from "react";

import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import { Box, Container, MenuItem, Modal, Paper } from "@mui/material";

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
} from "./createProfile.styles";

import ProfileInfoEditable from "./../../components/templates/profileInfo/profileInfoEditable.component";
import TabPanelCustom from "./../../components/templates/tabPanelCustom.component";
import PersonalEditable from "../../components/templates/personal/personalEditable.component";
import ProfessionalEditable from "../../components/templates/professional/professionalEditable.component";
import SkillEditable from "../../components/templates/skill/skillEditable.component";

import { useDispatch } from "react-redux";
import { createEmployee } from "./../../redux/employee/employee.actions";

const CreateProfile = () => {
  const dispatch = useDispatch();

  //just for ref will remove after validation
  const empInitial = {
    empName: "",
    empId: "",
    empEmail: "",
    empDepartment: "",
    empDesignation: "",
    empDoj: "",
    empReportingManager: "",
    empAboutMe: "",
    empBand: "",
    empCertifications: "",
    empConnections: "",
    empCtc: "",
    empCurrentAddress: "",
    empDob: "",
    empGraduation: "",
    empGraduationUniversity: "",
    empHobbies: "",
    empPersonalEmail: "",
    empPhoneNumber: "",
    empPostGraduation: "",
    empPostGraduationUniversity: "",
    empPrimaryCapability: "",
    empResidentialAddress: "",
    empSkillSet: "",
  };

  const [employee, setEmployee] = useState(empInitial);

  const [tab, setTab] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const types = [...addFieldOptions];

  const [field, setField] = useState({
    name: "",
    value: "",
    type: "",
    tab: tab,
  });

  useEffect(() => {
    setField({ ...field, tab: tab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const [type, setType] = useState("");
  const valueField = (type) => {
    if (type === "") {
      return "";
    } else if (type === "date") {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat="dd/MM/yyyy"
            onChange={(newValue) => {
              setField({ ...field, value: newValue });
            }}
            renderInput={(params) => (
              <CustomTextField {...params} name="date" />
            )}
          />
        </LocalizationProvider>
      );
    } else {
      return (
        <CustomTextField
          value={field.value}
          type={type}
          name="value"
          onChange={(e) => setField({ ...field, value: e.target.value })}
          placeholder="Enter value"
        />
      );
    }
  };

  const [newTextFields, setNewTextField] = useState([]);

  const handleNewFieldClick = (event) => {
    setNewTextField([...newTextFields, field]);
    setField({ name: "", value: "", type: "" });
    setType("");
    handleClose();
  };

  const handleChange = (event) => {
    setType(event.target.value);
    setField({ ...field, type: event.target.value });
  };

  const handleConfirm = (event) => {
    dispatch(createEmployee(employee));
    setEmployee(empInitial);
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
              newFields={newTextFields}
            />
          </TabPanelCustom>
          <TabPanelCustom value={tab} index={1}>
            <ProfessionalEditable
              empData={employee}
              setEmpData={setEmployee}
              newFields={newTextFields}
            />
          </TabPanelCustom>
          <TabPanelCustom value={tab} index={2}>
            <SkillEditable
              empData={employee}
              setEmpData={setEmployee}
              newFields={newTextFields}
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
                value={field.name}
                type="text"
                name="name"
                onChange={(e) => setField({ ...field, name: e.target.value })}
                placeholder="Add a title"
              />
              {valueField(type)}
              <CustomTextField select value={type} onChange={handleChange}>
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Box>
            <GreenButton
              variant="contained"
              onClick={handleNewFieldClick}
              sx={{ width: "40%", mt: 1 }}
            >
              Add field
            </GreenButton>
          </Paper>
        </Modal>
      </div>
    </BoxStyle>
  );
};

export default CreateProfile;
