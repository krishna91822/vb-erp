import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

import { TitleTypo, CustomSwitch, ModalBoxItem } from './editMode.styles';
import { editModeConstant } from './editMode.constant';

import { useSelector, useDispatch } from 'react-redux';
import { toggleEditMode } from '../../../store/employeeSlice';

import axiosInstance from './../../../helpers/axiosInstance';

const EditMode = ({ setUpdateRequest, updateRequest }) => {
  const { inEditMode } = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    dispatch(toggleEditMode());
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);

  const handleSubmit = () => {
    console.log({ ...updateRequest });
    axiosInstance
      .post('/reviews', {
        reqName: updateRequest.empName,
        reqType: 'profile-update',
        employeeDetails: { ...updateRequest },
      })
      .then(function (response) {
        handleOpen();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    dispatch(toggleEditMode());
  };
  return (
    <Box
      sx={{
        minHeight: 40,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 2,
      }}
    >
      {inEditMode ? (
        <div>
          <Button
            sx={{ marginRight: '2rem' }}
            variant='contained'
            onClick={handleSubmit}
          >
            {editModeConstant.SubmitRequest}
          </Button>
          <Modal open={open} onClose={handleClose}>
            <ModalBoxItem>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                {editModeConstant.modalMessage}
              </Typography>
              <Button variant='contained' onClick={handleClose}>
                {editModeConstant.modalBtn}
              </Button>
            </ModalBoxItem>
          </Modal>
        </div>
      ) : (
        ''
      )}
      <TitleTypo sx={{ textTransform: 'capitalize', pr: 1 }}>
        {editModeConstant.editModeBtn}
      </TitleTypo>
      <CustomSwitch
        checked={inEditMode}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'switch' }}
      />
    </Box>
  );
};

export default EditMode;
