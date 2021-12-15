import React, { memo, useEffect, useState } from "react";

import { Container } from "@mui/material";

import { useSelector } from "react-redux";

import EditMode from "../../components/templates/editMode/editMode.component";
import ProfileContent from "../../components/templates/profileContent/profileContent.component";

const Profile = () => {
  const { currentEmployee, inEditMode } = useSelector(
    (state) => state.employee
  );

  const [personalDetails, setPersonalDetails] = useState([
    ...currentEmployee.personalDetails,
  ]);
  const [professionalDetails, setProfessionalDetails] = useState([
    ...currentEmployee.professionalDetails,
  ]);
  const [skillsDetails, setSkillsDetails] = useState([
    ...currentEmployee.skillsDetails,
  ]);

  const [updateRequest, setUpdateRequest] = useState({
    ...currentEmployee,
    personalDetails,
    professionalDetails,
    skillsDetails,
  });

  useEffect(() => {
    setUpdateRequest({
      ...updateRequest,
      personalDetails,
      professionalDetails,
      skillsDetails,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inEditMode, personalDetails, professionalDetails, skillsDetails]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const profileContentProps = {
    updateRequest,
    setUpdateRequest,
    currentEmployee,
    inEditMode,
    personalDetails,
    setPersonalDetails,
    professionalDetails,
    setProfessionalDetails,
    skillsDetails,
    setSkillsDetails,
    open,
    handleOpen,
    handleClose,
  };

  const editModeProps = {
    setUpdateRequest,
    updateRequest,
    inEditMode,
    handleOpen,
  };

  return (
    <Container sx={{ pb: 3 }}>
      <EditMode {...editModeProps} />
      <ProfileContent {...profileContentProps} />
    </Container>
  );
};

export default memo(Profile);
