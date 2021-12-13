import React from 'react';

import { Grid, Box, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import {
  CustomTextField,
  ContentBox,
  ContentTypo,
} from './professionalEditable.styles';

import { professionalConstant } from './professional.constant';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const ProfessionalEditable = ({
  empData,
  setEmpData,
  professionalDetails,
  setProfessionalDetails,
}) => {
  const {
    empBand,
    empGraduation,
    empGraduationUniversity,
    empPostGraduation,
    empPostGraduationUniversity,
  } = empData;

  const handleNewFieldChange = (event, index) => {
    const updates = professionalDetails.map((professionalDetail, i) =>
      index === i
        ? { ...professionalDetail, fieldValue: event.target.value }
        : professionalDetail
    );
    setProfessionalDetails(updates);
  };

  const removeFields = (index) => {
    const filteredFields = [...professionalDetails];
    filteredFields.splice(index, 1);
    setProfessionalDetails(filteredFields);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setEmpData({ ...empData, [name]: value });
  };

  return (
    <Grid container spacing={0} sx={{ minHeight: 150 }}>
      <Grid item sm={7}>
        <Box sx={{ ml: 4, mb: 5 }}>
          <ContentBox>
            <ContentTypo>{professionalConstant.band}</ContentTypo>
            <CustomTextField
              autoComplete='off'
              required
              id='outlined-basic'
              variant='outlined'
              value={empBand ? empBand : ''}
              name='empBand'
              onChange={handleChange}
              type='text'
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{professionalConstant.graduation}</ContentTypo>
            <CustomTextField
              autoComplete='off'
              required
              id='outlined-basic'
              variant='outlined'
              value={empGraduation ? empGraduation : ''}
              name='empGraduation'
              onChange={handleChange}
              type='text'
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>
              {professionalConstant.graduationUniversity}
            </ContentTypo>
            <CustomTextField
              autoComplete='off'
              required
              id='outlined-basic'
              variant='outlined'
              value={empGraduationUniversity ? empGraduationUniversity : ''}
              name='empGraduationUniversity'
              onChange={handleChange}
              type='text'
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{professionalConstant.postGraduation}</ContentTypo>
            <CustomTextField
              autoComplete='off'
              required
              id='outlined-basic'
              variant='outlined'
              value={empPostGraduation ? empPostGraduation : ''}
              name='empPostGraduation'
              onChange={handleChange}
              type='text'
            />
          </ContentBox>
          <ContentBox>
            <ContentTypo>{professionalConstant.PgUniversity}</ContentTypo>
            <CustomTextField
              autoComplete='off'
              required
              id='outlined-basic'
              variant='outlined'
              value={
                empPostGraduationUniversity ? empPostGraduationUniversity : ''
              }
              name='empPostGraduationUniversity'
              onChange={handleChange}
              type='text'
            />
          </ContentBox>
          {professionalDetails.map((field, index) => (
            <ContentBox key={index} sx={{ position: 'relative' }}>
              <ContentTypo>{field.fieldName}</ContentTypo>
              {field.fieldType === 'date' ? (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    inputFormat='dd/MM/yyyy'
                    value={field.fieldValue ? field.fieldValue : null}
                    onChange={(newValue) => {
                      const updates = professionalDetails.map(
                        (professionalDetail, i) =>
                          index === i
                            ? {
                                ...professionalDetail,
                                fieldValue: newValue,
                              }
                            : professionalDetail
                      );
                      setProfessionalDetails(updates);
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

export default ProfessionalEditable;
