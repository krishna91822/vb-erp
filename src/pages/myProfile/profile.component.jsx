import React, { memo, useEffect, useState } from "react";

import { Box } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setCurrentEmployee } from "./../../store/employeeSlice";

import EditMode from "../../components/templates/editMode/editMode.component";
import ProfileContent from "../../components/templates/profileContent/profileContent.component";
import Spinner from "./../../components/UI/spinner/spinner";
import axiosInstance from "../../helpers/axiosInstance";

import { roundToNearestMinutes } from "date-fns/esm";

const Profile = () => {
  const { currentEmployee } = useSelector((state) => state.employee);
  const { user } = useSelector((state) => state.user);

  const email = user.email;

  const [loading, setLoading] = useState(true);
  const [inEditMode, setInEditMode] = useState(false);
  const dispatch = useDispatch();

  const [employeeUpdateCount, setEmployeeUpdateCount] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`/employees?empEmail=${email}`)
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
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, employeeUpdateCount]);

  const [personalDetails, setPersonalDetails] = useState([]);
  const [professionalDetails, setProfessionalDetails] = useState([]);
  const [skillsDetails, setSkillsDetails] = useState([]);

  const [updateRequest, setUpdateRequest] = useState({});
  const [value, setValue] = useState(0);

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
    value,
    setValue,
    updateRequest,
    setUpdateRequest,
    currentEmployee,
    inEditMode,
    setInEditMode,
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
    value,
    setUpdateRequest,
    updateRequest,
    inEditMode,
    setInEditMode,
    handleOpen,
    setEmployeeUpdateCount,
  };

  return loading ? (
    <Spinner data-test="profile-page-test" />
  ) : (
    <Box sx={{ pb: 3 }}>
      <ProfileContent
        {...profileContentProps}
        switch={
          currentEmployee && (
            <EditMode
              {...editModeProps}
              switchOnly={roundToNearestMinutes}
              btnsOnly={false}
            />
          )
        }
        btns={
          currentEmployee && (
            <EditMode {...editModeProps} switchOnly={false} btnsOnly={true} />
          )
        }
      />
    </Box>
  );
};

export default memo(Profile);
