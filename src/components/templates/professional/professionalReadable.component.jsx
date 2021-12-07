import React from 'react';

import { Box } from '@mui/material';
import { ContentBox, ContentTypo } from './professionalReadable.styles';
import { professionalConstant } from './professional.constant';

const ProfessionalReadable = ({ empData }) => {
  const {
    // empDepartment,
    // empDesignation,
    // empReportingManager,
    empBand,
    empGraduation,
    empGraduationUniversity,
    empPostGraduation,
    empPostGraduationUniversity,
  } = empData;
  return (
    <Box>
      {/* <ContentBox>
        <ContentTypo>{professionalConstant.department}</ContentTypo>
        <ContentTypo>{empDepartment}</ContentTypo>
      </ContentBox>
      <ContentBox>
        <ContentTypo>{professionalConstant.designation}</ContentTypo>
        <ContentTypo>{empDesignation.toUpperCase()}</ContentTypo>
      </ContentBox> */}
      <ContentBox>
        <ContentTypo>{professionalConstant.band}</ContentTypo>
        <ContentTypo>{empBand}</ContentTypo>
      </ContentBox>
      {/* <ContentBox>
        <ContentTypo>{professionalConstant.reportingManager}</ContentTypo>
        <ContentTypo>{empReportingManager}</ContentTypo>
      </ContentBox> */}
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
    </Box>
  );
};

export default ProfessionalReadable;
