import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";

import { Box, Container, Button } from "@mui/material";

import { useParams } from "react-router-dom";

import { CustomSwitch, TitleTypo } from "./viewProfile.styles";
import jsPDF from "jspdf";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import logo from "./pdf-logo";
import ProfileContent from "../profileContent/profileContent.component";
import WithSpinner from "../../hoc/withSpinner/withSpinner.component";
import CreateProfile from "./../../../pages/createProfile/createProfile.component";
import PdfTemplate from "./pdfTemplate/pdfTemplate.component";
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

  const handlePdfClick = () => {
    var doc = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
    });
    doc.html(renderToString(<PdfTemplate viewedEmployee={viewedEmployee} />), {
      callback: function (doc) {
        doc.addImage(logo, "JPEG", 358, 2, 86, 16);
        doc.save(`${viewedEmployee.empName}_resume`);
      },
    });
  };

  const component = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {user.permissions.includes("edit_employee_dashboard") &&
        ["hr_admin", "super_admin"].some((el) => user.roles.includes(el)) ? (
          <Box
            sx={{
              display: "flex",
              paddingRight: "1rem",
              mt: editEmployee ? 4 : "",
              alignItems: "center",
            }}
          >
            <TitleTypo>Edit Employee</TitleTypo>
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
                style={{ backgroundColor: "chocolate" }}
                sx={{
                  paddingRight: "1rem",

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
    );
  };
  return Object.keys(viewedEmployee).length === 0 ? (
    <Spinner />
  ) : (
    <Box>
      {editEmployee ? (
        <CreateProfile
          editEmployeeData={viewedEmployee}
          editSwitch={component()}
        />
      ) : (
        <ProfileContentWithSpinner
          currentEmployee={viewedEmployee}
          toggleEditEmployee={editEmployee}
          setToggleEditEmployee={setEditEmployee}
          isLoading={loading}
          switch={component()}
        />
      )}
    </Box>
  );
};

export default ViewProfile;
