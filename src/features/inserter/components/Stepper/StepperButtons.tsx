import React, { Dispatch, SetStateAction } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { STEPS } from '.';

interface StepperButtonsProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  handleDataInsertion: () => void;
  isForwardDisabled: (activeStep: number) => boolean;
}

export default function StepperButtons(props: StepperButtonsProps) {
  const { activeStep, setActiveStep, handleDataInsertion, isForwardDisabled } = props;

  const handleNext = () => setActiveStep((prevStep) => ++prevStep);
  const handleBack = () => setActiveStep((prevStep) => --prevStep);

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
        onClick={activeStep === 3 ? handleDataInsertion : handleNext}
        disabled={isForwardDisabled(activeStep)}
      >
        {activeStep === STEPS.length - 1 ? 'Import!' : 'Next'}
      </Button>
    </Stack>
  );
}
