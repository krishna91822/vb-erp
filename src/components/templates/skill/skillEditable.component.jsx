import React from 'react';

import { Grid, Box, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import {
  CustomTextField,
  ContentBox,
  ContentTypo,
} from './skillEditable.styles';

import { skillConstant } from './skill.constant';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const SkillEditable = ({
  empData,
  setEmpData,
  skillsDetails,
  setSkillsDetails,
}) => {
  const { empPrimaryCapability, empSkillSet, empCertifications } = empData;

  const handleNewFieldChange = (event, index) => {
    const updates = skillsDetails.map((skillsDetail, i) =>
      index === i
        ? { ...skillsDetail, fieldValue: event.target.value }
        : skillsDetail
    );
    setSkillsDetails(updates);
  };

  const removeFields = (index) => {
    const filteredFields = [...skillsDetails];
    filteredFields.splice(index, 1);
    setSkillsDetails(filteredFields);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (
      name === 'empPrimaryCapability' ||
      name === 'empSkillSet' ||
      name === 'empCertifications'
    ) {
      setEmpData({ ...empData, [name]: value.split(',') });
    }
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
          {skillsDetails.map((field, index) => (
            <ContentBox key={index} sx={{ position: 'relative' }}>
              <ContentTypo>{field.fieldName}</ContentTypo>
              {field.fieldType === 'date' ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat='dd/MM/yyyy'
                    value={field.fieldValue ? field.fieldValue : null}
                    onChange={(newValue) => {
                      const updates = skillsDetails.map((skillsDetail, i) =>
                        index === i
                          ? {
                              ...skillsDetail,
                              fieldValue: newValue,
                            }
                          : skillsDetail
                      );
                      setSkillsDetails(updates);
                    }}
                    renderInput={(params) => (
                      <CustomTextField {...params} name='fieldValue' />
                    )}
                  />
                </LocalizationProvider>
              ) : (
                <TextField
                  autoComplete='off'
                  required
                  id='outlined-basic'
                  variant='outlined'
                  value={field.fieldValue}
                  type={field.fieldType}
                  name={field.fieldName}
                  onChange={(event) => handleNewFieldChange(event, index)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      width: '80%',
                      height: '40px',
                    },
                  }}
                />
              )}

              <ClearIcon
                onClick={() => removeFields(index)}
                sx={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  position: 'absolute',
                  right: '30px',
                }}
              />
            </ContentBox>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SkillEditable;
