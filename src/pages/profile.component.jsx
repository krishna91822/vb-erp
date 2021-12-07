import React, { useEffect, useState } from 'react';

import { Container } from '@mui/material';

import { useSelector } from 'react-redux';

import EditMode from '../components/templates/editMode/editMode.component';
import ProfileContent from '../components/templates/profileContent.component';

const Profile = () => {
  const { currentEmployee } = useSelector((state) => state.employee);
  const { inEditMode } = useSelector((state) => state.employee);

  const [updateRequest, setUpdateRequest] = useState(currentEmployee);

  useEffect(() => {}, [inEditMode]);

  return (
    <Container sx={{ pb: 3 }}>
      <EditMode
        setUpdateRequest={setUpdateRequest}
        updateRequest={updateRequest}
        inEditMode={inEditMode}
      />
      <ProfileContent
        updateRequest={updateRequest}
        setUpdateRequest={setUpdateRequest}
        currentEmployee={currentEmployee}
        inEditMode={inEditMode}
      />
    </Container>
  );
};

export default Profile;
