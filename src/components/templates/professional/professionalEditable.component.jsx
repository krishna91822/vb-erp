import React from "react";

import { Grid, Box } from "@mui/material";

import {
  CustomTextField,
  ContentBox,
  ContentTypo,
} from "./professionalEditable.styles";

import { professionalConstant } from "./professional.constant";

const ProfessionalEditable = ({ empData, setEmpData }) => {
  const {
    empDepartment,
    empDesignation,
    empBand,
    empReportingManager,
    empGraduation,
    empGraduationUniversity,
    empPostGraduation,
    empPostGraduationUniversity,
  } = empData;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEmpData({ ...empData, [name]: value });
  };

  return (
    <Grid container spacing={0} sx={{ minHeight: 150 }}>
      <Grid item sm={7}>
        <Box sx={{ ml: 4, mb: 5 }}>
          <ContentBox>
            <ContentTypo>{professionalConstant.department}</ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empDepartment ? empDepartment : ""}
              name="empDepartment"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>

          <ContentBox>
            <ContentTypo>{professionalConstant.designation}</ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empDesignation ? empDesignation : ""}
              name="empDesignation"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{professionalConstant.band}</ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empBand ? empBand : ""}
              name="empBand"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{professionalConstant.reportingManager}</ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empReportingManager ? empReportingManager : ""}
              name="empReportingManager"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{professionalConstant.graduation}</ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empGraduation ? empGraduation : ""}
              name="empGraduation"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>
              {professionalConstant.graduationUniversity}
            </ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empGraduationUniversity ? empGraduationUniversity : ""}
              name="empGraduationUniversity"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{professionalConstant.postGraduation}</ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={empPostGraduation ? empPostGraduation : ""}
              name="empPostGraduation"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{professionalConstant.PgUniversity}</ContentTypo>
            <CustomTextField
              autoComplete="off"
              required
              id="outlined-basic"
              variant="outlined"
              value={
                empPostGraduationUniversity ? empPostGraduationUniversity : ""
              }
              name="empPostGraduationUniversity"
              onChange={handleChange}
              type="text"
            />
          </ContentBox>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfessionalEditable;
