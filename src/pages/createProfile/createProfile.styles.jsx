import { Container, Box, Button, TextField, Switch } from '@mui/material';
import { styled } from '@mui/system';
import { blue, teal } from '@mui/material/colors';

export const BoxStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
}));

export const ContainerStyleTop = styled(Container)(({ theme }) => ({
  minHeight: '40px',
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

export const ContainerStyle = styled(Container)(({ theme }) => ({
  minHeight: 'calc(100vh - 50px)',
  width: 'calc(100% - 48px)',
  border: '2px solid',
  borderColor: theme.palette.textColor.paletteGrey,
}));

export const GreenButton = styled(Button)({
  color: '#fff',
  backgroundColor: teal[400],
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'capitalize',
  margin: '0 8px',
  '&:hover': {
    backgroundColor: teal[600],
  },
});

export const BlueButton = styled(Button)({
  color: '#fff',
  backgroundColor: blue[600],
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'capitalize',
  '&:hover': {
    backgroundColor: blue[800],
  },
});

export const TitleTypo = styled('div')(({ theme }) => ({
  ...theme.typography.h5,
  fontWeight: 600,
  color: theme.palette.textColor.main,
  fontSize: 18,
}));

export const modalStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  minHeight: 40,
  p: 4,
};

export const CustomTextField = styled(TextField)({
  padding: '10px',
  width: '100%',
  '& .MuiOutlinedInput-input': {
    fontSize: '16px',
  },
  '& .MuiOutlinedInput-root': {
    height: '40px',
  },
});

export const ModalBoxItem = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '200px',
  weight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: '#F7F9FA',
  outline: '2px solid #C3CFD9',
  borderRadius: '5px',
  padding: '32px',
});

export const CustomSwitch = styled((props) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 45,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 1,
    margin: 1,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(23px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: teal[500],
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: 'teal[500]',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
