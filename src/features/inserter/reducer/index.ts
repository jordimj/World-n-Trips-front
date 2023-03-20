import { EditorState } from 'draft-js';
import { Action } from '../actions';
import { ImportData, KindOfData } from '../types';

export interface InserterState {
  dataKind: KindOfData | undefined;
  filename: string;
  parsedData?: ImportData;
  optionId: number | null;
  journal: {
    date: Date | null;
    title: string;
    editorState: EditorState;
  };
}

export const initialState: InserterState = {
  dataKind: undefined,
  filename: '',
  parsedData: [],
  optionId: null,
  journal: {
    title: '',
    date: null,
    editorState: EditorState.createEmpty(),
  },
};

function reducer(state: InserterState, action: Action) {
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
