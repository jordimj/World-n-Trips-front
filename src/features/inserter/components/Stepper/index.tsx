import { Fragment, useState } from 'react';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MuiStepper from '@mui/material/Stepper';
import StepperButtons from './StepperButtons';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { useInserterContext } from '../../hooks/useInserterContext';
import styles from './Stepper.module.css';

export const STEPS = [
  'Kind of data',
  'Data insertion',
  'Data validation',
  'Data importation',
];

export default function Stepper() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const {
    state: {
      dataKind,
      parsedData,
      optionId,
      journal: { date, title, editorState },
    },
  } = useInserterContext();

  function getStepContent(stepIndex: number) {
    // prettier-ignore
    switch (stepIndex) {
      case 0: return <Step1 />;
      case 1: return <Step2 />;
      case 2: return <Step3 />;
      case 3: return <Step4 />;
      default: return null;
    }
  }

  const isJournal = dataKind === 'journal';

  const isForwardDisabled = (activeStep: number): boolean => {
    const shouldDisableStep2 = isJournal
      ? title === '' || editorState.getCurrentContent().getPlainText() === ''
      : parsedData?.length === 0;

    const shouldDisableStep3 = isJournal ? date === null : optionId === null;

    // prettier-ignore
    switch (activeStep) {
      case 0: return dataKind === undefined;
      case 1: return shouldDisableStep2;
      case 2: return shouldDisableStep3;
      default: return false;
    }
  };

  return (
    <Fragment>
      <MuiStepper activeStep={activeStep} alternativeLabel className={styles.stepper}>
        {STEPS.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      <Stack className={styles.stepContent}>
        {getStepContent(activeStep)}
        <StepperButtons
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          isForwardDisabled={isForwardDisabled}
        />
      </Stack>
    </Fragment>
  );
}
