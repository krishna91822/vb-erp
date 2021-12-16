import React, { useEffect, useState } from "react";

import { Box, Container } from "@mui/material";

import { useParams } from "react-router-dom";

import { CustomSwitch, TitleTypo } from "./viewProfile.styles";

import ProfileContent from "../profileContent/profileContent.component";
import WithSpinner from "../../hoc/withSpinner/withSpinner.component";
import CreateProfile from "./../../../pages/createProfile/createProfile.component";
import Spinner from "./../../UI/spinner/spinner";

import axiosInstance from "./../../../helpers/axiosInstance";

const ProfileContentWithSpinner = WithSpinner(ProfileContent);

const ViewProfile = () => {
  const [loading, setLoading] = useState(true);
  const [viewedEmployee, setViewedEmployee] = useState({});

  const { empId } = useParams();
  useEffect(() => {
    axiosInstance
      .get(`/employees?empId=${empId}`)
      .then((response) => {
        setViewedEmployee({ ...response.data.data.employees[0] });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [empId]);

  const [editEmployee, setEditEmployee] = React.useState(false);

  const handleSwitchChange = (event) => {
    setEditEmployee(event.target.checked);
  };

  return Object.keys(viewedEmployee).length === 0 ? (
    <Spinner />
  ) : (
    <Container sx={{ pb: 3, pt: 3, position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          p: 2,
          position: editEmployee ? "absolute" : "relative",
          mt: editEmployee ? 4 : "",
        }}
      >
        <TitleTypo sx={{ textTransform: "capitalize", pr: 1 }}>
          Edit Employee
        </TitleTypo>
        <CustomSwitch
          checked={editEmployee}
          onChange={handleSwitchChange}
          inputProps={{ "aria-label": "controlled" }}
        />
      </Box>
      {editEmployee ? (
        <CreateProfile editEmployeeData={viewedEmployee} />
      ) : (
        <ProfileContentWithSpinner
          currentEmployee={viewedEmployee}
          toggleEditEmployee={editEmployee}
          setToggleEditEmployee={setEditEmployee}
          isLoading={loading}
        />
      )}
    </Container>
  );
};

export default ViewProfile;
