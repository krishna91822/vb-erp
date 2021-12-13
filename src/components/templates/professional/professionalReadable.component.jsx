import React from "react";

import { Box } from "@mui/material";
import { ContentBox, ContentTypo } from "./professionalReadable.styles";
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
        <ContentTypo>{professionalConstant.band}</ContentTypo>
        <ContentTypo>{empBand}</ContentTypo>
      </ContentBox>
      <ContentBox>
        <ContentTypo>{professionalConstant.graduation}</ContentTypo>
        <ContentTypo>{empGraduation.toUpperCase()}</ContentTypo>
      </ContentBox>
      <ContentBox>
        <ContentTypo>{professionalConstant.graduationUniversity}</ContentTypo>
        <ContentTypo>{empGraduationUniversity}</ContentTypo>
      </ContentBox>
      <ContentBox>
        <ContentTypo>{professionalConstant.postGraduation}</ContentTypo>
        <ContentTypo>{empPostGraduation}</ContentTypo>
      </ContentBox>
      <ContentBox>
        <ContentTypo>{professionalConstant.PgUniversity}</ContentTypo>
        <ContentTypo>{empPostGraduationUniversity}</ContentTypo>
      </ContentBox>
      {professionalDetails.map((field) => (
        <ContentBox key={field._id}>
          <ContentTypo>{field.fieldName}</ContentTypo>
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
