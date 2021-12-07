import React, { useState, useEffect } from 'react';
import { Container, Box, MenuItem } from '@mui/material';
import {
  CustomGridBox,
  TitleTypo,
  CustomTextField,
  ContentTypo,
} from './network.styles';
import { networkText } from './network.constant';
import { TextField } from '@mui/material';

import axiosInstance from './../../helpers/axiosInstance';

import { useNavigate } from 'react-router-dom';

const Network = () => {
  const navigate = useNavigate();

  const [searchEmp, setSEmp] = useState('');
  const [employees, setEmployees] = useState([]);
  const [sort, setSort] = React.useState('empId');

  useEffect(() => {
    axiosInstance
      .get(`/employees?search=${searchEmp}&sort=${sort}`)
      .then((response) => setEmployees(response.data.employees))
      .catch((err) => console.error(err));
  }, [searchEmp, sort]);
  const { title, sortOption } = networkText;

  const sortHandleChange = (event) => {
    setSort(event.target.value);
  };

  const handleEmployeeClick = (item) => {
    navigate(`../my-profile/${item.empId}`);
  };

  const sortOptions = [...sortOption];

  const searchHandleChange = (event) => {
    setSEmp(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', pt: 3, pb: 3 }}>
      <Container
        sx={{
          minHeight: 'calc(100vh - 50px)',
          width: 'calc(100% - 48px)',
          border: '2px solid',
          borderColor: 'textColor.paletteGrey',
          pb: 3,
        }}
      >
        <Box
          noValidate
          autoComplete='off'
          sx={{
            width: '100%',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 2,
          }}
        >
          {' '}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 1,
            }}
          >
            {/* <Typography sx={{ mr: 1 }}>Username</Typography> */}
            <TextField
              onChange={searchHandleChange}
              placeholder='Search employee'
              id='outlined-search'
              size='small'
              variant='outlined'
              sx={{ width: '100%', height: '40px' }}
            />
            {/* <Button>{<SearchIcon fontSize='large' />}</Button> */}
          </Box>
          <CustomTextField
            label='Sort'
            id='outlined-select-currency'
            select
            value={sort}
            onChange={sortHandleChange}
            sx={{ width: '25%' }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomTextField>
        </Box>
        <Box sx={{ width: '100%' }}>
          <CustomGridBox
            sx={{
              height: 60,
              mt: 2,
              mb: 2,
              backgroundColor: 'textColor.light',
            }}
          >
            {
              //title of the network table
              title.map((item, i) => (
                <TitleTypo key={i}>{item}</TitleTypo>
              ))
            }
          </CustomGridBox>
          {employees.map((item) => (
            <CustomGridBox
              key={item.empId}
              sx={{
                mt: 0.5,
                mb: 0.5,
                height: 40,
                cursor: 'pointer',
              }}
              onClick={(e) => handleEmployeeClick(item)}
            >
              <ContentTypo>{item.empName}</ContentTypo>
              <ContentTypo>{item.empId}</ContentTypo>
              <ContentTypo>{item.empEmail}</ContentTypo>
              <ContentTypo>{item.empDesignation}</ContentTypo>
              <ContentTypo>{item.empCurrentAddress}</ContentTypo>
              <ContentTypo>{item.empDepartment}</ContentTypo>
            </CustomGridBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Network;
