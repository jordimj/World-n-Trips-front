import { Fragment } from 'react';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MuiStepper from '@mui/material/Stepper';
import useInserterContext from '../../hooks/useInserterContext';
import FullTripImport from '../FullTrip/FullTripImport';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import StepperButtons from './StepperButtons';
import styles from './Stepper.module.css';

const STEPS = {
  0: <Step1 />,
  1: <Step2 />,
  2: <Step3 />,
};

export default function Stepper() {
  const {
    state: { activeStep, dataKind },
    actions: { goLastStep },
  } = useInserterContext();

  if (dataKind === 'trip' && activeStep > 0) return <FullTripImport onBack={goLastStep} />;

  return (
    <Fragment>
      {activeStep > 0 && (
        <MuiStepper className={styles.stepper} activeStep={activeStep - 1} alternativeLabel>
          {(dataKind === 'journal' ? ['Write', 'Review'] : ['Add data', 'Review']).map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </MuiStepper>
      )}
      <Stack
        className={styles.stepContent}
        sx={
          activeStep === 0
            ? {
                flex: 1,
                minHeight: 0,
                height: 'auto',
                overflow: 'auto',
                '& > :first-child': { my: 'auto', flexShrink: 0 },
              }
            : undefined
        }
      >
        {STEPS[activeStep as keyof typeof STEPS]}
        <StepperButtons />
      </Stack>
    </Fragment>
  );
}
