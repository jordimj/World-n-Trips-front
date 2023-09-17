import { EditorState } from 'draft-js';
import { useContext } from 'react';
import { InserterContext } from '../context/InserterContext';
import { KindOfData, TableData } from '../types';

function useInserterContext() {
  const context = useContext(InserterContext);

  if (context === undefined) {
    throw new Error('useInserterContext must be used within an InserterProvider');
  }

  const [state, dispatch] = context;

  const goNextStep = () =>
    dispatch({ type: 'SET_ACTIVE_STEP', payload: ++state.activeStep });

  const goLastStep = () =>
    dispatch({ type: 'SET_ACTIVE_STEP', payload: --state.activeStep });

  const setDatakind = (datakind: KindOfData) =>
    dispatch({ type: 'SET_DATA_KIND', payload: datakind });

  const setFilename = (filename: string) =>
    dispatch({ type: 'SET_FILENAME', payload: filename });

  const setParsedData = (parsedData: TableData) =>
    dispatch({ type: 'SET_PARSED_DATA', payload: parsedData });

  const setOption = (optionId: number | null) =>
    dispatch({ type: 'SET_OPTION', payload: optionId });

  const setEditorState = (editor: EditorState) =>
    dispatch({ type: 'SET_JOURNAL_EDITOR_STATE', payload: editor });

  const setTitle = (title: string) =>
    dispatch({ type: 'SET_JOURNAL_TITLE', payload: title });

  const setDate = (newDate: Date | null) =>
    dispatch({ type: 'SET_JOURNAL_DATE', payload: newDate });

  const setTripName = (name: string) =>
    dispatch({ type: 'SET_TRIP_NAME', payload: name });

  const setTripSummary = (summary: string) =>
    dispatch({ type: 'SET_TRIP_SUMMARY', payload: summary });

  const setTripCover = (cover: string) =>
    dispatch({ type: 'SET_TRIP_COVER', payload: cover });

  const setTripWork = (work: 'worktrip' | 'telework' | null) =>
    dispatch({ type: 'SET_TRIP_WITH_WORK', payload: work });

  const setArrivalTripDate = (newDate: Date | null) =>
    dispatch({ type: 'SET_TRIP_ARRIVAL_DATE', payload: newDate });

  const setDepartureTripDate = (newDate: Date | null) =>
    dispatch({ type: 'SET_TRIP_DEPARTURE_DATE', payload: newDate });

  const resetState = () => dispatch({ type: 'RESET_STATE' });

  return {
    state,
    actions: {
      goLastStep,
      goNextStep,
      setDatakind,
      setFilename,
      setParsedData,
      setOption,
      setTitle,
      setEditorState,
      setDate,
      setTripName,
      setTripSummary,
      setTripCover,
      setTripWork,
      setArrivalTripDate,
      setDepartureTripDate,
      resetState,
    },
  };
}

export default useInserterContext;
