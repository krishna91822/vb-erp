import React from "react";

import { Grid } from "@mui/material";
import {
  ContentBox,
  ContentTypo,
  TitleTypo,
} from "./professionalReadable.styles";
import { professionalConstant } from "./professional.constant";

const ProfessionalReadable = ({ empData }) => {
  const {
    empBand,
    empGraduation,
    empGraduationUniversity,
    empPostGraduation,
    empPostGraduationUniversity,
    professionalDetails,
    yearsOfExperience,
  } = empData;
  return (
    <Grid container sx={{ minHeight: 150 }}>
      <Grid item mb={5} sx={{ width: "100%" }}>
        <ContentBox>
          <TitleTypo>{professionalConstant.band}</TitleTypo>
          <ContentTypo>{empBand}</ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{professionalConstant.graduation}</TitleTypo>
          <ContentTypo>{empGraduation}</ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{professionalConstant.graduationUniversity}</TitleTypo>
          <ContentTypo>{empGraduationUniversity}</ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{professionalConstant.postGraduation}</TitleTypo>
          <ContentTypo>{empPostGraduation}</ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{professionalConstant.PgUniversity}</TitleTypo>
          <ContentTypo>{empPostGraduationUniversity}</ContentTypo>
        </ContentBox>
        <ContentBox>
          <TitleTypo>{professionalConstant.experience}</TitleTypo>
          <ContentTypo>{yearsOfExperience} years</ContentTypo>
        </ContentBox>
        {professionalDetails &&
          professionalDetails.map((field) => (
            <ContentBox key={field._id}>
              <TitleTypo>{field.fieldName}:</TitleTypo>
              {field.fieldType === "date" ? (
                <ContentTypo>
                  {new Date(field.fieldValue)?.toDateString().slice(4)}
                </ContentTypo>
              ) : (
                <ContentTypo>{field.fieldValue}</ContentTypo>
              )}
            </ContentBox>
          ))}
      </Grid>
    </Grid>
  );
};

export default ProfessionalReadable;
