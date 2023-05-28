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
  | ResetStateAction;
