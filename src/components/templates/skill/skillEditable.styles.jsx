import { TextField } from '@mui/material';
import { styled } from '@mui/system';

export const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    width: '80%',
    height: '40px',
  },
});

export const ContentBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'grid',
  alignItems: 'center',
  gridTemplateColumns: '1fr 2fr',
  gridColumnGap: 20,
  textTransform: 'capitalize',
  color: 'textColor.main',
}));

export const ContentTypo = styled('div')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 13,
  fontWeight: 600,
}));
