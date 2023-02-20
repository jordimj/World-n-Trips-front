import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface Step4Props {
  loading: boolean;
  errorSnackbar: JSX.Element;
}

function Step4(props: Step4Props) {
  const { loading, errorSnackbar } = props;
  return (
    <>
      <h2>Time to import</h2>
      {loading && <CircularProgress />}
      {errorSnackbar}
    </>
  );
}

export default Step4;
