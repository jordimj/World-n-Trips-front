import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Spinner() {
  return (
    <Backdrop open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Spinner;
