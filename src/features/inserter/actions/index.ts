import { EditorState } from 'draft-js';
import { KindOfData, TableData } from '../types';

type SetActiveStepAction = {
  type: 'SET_ACTIVE_STEP';
  payload: number;
};

type SetDataKindAction = {
  type: 'SET_DATA_KIND';
  payload: KindOfData | undefined;
};

type SetFilenameAction = {
  type: 'SET_FILENAME';
  payload: string;
};

type SetParsedDataAction = {
  type: 'SET_PARSED_DATA';
  payload: TableData;
};

type SetOptionAction = {
  type: 'SET_OPTION';
  payload: number | null;
};

type SetJournalDateAction = {
  type: 'SET_JOURNAL_DATE';
  payload: Date | null;
};

type SetJournalTitleAction = {
  type: 'SET_JOURNAL_TITLE';
  payload: string;
};

type SetJournalEditorStateAction = {
  type: 'SET_JOURNAL_EDITOR_STATE';
  payload: EditorState;
};

type SetTripNameAction = {
  type: 'SET_TRIP_NAME';
  payload: string;
};

type SetTripSummaryAction = {
  type: 'SET_TRIP_SUMMARY';
  payload: string;
};

type SetTripCoverAction = {
  type: 'SET_TRIP_COVER';
  payload: string;
};

type SetTripWithWork = {
  type: 'SET_TRIP_WITH_WORK';
  payload: 'worktrip' | 'telework' | null;
};

type SetTripArrivalDateAction = {
  type: 'SET_TRIP_ARRIVAL_DATE';
  payload: Date | null;
};

type SetTripDepartureDateAction = {
  type: 'SET_TRIP_DEPARTURE_DATE';
  payload: Date | null;
};

type ResetStateAction = {
  type: 'RESET_STATE';
};

export type Action =
  | SetActiveStepAction
  | SetDataKindAction
  | SetFilenameAction
  | SetParsedDataAction
  | SetOptionAction
  | SetJournalDateAction
  | SetJournalTitleAction
  | SetJournalEditorStateAction
  | SetTripNameAction
  | SetTripSummaryAction
  | SetTripCoverAction
  | SetTripWithWork
  | SetTripArrivalDateAction
  | SetTripDepartureDateAction
  | ResetStateAction;
