import React, { memo, useEffect, useState } from "react";

import { Container } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentEmployee } from "./../../store/employeeSlice";

import EditMode from "../../components/templates/editMode/editMode.component";
import ProfileContent from "../../components/templates/profileContent/profileContent.component";
import Spinner from "./../../components/UI/spinner/spinner";
import axiosInstance from "../../helpers/axiosInstance";

import { useForm } from "react-hook-form";

const Profile = () => {
  const { register, handleSubmit, errors } = useForm();

  const { currentEmployee, inEditMode } = useSelector(
    (state) => state.employee
  );

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("/employees?empEmail=admin@mail.com")
      .then((response) => {
        dispatch(setCurrentEmployee(response.data.data[0]));
        setUpdateRequest({
          ...response.data.data[0],
          personalDetails: [...response.data.data[0].personalDetails],
          professionalDetails: [...response.data.data[0].professionalDetails],
          skillsDetails: [...response.data.data[0].skillsDetails],
        });
        setPersonalDetails([...response.data.data[0].personalDetails]);
        setProfessionalDetails([...response.data.data[0].professionalDetails]);
        setSkillsDetails([...response.data.data[0].skillsDetails]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  const [personalDetails, setPersonalDetails] = useState([]);
  const [professionalDetails, setProfessionalDetails] = useState([]);
  const [skillsDetails, setSkillsDetails] = useState([]);

  const [updateRequest, setUpdateRequest] = useState({});

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

  return loading ? (
    <Spinner data-test="profile-page-test" />
  ) : (
    <Container sx={{ pb: 3 }}>
      <EditMode handleSubmit={handleSubmit} {...editModeProps} />
      <ProfileContent
        register={register}
        errors={errors}
        {...profileContentProps}
      />
    </Container>
  );
};

export default memo(Profile);
