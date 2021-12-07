import React from 'react';
import Box from '@mui/material/Box';

const TabPanelCustom = (props) => {
  const { children, value, index } = props;
  return (
    <Box sx={{ width: '100%' }}>{value === index && <h1>{children}</h1>}</Box>
  );
};

export default TabPanelCustom;
