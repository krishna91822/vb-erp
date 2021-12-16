import React, { useEffect, useState } from "react";

import { Box, Container, Button } from "@mui/material";

import { useParams } from "react-router-dom";

import { CustomSwitch, TitleTypo } from "./viewProfile.styles";
import jsPDF from "jspdf";

import template from "./pdfTemplate";
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
  const handlePdfClick = () => {
    var doc = new jsPDF();
    doc.addImage(template, "JPEG", 0, 0, 210, 298);
    doc.setFontSize(10);
    doc.text(`${viewedEmployee.empName}`, 30, 71, {
      align: "center",
    });
    doc.text(`${viewedEmployee.empId}`, 85, 42.5);
    doc.text(`${viewedEmployee.empEmail}`, 158, 42.5);
    doc.text(`${viewedEmployee.empDepartment}`, 85, 49.5);
    doc.text(`${viewedEmployee.empDesignation}`, 158, 49.5);
    doc.text(
      `${new Date(viewedEmployee.empDoj).toDateString().slice(4)}`,
      85,
      57
    );
    doc.text(`${viewedEmployee.empReportingManager}`, 158, 57);

    doc.text(`${viewedEmployee.empAboutMe}`, 5, 87, {
      maxWidth: 90,
      align: "justify",
    });
    doc.text(`${viewedEmployee.empPersonalEmail}`, 135, 85.5);
    doc.text(
      `${new Date(viewedEmployee.empDob).toDateString().slice(4)}`,
      135,
      92.5
    );
    doc.text(`${viewedEmployee.empHobbies}`, 135, 99);
    doc.text(`${viewedEmployee.empConnections}`, 135, 106.5);
    doc.text(
      `${viewedEmployee.empCurrentAddress.empAddressLineOne}, ${viewedEmployee.empCurrentAddress.empAddressCity}, ${viewedEmployee.empCurrentAddress.empAddressState}, ${viewedEmployee.empCurrentAddress.empAddressPinCode}`,
      135,
      113,
      {
        maxWidth: 60,
      }
    );
    doc.text(
      `${viewedEmployee.empResidentialAddress.empAddressLineOne}, ${viewedEmployee.empResidentialAddress.empAddressCity}, ${viewedEmployee.empResidentialAddress.empAddressState}, ${viewedEmployee.empResidentialAddress.empAddressPinCode}`,
      135,
      127,
      {
        maxWidth: 60,
      }
    );

    doc.text(`${viewedEmployee.empBand}`, 45, 156);
    doc.text(`${viewedEmployee.empGraduation}`, 45, 162);
    doc.text(`${viewedEmployee.empGraduationUniversity}`, 45, 169);
    doc.text(`${viewedEmployee.empPostGraduation}`, 45, 176);
    doc.text(`${viewedEmployee.empPostGraduationUniversity}`, 45, 182.5);

    doc.text(`${viewedEmployee.empPrimaryCapability}`, 45, 198.5);
    doc.text(`${viewedEmployee.empSkillSet}`, 45, 205.5);
    doc.text(`${viewedEmployee.empCertifications}`, 45, 212.5);

    doc.save(`${viewedEmployee.empName}`);
  };

  return Object.keys(viewedEmployee).length === 0 ? (
    <Spinner />
  ) : (
    <Container
      sx={{
        pb: 3,
        pt: 3,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
        <Box>
          {!editEmployee ? (
            <Button
              id="download"
              variant="contained"
              onClick={handlePdfClick}
              sx={{
                backgroundColor: "#1AAE9F",
                "&:hover": {
                  backgroundColor: "hsl(173.9,74%,30%)",
                },
              }}
            >
              Download as PDF
            </Button>
          ) : (
            <></>
          )}
        </Box>
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
