import React, { useEffect, useState } from "react";

import { Box, Container, Button } from "@mui/material";

import { useParams } from "react-router-dom";

import { CustomSwitch, TitleTypo } from "./viewProfile.styles";
import jsPDF from "jspdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
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
        setViewedEmployee({ ...response.data.data[0] });
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
    doc.setFont("Roboto", "bold");
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

    //Personal
    doc.text(`${viewedEmployee.empAboutMe}`, 5, 87, {
      maxWidth: 90,
      align: "justify",
    });
    doc.text(`${viewedEmployee.empPersonalEmail}`, 135, 86);
    doc.text(
      `${new Date(viewedEmployee.empDob).toDateString().slice(4)}`,
      135,
      93
    );
    doc.text(`${viewedEmployee.empHobbies}`, 135, 99.5);
    doc.text(`${viewedEmployee.empConnections}`, 135, 107);
    doc.text(
      viewedEmployee.empCurrentAddress
        ? `${viewedEmployee.empCurrentAddress.empAddressLineOne}, ${viewedEmployee.empCurrentAddress.empAddressCity}, ${viewedEmployee.empCurrentAddress.empAddressState}, ${viewedEmployee.empCurrentAddress.empAddressPinCode}`
        : "",
      135,
      113.5,
      {
        maxWidth: 60,
      }
    );
    doc.text(
      viewedEmployee.empResidentialAddress
        ? `${viewedEmployee.empResidentialAddress.empAddressLineOne}, ${viewedEmployee.empResidentialAddress.empAddressCity}, ${viewedEmployee.empResidentialAddress.empAddressState}, ${viewedEmployee.empResidentialAddress.empAddressPinCode}`
        : "",
      135,
      134.5,
      {
        maxWidth: 60,
      }
    );
    let i = 0;
    {
      viewedEmployee.personalDetails ? (
        viewedEmployee.personalDetails.map((person) =>
          person.fieldType === "date"
            ? doc.text(
                `${new Date(person.fieldValue).toDateString().slice(4)}`,
                135,
                148 + 8 * i++,
                { maxWidth: 69 }
              )
            : doc.text(`${person.fieldValue}`, 135, 148 + 8 * i++, {
                maxWidth: 69,
              })
        )
      ) : (
        <></>
      );
      i = 0;
    }

    //Professional
    doc.text(`${viewedEmployee.empBand}`, 45, 176.5);
    doc.text(`${viewedEmployee.empGraduation}`, 45, 183);
    doc.text(`${viewedEmployee.empGraduationUniversity}`, 45, 190);
    doc.text(`${viewedEmployee.empPostGraduation}`, 45, 197);
    doc.text(`${viewedEmployee.empPostGraduationUniversity}`, 45, 204.5);
    {
      viewedEmployee.professionalDetails ? (
        viewedEmployee.professionalDetails.map((prof) =>
          doc.text(`${prof.fieldName}:`, 100, 176 + 7 * i++, { maxWidth: 30 })
        )
      ) : (
        <></>
      );
      i = 0;
    }
    {
      viewedEmployee.professionalDetails ? (
        viewedEmployee.professionalDetails.map((prof) =>
          prof.fieldType === "date"
            ? doc.text(
                `${new Date(prof.fieldValue).toDateString().slice(4)}`,
                135,
                176 + 7 * i++,
                { maxWidth: 69 }
              )
            : doc.text(`${prof.fieldValue}`, 135, 176 + 7 * i++, {
                maxWidth: 69,
              })
        )
      ) : (
        <></>
      );
      i = 0;
    }

    //Skills and Qualifications
    doc.text(`${viewedEmployee.empPrimaryCapability}`, 45, 224, {
      maxWidth: 50,
      lineHeightFactor: 1,
    });
    doc.text(`${viewedEmployee.empSkillSet}`, 45, 232, {
      maxWidth: 50,
      lineHeightFactor: 1,
    });
    doc.text(`${viewedEmployee.empCertifications}`, 45, 239.5, {
      maxWidth: 50,
      lineHeightFactor: 1,
    });
    {
      viewedEmployee.skillsDetails ? (
        viewedEmployee.skillsDetails.map((skill) =>
          skill.fieldType === "date"
            ? doc.text(
                `${new Date(skill.fieldValue).toDateString().slice(4)}`,
                135,
                224 + 7 * i++,
                { maxWidth: 69 }
              )
            : doc.text(`${skill.fieldValue}`, 135, 224 + 7 * i++, {
                maxWidth: 69,
              })
        )
      ) : (
        <></>
      );
      i = 0;
    }

    //Extra Labels
    doc.setTextColor("#161F3C");
    {
      viewedEmployee.personalDetails ? (
        viewedEmployee.personalDetails.map((person) =>
          doc.text(`${person.fieldName}:`, 100, 148 + 8 * i++, { maxWidth: 30 })
        )
      ) : (
        <></>
      );
      i = 0;
    }
    {
      viewedEmployee.professionalDetails ? (
        viewedEmployee.professionalDetails.map((prof) =>
          doc.text(`${prof.fieldName}:`, 100, 176 + 7 * i++, { maxWidth: 30 })
        )
      ) : (
        <></>
      );
      i = 0;
    }
    {
      viewedEmployee.skillsDetails ? (
        viewedEmployee.skillsDetails.map((skill) =>
          doc.text(`${skill.fieldName}:`, 100, 224 + 7 * i++, { maxWidth: 30 })
        )
      ) : (
        <></>
      );
      i = 0;
    }

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
            data-test="download-button-text"
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
              <PictureAsPdfIcon sx={{ marginRight: 1 }} />
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
