import { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MuiStepper from '@mui/material/Stepper';
import { STEP_LABELS } from '../../constants';
import useInserterContext from '../../hooks/useInserterContext';
import StepperButtons from './StepperButtons';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import styles from './Stepper.module.css';

const STEPS = {
  0: <Step1 />,
  1: <Step2 />,
  2: <Step3 />,
};

export default function Stepper() {
  const {
    state: { activeStep },
  } = useInserterContext();

  return (
    <Fragment>
      <MuiStepper className={styles.stepper} activeStep={activeStep} alternativeLabel>
        {STEP_LABELS.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      <Stack className={styles.stepContent}>
        {STEPS[activeStep as 0 | 1 | 2]}
        <StepperButtons />
      </Stack>
    </Fragment>
  );
}
