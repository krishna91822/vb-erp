import { styled } from '@mui/system';

export const ContentBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
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
