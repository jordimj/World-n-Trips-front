import React, { Dispatch, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { STEPS } from './AppStepper';

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
    <Box
      sx={{
        paddingTop: '10px',
        paddingBottom: '30px',
      }}
    >
      <Button
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{
          marginRight: 'var(--spacing-1)',
        }}
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
    </Box>
  );
}
