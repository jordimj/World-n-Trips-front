import { EditorState } from 'draft-js';
import { ImportData, KindOfData, TableData } from '../types';

interface State {
  dataKind: KindOfData | undefined;
  filename: string;
  parsedData?: ImportData;
  optionId: number;
  journal: {
    date: Date | null;
    title: string;
    editorState: EditorState;
  };
}

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
  payload: number;
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
  | SetDataKindAction
  | SetFilenameAction
  | SetParsedDataAction
  | SetOptionAction
  | SetJournalDateAction
  | SetJournalTitleAction
  | SetJournalEditorStateAction
  | ResetStateAction;

export const initialState: State = {
  dataKind: undefined,
  filename: '',
  parsedData: [],
  optionId: -1,
  journal: {
    title: '',
    date: null,
    editorState: EditorState.createEmpty(),
  },
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_DATA_KIND': {
      return {
        ...state,
        dataKind: action.payload,
      };
    }
    case 'SET_FILENAME': {
      return {
        ...state,
        filename: action.payload,
      };
    }
    case 'SET_PARSED_DATA': {
      return {
        ...state,
        parsedData: action.payload,
      };
    }
    case 'SET_OPTION': {
      return {
        ...state,
        optionId: action.payload,
      };
    }
    case 'SET_JOURNAL_DATE': {
      return {
        ...state,
        journal: {
          ...state.journal,
          date: action.payload,
        },
      };
    }
    case 'SET_JOURNAL_TITLE': {
      return {
        ...state,
        journal: {
          ...state.journal,
          title: action.payload,
        },
      };
    }
    case 'SET_JOURNAL_EDITOR_STATE': {
      return {
        ...state,
        journal: {
          ...state.journal,
          editorState: action.payload,
        },
      };
    }
    case 'RESET_STATE': {
      return initialState;
    }
    // default: {
    //   throw Error('Unknown action: ' + action.type);
    // }
  }
}

export default reducer;
