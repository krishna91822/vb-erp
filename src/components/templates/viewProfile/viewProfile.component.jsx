import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import { useParams } from 'react-router-dom';

import ProfileContent from './../profileContent.component';
import WithSpinner from '../../hoc/withSpinner/withSpinner.component';

import axiosInstance from './../../../helpers/axiosInstance';

const ProfilContentWithSpinner = WithSpinner(ProfileContent);

const ViewProfile = () => {
  const [loading, setLoading] = useState(true);
  const [viewedEmployee, setViewedEmployee] = useState({});

  const { empId } = useParams();
  useEffect(() => {
    axiosInstance
      .get(`/employees?empId=${empId}`)
      .then((response) => {
        setViewedEmployee({ ...response.data.employees[0] });
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [empId]);

  return (
    <Container sx={{ pb: 3, pt: 5 }}>
      <ProfilContentWithSpinner
        currentEmployee={viewedEmployee}
        isLoading={loading}
      />
    </Container>
  );
};

export default ViewProfile;
