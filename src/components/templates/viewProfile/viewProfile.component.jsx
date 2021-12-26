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
import { useSelector } from "react-redux";

import axiosInstance from "./../../../helpers/axiosInstance";

const ProfileContentWithSpinner = WithSpinner(ProfileContent);

const ViewProfile = () => {
  const { user } = useSelector((state) => state.user);

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
  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );
  const handlePdfClick = () => {
    var doc = new jsPDF();
    doc.setFont("Roboto");
    doc.addImage(template, "JPEG", 0, 0, 210, 298);
    doc.setFontSize(12);
    doc.text(`${capitalize(viewedEmployee.empName)}`, 30, 71, {
      align: "center",
    });
    doc.text(`${viewedEmployee.empId}`, 85, 42.5);
    doc.text(`${viewedEmployee.empEmail}`, 158, 42.5);
    doc.text(`${capitalize(viewedEmployee.empDepartment)}`, 85, 49.5);
    doc.text(`${capitalize(viewedEmployee.empDesignation)}`, 158, 49.5);
    doc.text(
      `${new Date(viewedEmployee.empDoj).toDateString().slice(4)}`,
      85,
      57
    );
    doc.text(`${capitalize(viewedEmployee.empReportingManager)}`, 158, 57);

    //Personal
    doc.setFontSize(10.8);
    doc.text(`${viewedEmployee.empAboutMe}`, 5, 87, {
      maxWidth: 90,
      align: "justify",
    });
    doc.setFontSize(12);
    doc.text(`${viewedEmployee.empPersonalEmail}`, 135, 86);
    doc.text(
      `${new Date(viewedEmployee.empDob).toDateString().slice(4)}`,
      135,
      93
    );
    doc.text(`${viewedEmployee.empHobbies}`, 135, 99.5);
    // doc.text(`${viewedEmployee.empConnections}`, 135, 107);
    doc.text(
      viewedEmployee.empCurrentAddress
        ? `${capitalize(
            viewedEmployee.empCurrentAddress.empAddressLineOne
          )}, ${capitalize(
            viewedEmployee.empCurrentAddress.empAddressCity
          )}, ${capitalize(
            viewedEmployee.empCurrentAddress.empAddressState
          )}, ${viewedEmployee.empCurrentAddress.empAddressPinCode}`
        : "",
      135,
      113.5,
      {
        maxWidth: 60,
      }
    );
    doc.text(
      viewedEmployee.empResidentialAddress
        ? `${capitalize(
            viewedEmployee.empResidentialAddress.empAddressLineOne
          )}, ${capitalize(
            viewedEmployee.empResidentialAddress.empAddressCity
          )}, ${capitalize(
            viewedEmployee.empResidentialAddress.empAddressState
          )}, ${viewedEmployee.empResidentialAddress.empAddressPinCode}`
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
            : doc.text(`${capitalize(person.fieldValue)}`, 135, 148 + 8 * i++, {
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
    doc.text(`${capitalize(viewedEmployee.empGraduation)}`, 45, 183);
    doc.text(`${capitalize(viewedEmployee.empGraduationUniversity)}`, 45, 190);
    doc.text(`${capitalize(viewedEmployee.empPostGraduation)}`, 45, 197);
    doc.text(
      `${capitalize(viewedEmployee.empPostGraduationUniversity)}`,
      45,
      204.5
    );
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
            : doc.text(`${capitalize(prof.fieldValue)}`, 135, 176 + 7 * i++, {
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
            : doc.text(`${capitalize(skill.fieldValue)}`, 135, 224 + 7 * i++, {
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
    doc.setFont("Roboto", "bold");
    {
      viewedEmployee.personalDetails ? (
        viewedEmployee.personalDetails.map((person) =>
          doc.text(`${capitalize(person.fieldName)}:`, 100, 148 + 8 * i++, {
            maxWidth: 30,
          })
        )
      ) : (
        <></>
      );
      i = 0;
    }
    {
      viewedEmployee.professionalDetails ? (
        viewedEmployee.professionalDetails.map((prof) =>
          doc.text(`${capitalize(prof.fieldName)}:`, 100, 176 + 7 * i++, {
            maxWidth: 30,
          })
        )
      ) : (
        <></>
      );
      i = 0;
    }
    {
      viewedEmployee.skillsDetails ? (
        viewedEmployee.skillsDetails.map((skill) =>
          doc.text(`${capitalize(skill.fieldName)}:`, 100, 224 + 7 * i++, {
            maxWidth: 30,
          })
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
        pb: 1,
        pt: 1,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 1,
          alignItems: "center",
        }}
      >
        {user.permissions.includes("edit_employee_dashboard") ? (
          <Box
            sx={{
              display: "flex",
              padding: 0,
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
        ) : null}
        {user.permissions.includes("download_employee_profile") ? (
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
        ) : null}
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
