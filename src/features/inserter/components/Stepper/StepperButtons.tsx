import React, { Dispatch, SetStateAction } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { STEPS } from '.';
import useDataInsertion from '../../hooks/useDataInsertion';
import Spinner from '../../../../template/components/Spinner/Spinner';
import useSnackbar from '../../hooks/useSnackbar';

interface StepperButtonsProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  isForwardDisabled: (activeStep: number) => boolean;
}

export default function StepperButtons(props: StepperButtonsProps) {
  const { activeStep, setActiveStep, isForwardDisabled } = props;

  const mutation = useDataInsertion();
  const { openSnackbar, snackbar } = useSnackbar();

  const handleNext = () => setActiveStep((prevStep) => ++prevStep);
  const handleBack = () => setActiveStep((prevStep) => --prevStep);

  // if (mutation?.isSuccess) openSnackbar([{ label: 'Database insertion done!' }]);

  return (
    <Stack direction="row" gap={1} sx={{ py: 1 }}>
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        variant="outlined"
        color="secondary"
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (activeStep === 3 ? mutation?.mutate() : handleNext())}
        disabled={isForwardDisabled(activeStep)}
      >
        {activeStep === STEPS.length - 1 ? 'Import!' : 'Next'}
      </Button>
      {mutation?.isLoading && <Spinner />}
      {snackbar}
    </Stack>
  );
}
