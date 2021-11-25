import React, { useState } from 'react';

import { Container } from '@mui/material';

import { connect } from 'react-redux';

import EditMode from '../components/templates/editMode/editMode.component';
import ProfileContent from '../components/templates/profileContent.component';

const Profile = (props) => {
  const [updateRequest, setUpdateRequest] = useState(props.currentEmployee);

  return (
    <Container sx={{ pb: 3 }}>
      <EditMode updateRequest={updateRequest} />
      <ProfileContent
        updateRequest={updateRequest}
        setUpdateRequest={setUpdateRequest}
        {...props}
      />
    </Container>
  );
};

const mapStateToProps = ({ employee: { inEditMode, currentEmployee } }) => ({
  currentEmployee,
  inEditMode,
});

export default connect(mapStateToProps)(Profile);
