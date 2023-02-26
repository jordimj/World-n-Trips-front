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

type SetJournalDateAction = {
  type: 'SET_JOURNAL_DATE';
  payload: Date;
};

type SetJournalTitleAction = {
  type: 'SET_JOURNAL_TITLE';
  payload: string;
};

type SetJournalEditorStateAction = {
  type: 'SET_JOURNAL_EDITOR_STATE';
  payload: EditorState;
};

export type Action =
  | SetDataKindAction
  | SetFilenameAction
  | SetParsedDataAction
  | SetJournalDateAction
  | SetJournalTitleAction
  | SetJournalEditorStateAction;

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
    // default: {
    //   throw Error('Unknown action: ' + action.type);
    // }
  }
}

export default reducer;
