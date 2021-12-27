import React from "react";

import { Box } from "@mui/material";
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
  } = empData;
  return (
    <Box>
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
      {professionalDetails.map((field) => (
        <ContentBox key={field._id}>
          <TitleTypo>{field.fieldName}:</TitleTypo>
          {field.fieldType === "date" ? (
            <ContentTypo>
              {new Date(field.fieldValue).toDateString().slice(4)}
            </ContentTypo>
          ) : (
            <ContentTypo>{field.fieldValue}</ContentTypo>
          )}
        </ContentBox>
      ))}
    </Box>
  );
};

export default ProfessionalReadable;
