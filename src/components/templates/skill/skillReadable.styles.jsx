import { styled } from '@mui/system';

export const ContentBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  gridColumnGap: 20,
  textTransform: 'capitalize',
  color: 'textColor.main',
}));

export const ContentTypo = styled('p')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 13,
  fontWeight: 600,
  margin: 0,
}));
export const ContentTypoList = styled('div')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.textColor.main,
  fontSize: 13,
  fontWeight: 600,
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
}));

export const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
