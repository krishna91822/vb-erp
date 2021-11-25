import React from 'react';

import { Container, Box, MenuItem } from '@mui/material';
import { CustomGridBox, TitleTypo, CustomTextField } from './network.styles';
import { useSelector } from 'react-redux';

import { networtText } from './network.constant';

const Network = ({ history, match }) => {
  const allEmployees = useSelector((state) => state.employee.allEmployees);
  const { title, sortOption } = networtText;

  const [sort, setSort] = React.useState('empId');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const handleClick = (item) => {
    history.push(`my-profile/${item.empId}`);
  };

  const sortOptions = [...sortOption];

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
            justifyContent: 'flex-end',
            pt: 2,
          }}
        >
          {' '}
          <CustomTextField
            label='Sort'
            id='outlined-select-currency'
            select
            value={sort}
            onChange={handleChange}
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
              mt: 3,
              mb: 3,
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
          {allEmployees[0].map((item) => (
            <CustomGridBox
              key={item.empId}
              sx={{
                mt: 1,
                mb: 1,
                height: 40,
              }}
              onClick={(e) => handleClick(item)}
            >
              <TitleTypo>{item.empName}</TitleTypo>
              <TitleTypo>{item.empId}</TitleTypo>
              <TitleTypo>{item.empEmail}</TitleTypo>
              <TitleTypo>{item.empDesignation}</TitleTypo>
              <TitleTypo>{item.empCurrentAddress}</TitleTypo>
              <TitleTypo>{item.empDepartment}</TitleTypo>
            </CustomGridBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Network;
