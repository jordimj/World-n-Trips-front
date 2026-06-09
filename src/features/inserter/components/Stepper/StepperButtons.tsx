import { Fragment, useEffect } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Spinner from '@/template/components/Spinner/Spinner';
import { STEP_LABELS } from '../../constants';
import useDataInsertion from '../../hooks/useDataInsertion';
import useInserterContext from '../../hooks/useInserterContext';
import useTripValidation from '../../hooks/useTripValidation';

export default function StepperButtons() {
  const {
    state: {
      activeStep,
      dataKind,
      parsedData,
      optionId,
      journal: { date, title, editorState },
      trip,
    },
    actions: { goNextStep, goLastStep },
  } = useInserterContext();

  const { isValid: isTripValid } = useTripValidation({ trip });
  const { isPending, mutate, snackbar } = useDataInsertion();

  const isJournal = dataKind === 'journal';
  const isTrip = dataKind === 'trip';

  const shouldDisableStep2 = () => {
    if (isTrip) return !isTripValid;
    if (isJournal) return title === '' || editorState.getCurrentContent().getPlainText() === '';

    return parsedData?.length === 0;
  };

  const shouldDisableStep3 = () => {
    if (isTrip) return trip === undefined;
    if (isJournal) return date === null;

    return optionId === null;
  };

  const isForwardDisabled = (activeStep: number): boolean => {
    switch (activeStep) {
      case 1:
        return shouldDisableStep2();
      case 2:
        return shouldDisableStep3();
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
            onClick={() => (isLastStep ? mutate : goNextStep)()}
            disabled={isForwardDisabled(activeStep) || isPending}
            {...(isPending && { startIcon: <CircularProgress size={20} color="inherit" /> })}
          >
            {isLastStep ? 'Import !' : 'Next'}
          </Button>
        </Stack>
      )}
      {isPending && <Spinner />}
      {snackbar}
    </Fragment>
  );
}
