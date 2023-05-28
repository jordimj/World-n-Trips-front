import { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import { AxiosError } from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Spinner from '@/template/components/Spinner/Spinner';
import useDataInsertion from '../../hooks/useDataInsertion';
import useSnackbar from '../../hooks/useSnackbar';
import { STEPS } from '.';

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

  useEffect(() => {
    if (mutation.isSuccess) {
      openSnackbar([{ label: 'Database insertion done!' }]);
      setActiveStep(0);
    }
  }, [mutation.isSuccess]);

  useEffect(() => {
    if (mutation.isError) {
      const errors: any = (mutation.error as AxiosError).response?.data;
      openSnackbar([{ label: errors.message, severity: 'error' }]);
    }
  }, [mutation.isError]);

  const shouldShowButtons = activeStep !== 0;

  if (!shouldShowButtons) return <Fragment />;

  return (
    <Stack direction="row" gap={2} sx={{ py: 2 }}>
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
        {activeStep === STEPS.length - 1 ? 'Go !' : 'Next'}
      </Button>
      {mutation?.isLoading && <Spinner />}
      {snackbar}
    </Stack>
  );
}
