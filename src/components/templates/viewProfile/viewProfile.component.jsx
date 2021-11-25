import React from 'react';

import { Container } from '@mui/material';

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import ProfileContent from './../profileContent.component';

const ViewProfile = () => {
  const allEmployees = useSelector((state) => state.employee.allEmployees);

  const { empId } = useParams();
  const filteredEmployee = allEmployees[0].filter(
    (item) => item.empId === empId
  );

  return (
    <Container sx={{ pb: 3, pt: 5 }}>
      <ProfileContent currentEmployee={filteredEmployee[0]} />
    </Container>
  );
};

export default ViewProfile;
