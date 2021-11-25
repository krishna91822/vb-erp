import React from 'react';

import { Grid, Box } from '@mui/material';

import {
  CustomTextField,
  ContentBox,
  ContentTypo,
} from './skillEditable.styles';

import { skillConstant } from './skill.constant';

const SkillEditable = ({ empData, setEmpData }) => {
  const { empPrimaryCapability, empSkillSet, empCertifications } = empData;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEmpData({ ...empData, [name]: value });
  };

  return (
    <Grid container spacing={0} sx={{ minHeight: 150 }}>
      <Grid item sm={7}>
        <Box sx={{ ml: 4, mb: 5 }}>
          <ContentBox>
            <ContentTypo>{skillConstant.primaryCapability}</ContentTypo>
            <CustomTextField
              autoComplete='off'
              required
              id='outlined-basic'
              variant='outlined'
              value={empPrimaryCapability ? empPrimaryCapability : ''}
              name='empPrimaryCapability'
              onChange={handleChange}
              type='text'
            />
          </ContentBox>

          <ContentBox>
            <ContentTypo>{skillConstant.skillSet}</ContentTypo>
            <CustomTextField
              autoComplete='off'
              required
              id='outlined-basic'
              variant='outlined'
              value={empSkillSet ? empSkillSet : ''}
              name='empSkillSet'
              onChange={handleChange}
              type='text'
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{skillConstant.certification}</ContentTypo>
            <CustomTextField
              autoComplete='off'
              required
              id='outlined-basic'
              variant='outlined'
              value={empCertifications ? empCertifications : ''}
              name='empCertifications'
              onChange={handleChange}
              type='text'
            />
          </ContentBox>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SkillEditable;
