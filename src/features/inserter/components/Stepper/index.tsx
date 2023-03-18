import React, { Fragment, useContext, useState } from 'react';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MuiStepper from '@mui/material/Stepper';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import useRequest from '../../hooks/useRequest';
import useSnackbar from '../../hooks/useSnackbar';
import StepperButtons from './StepperButtons';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { InserterContext } from '../../context/InserterContext';
import { InserterDispatchContext } from '../../context/InserterDispatchContext';
import styles from './Stepper.module.css';

export const STEPS = [
  'Kind of data',
  'Data insertion',
  'Data validation',
  'Data importation',
];

export default function Stepper() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { snackbar, openSnackbar } = useSnackbar();

  const {
    dataKind,
    parsedData,
    optionId,
    journal: { date, title, editorState },
  } = useContext(InserterContext);
  const dispatch = useContext(InserterDispatchContext);

  const { doRequest, loading, errorSnackbar } = useRequest();
  const isJournal = dataKind === 'journal';

  const handleDataInsertion = async () => {
    if (dataKind === undefined) return;

    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const body = isJournal
      ? {
          date: new Intl.DateTimeFormat('en-CA').format(date!),
          title,
          parsedData: draftToHtml(rawContentState),
        }
      : {
          parsedData,
          optionId,
        };

    const response = await doRequest({
      url: `/${dataKind}s/create`,
      method: 'post',
      body,
    });

    if (response?.status === 201) {
      dispatch({ type: 'RESET_STATE' });
      openSnackbar([{ label: 'Database insertion done!' }]);
    }
  };

  function getStepContent(stepIndex: number) {
    // prettier-ignore
    switch (stepIndex) {
      case 0: return <Step1 />;
      case 1: return <Step2 />;
      case 2: return <Step3 />;
      case 3: return <Step4 loading={loading} errorSnackbar={errorSnackbar} />;
      default: return null;
    }
  }

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
          handleDataInsertion={handleDataInsertion}
          isForwardDisabled={isForwardDisabled}
        />
      </Stack>
      {snackbar}
    </Fragment>
  );
}
