import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Expense, ImportData, KindOfData } from '../../types';
import useRequest from '../../hooks/useRequest';
import useSnackbar from '../../hooks/useSnackbar';
import StepperButtons from './StepperButtons';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import styles from './AppStepper.module.css';
import { Stack } from '@mui/material';

export const STEPS = [
  'Kind of data',
  'Data insertion',
  'Data validation',
  'Data importation',
];

export default function AppStepper() {
  const [dataKind, setDataKind] = useState<KindOfData | undefined>(undefined);
  const [filename, setFilename] = useState<string>('');
  const [optionId, setOptionId] = useState<number>(-1);
  const [parsedData, setParsedData] = useState<ImportData>();

  const [date, setDate] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    setParsedData(draftToHtml(rawContentState));
  }, [editorState]);

  const { snackbar, openSnackbar } = useSnackbar();

  const handleFinished = () => {
    openSnackbar([{ label: 'Database insertion done!' }]);
    setActiveStep(0);
    setDataKind(undefined);
    setFilename('');
    setOptionId(-1);
    setParsedData([]);
    setTitle('');
    setEditorState(() => EditorState.createEmpty());
    setDate(null);
  };

  const updateParsedData = (
    id: number,
    key: 'category' | 'subcategory' | 'extraInfo',
    value: any
  ) => {
    if (!Array.isArray(parsedData)) return;
    setParsedData(
      (parsedData as Expense[])?.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            [key]: value,
          } as Expense;
        }

        return data as Expense;
      }) as Expense[]
    );
  };

  const { doRequest, loading, errorSnackbar } = useRequest();
  const isJournal = dataKind === 'journal';

  const handleDataInsertion = async () => {
    if (dataKind === undefined) return;

    const body = isJournal
      ? {
          date: new Intl.DateTimeFormat('en-CA').format(date!),
          title,
          parsedData,
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

    if (response?.status === 201) handleFinished();
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return <Step1 dataKind={dataKind} setDataKind={setDataKind} />;
      case 1:
        return (
          <Step2
            isJournal={isJournal}
            title={title}
            setTitle={setTitle}
            editorState={editorState}
            setEditorState={setEditorState}
            filename={filename}
            setFilename={setFilename}
            setParsedData={setParsedData}
          />
        );
      case 2:
        if (dataKind === undefined || parsedData === undefined) return;
        return (
          <Step3
            dataKind={dataKind}
            title={title}
            parsedData={parsedData}
            date={date}
            setDate={setDate}
            filename={filename}
            updateParsedData={updateParsedData}
            optionId={optionId}
            setOptionId={setOptionId}
          />
        );
      case 3:
        return <Step4 loading={loading} errorSnackbar={errorSnackbar} />;
      default:
        return null;
    }
  }

  const isForwardDisabled = (activeStep: number): boolean => {
    const shouldDisableStep1 = isJournal
      ? title === '' || editorState.getCurrentContent().getPlainText() === ''
      : !parsedData;

    const shouldDisableStep2 = isJournal ? date === null : optionId === -1;

    // prettier-ignore
    switch (activeStep) {
      case 0: return dataKind === undefined;
      case 1: return shouldDisableStep1;
      case 2: return shouldDisableStep2;
      default: return false;
    }
  };

  return (
    <Stack className={styles.root}>
      <Stepper activeStep={activeStep} alternativeLabel className={styles.stepper}>
        {STEPS.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getStepContent(activeStep)}
      <StepperButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        handleDataInsertion={handleDataInsertion}
        isForwardDisabled={isForwardDisabled}
      />
      {snackbar}
    </Stack>
  );
}
