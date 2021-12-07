import { styled } from '@mui/system';

//custom styling component for 2 column and 3 row (css grid)
export const CustomGridBox = styled('div')(({ theme }) => ({
  width: '100%',
  minHeight: '80px',
  display: 'grid',
  gridTemplateRows: 'repeat(3,30px)',
  gridTemplateColumns: '40% 60%',
  alignItems: 'center',
}));
