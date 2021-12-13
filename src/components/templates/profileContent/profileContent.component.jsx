import React, { useState } from "react";

import { Box, Container, Modal, Paper, MenuItem } from "@mui/material";

import ProfileInfoReadable from "../profileInfo/profileInfoReadable.component";
import TabPanelCustom from "../tabPanelCustom.component";
import PersonalReadable from "../personal/personalReadable.component";
import PersonalEditable from "../personal/personalEditable.component";
import ProfessionalReadable from "../professional/professionalReadable.component";
import ProfessionalEditable from "../professional/professionalEditable.component";
import SkillReadable from "../skill/skillReadable.component";
import SkillEditable from "../skill/skillEditable.component";

import {
  modalStyle,
  CustomTextField,
  GreenButton,
} from "./profileContent.styles";

import { addFieldOptions } from "./profileContent.constant";

import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const ProfileContent = (props) => {
  const {
    inEditMode,
    currentEmployee,
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

  const [value, setValue] = useState(0);

  //modal

  const handleFieldChange = (event) => {
    setNewFieldData({
      ...newFieldData,
      [event.target.name]: event.target.value,
    });
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

  return (
    <Box
      sx={{
        minHeight: "calc( 100% - 80px )",
        border: "2px solid",
        borderColor: "textColor.paletteGrey",
      }}
    >
      <Container>
        <ProfileInfoReadable
          value={value}
          setValue={setValue}
          currentEmployee={currentEmployee}
        />
      </Container>
      <Container sx={{ width: "calc(100% - 16px)" }}>
        <TabPanelCustom value={value} index={0}>
          {inEditMode ? (
            <PersonalEditable
              empData={updateRequest}
              setEmpData={setUpdateRequest}
              personalDetails={personalDetails}
              setPersonalDetails={setPersonalDetails}
            />
          ) : (
            <PersonalReadable empData={currentEmployee} />
          )}
        </TabPanelCustom>
        <TabPanelCustom value={value} index={1}>
          {inEditMode ? (
            <ProfessionalEditable
              empData={updateRequest}
              setEmpData={setUpdateRequest}
              professionalDetails={professionalDetails}
              setProfessionalDetails={setProfessionalDetails}
            />
          ) : (
            <ProfessionalReadable empData={currentEmployee} />
          )}
        </TabPanelCustom>
        <TabPanelCustom value={value} index={2}>
          {inEditMode ? (
            <SkillEditable
              empData={updateRequest}
              setEmpData={setUpdateRequest}
              skillsDetails={skillsDetails}
              setSkillsDetails={setSkillsDetails}
            />
          ) : (
            <SkillReadable empData={currentEmployee} />
          )}
        </TabPanelCustom>
      </Container>
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
    </Box>
  );
};

export default ProfileContent;
