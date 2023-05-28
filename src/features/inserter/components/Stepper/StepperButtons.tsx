import { Fragment, useEffect } from 'react';
import { AxiosError } from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Spinner from '@/template/components/Spinner/Spinner';
import useDataInsertion from '../../hooks/useDataInsertion';
import useInserterContext from '../../hooks/useInserterContext';
import useSnackbar from '../../hooks/useSnackbar';
import { STEP_LABELS } from '../../constants';

export default function StepperButtons() {
  const {
    state: {
      activeStep,
      dataKind,
      parsedData,
      optionId,
      journal: { date, title, editorState },
    },
    actions: { goNextStep, goLastStep },
  } = useInserterContext();

  const { isLoading, isSuccess, isError, error, mutate } = useDataInsertion();
  const { openSnackbar, snackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess) openSnackbar([{ label: 'Database insertion done!' }]);
    if (isError) {
      const errors: any = (error as AxiosError).response?.data;
      openSnackbar([{ label: errors.message, severity: 'error' }]);
    }
  }, [isSuccess, isError]);

  const isJournal = dataKind === 'journal';

  const isForwardDisabled = (activeStep: number): boolean => {
    const shouldDisableStep2 = isJournal
      ? title === '' || editorState.getCurrentContent().getPlainText() === ''
      : parsedData?.length === 0;

    const shouldDisableStep3 = isJournal ? date === null : optionId === null;

    switch (activeStep) {
      case 1:
        return shouldDisableStep2;
      case 2:
        return shouldDisableStep3;
      default:
        return false;
    }
  };

  const shouldShowButtons = activeStep !== 0;
  const isLastStep = activeStep === STEP_LABELS.length - 1;

  return (
    <Fragment>
      {shouldShowButtons && (
        <Stack direction="row" gap={2} sx={{ py: 2 }}>
          <Button onClick={goLastStep} variant="outlined" color="secondary">
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (isLastStep ? mutate : goNextStep)()}
            disabled={isForwardDisabled(activeStep)}
          >
            {isLastStep ? 'Import !' : 'Next'}
          </Button>
        </Stack>
      )}
      {isLoading && <Spinner />}
      {snackbar}
    </Fragment>
  );
}
