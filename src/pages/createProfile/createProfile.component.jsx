import React, { useEffect, useState } from 'react';

import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import {
  Box,
  Button,
  Container,
  MenuItem,
  Modal,
  Paper,
  Typography,
} from '@mui/material';

import {
  createProfileConstant,
  addFieldOptions,
} from './createProfile.constant';

import {
  ContainerStyle,
  BoxStyle,
  GreenButton,
  BlueButton,
  TitleTypo,
  ContainerStyleTop,
  modalStyle,
  CustomTextField,
  ModalBoxItem,
} from './createProfile.styles';

import ProfileInfoEditable from './../../components/templates/profileInfo/profileInfoEditable.component';
import TabPanelCustom from './../../components/templates/tabPanelCustom.component';
import PersonalEditable from '../../components/templates/personal/personalEditable.component';
import ProfessionalEditable from '../../components/templates/professional/professionalEditable.component';
import SkillEditable from '../../components/templates/skill/skillEditable.component';

import { useSelector } from 'react-redux';

import axiosInstance from './../../helpers/axiosInstance';

const CreateProfile = () => {
  const { currentEmployee } = useSelector((state) => state.employee);

  //just for ref will remove after validation
  const empInitial = {
    empName: '',
    empEmail: '',
    empDepartment: '',
    empDesignation: '',
    empDoj: '',
    empReportingManager: '',
    empAboutMe: '',
    empBand: '',
    empCertifications: '',
    empConnections: '',
    empCurrentAddress: '',
    empDob: '',
    empGraduation: '',
    empGraduationUniversity: '',
    empHobbies: '',
    empPersonalEmail: '',
    empPostGraduation: '',
    empPostGraduationUniversity: '',
    empPrimaryCapability: '',
    empResidentialAddress: '',
    empSkillSet: '',
  };

  const [employee, setEmployee] = useState(empInitial);

  const [tab, setTab] = useState(0);

  //modal
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalError, setOpenModalError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenModalError = () => setOpenModalError(true);
  const handleCloseModalError = () => setOpenModalError(false);

  const types = [...addFieldOptions];

  const [field, setField] = useState({
    name: '',
    value: '',
    type: '',
    tab: tab,
  });

  useEffect(() => {
    setField({ ...field, tab: tab });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const [type, setType] = useState('');
  const valueField = (type) => {
    if (type === '') {
      return '';
    } else if (type === 'date') {
      return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat='dd/MM/yyyy'
            onChange={(newValue) => {
              setField({ ...field, value: newValue });
            }}
            renderInput={(params) => (
              <CustomTextField {...params} name='date' />
            )}
          />
        </LocalizationProvider>
      );
    } else {
      return (
        <CustomTextField
          value={field.value}
          type={type}
          name='value'
          onChange={(e) => setField({ ...field, value: e.target.value })}
          placeholder='Enter value'
        />
      );
    }
  };

  //new fields
  const [newTextFields, setNewTextField] = useState([]);

  const handleNewFieldClick = (event) => {
    setNewTextField([...newTextFields, field]);
    setField({ name: '', value: '', type: '' });
    setType('');
    handleClose();
  };

  const handleChange = (event) => {
    setType(event.target.value);
    setField({ ...field, type: event.target.value });
  };

  // useEffect(() => {
  //   console.log(newAddedFields);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newAddedFields]);

  const handleConfirm = (event) => {
    if (
      employee.empName === '' ||
      employee.empEmail === '' ||
      employee.empDoj === '' ||
      employee.empDob === ''
    ) {
      alert('Fields are empty');
    } else {
      axiosInstance
        .post('/reviews', {
          reqName: currentEmployee.empName,
          reqType: 'profile-creation',
          employeeDetails: { ...employee },
        })
        .then(function (response) {
          setEmployee(empInitial);
          handleOpenModal();
          console.log(response);
        })
        .catch(function (error) {
          handleOpenModalError();
          console.log(error);
        });
    }
  };

  return (
    <BoxStyle>
      <ContainerStyleTop>
        <TitleTypo sx={{ textTransform: 'capitalize', mb: 0.5 }}>
          {createProfileConstant.user}
        </TitleTypo>
        <Box
          sx={{
            display: 'flex',
            width: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TitleTypo sx={{ textTransform: 'capitalize', fontSize: 24, ml: 2 }}>
            {createProfileConstant.createUser}
          </TitleTypo>
          <Box>
            <GreenButton onClick={handleConfirm} variant='contained'>
              {createProfileConstant.confirm}
            </GreenButton>
            <BlueButton onClick={handleOpen} variant='contained'>
              {createProfileConstant.addCustomField}
            </BlueButton>
          </Box>
        </Box>
      </ContainerStyleTop>
      <ContainerStyle>
        <Container>
          <ProfileInfoEditable
            tab={tab}
            setTab={setTab}
            employee={employee}
            setEmployee={setEmployee}
          />
        </Container>
        <Container sx={{ width: 'calc(100% - 16px)' }}>
          <TabPanelCustom value={tab} index={0}>
            <PersonalEditable
              empData={employee}
              setEmpData={setEmployee}
              newFields={newTextFields}
            />
          </TabPanelCustom>
          <TabPanelCustom value={tab} index={1}>
            <ProfessionalEditable
              empData={employee}
              setEmpData={setEmployee}
              newFields={newTextFields}
            />
          </TabPanelCustom>
          <TabPanelCustom value={tab} index={2}>
            <SkillEditable
              empData={employee}
              setEmpData={setEmployee}
              newFields={newTextFields}
            />
          </TabPanelCustom>
        </Container>
      </ContainerStyle>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Paper elevation={3} sx={modalStyle}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CustomTextField
                autoComplete='off'
                required
                id='outlined-basic'
                variant='outlined'
                value={field.name}
                type='text'
                name='name'
                onChange={(e) => setField({ ...field, name: e.target.value })}
                placeholder='Add a title'
              />
              {valueField(type)}
              <CustomTextField select value={type} onChange={handleChange}>
                {types.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Box>
            <GreenButton
              variant='contained'
              onClick={handleNewFieldClick}
              sx={{ width: '40%', mt: 1 }}
            >
              Add field
            </GreenButton>
          </Paper>
        </Modal>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <ModalBoxItem>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {createProfileConstant.modalMessageSuccess}
          </Typography>
          <Button variant='contained' onClick={handleCloseModal}>
            {createProfileConstant.modalBtn}
          </Button>
        </ModalBoxItem>
      </Modal>
      <Modal open={openModalError} onClose={handleCloseModalError}>
        <ModalBoxItem>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {createProfileConstant.modalMessageFail}
          </Typography>
          <Button variant='contained' onClick={handleCloseModalError}>
            {createProfileConstant.modalBtnTryAgain}
          </Button>
        </ModalBoxItem>
      </Modal>
    </BoxStyle>
  );
};

export default CreateProfile;
