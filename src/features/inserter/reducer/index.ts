import { EditorState } from 'draft-js';
import { Action } from '../actions';
import { ImportData, ImportKind } from '../types';

export interface InserterState {
  activeStep: number;
  dataKind: ImportKind | undefined;
  filename: string;
  parsedData?: ImportData;
  optionId: number | null;
  trip?: {
    name: string;
    summary: string;
    coverImage: string;
    imageFile: File | null;
    work: 'telework' | 'worktrip' | null;
  };
  journal: {
    date: Date | null;
    title: string;
    editorState: EditorState;
  };
}

export const initialState: InserterState = {
  activeStep: 0,
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

const emptyTrip: NonNullable<InserterState['trip']> = {
  name: '',
  summary: '',
  coverImage: '',
  imageFile: null,
  work: null,
};

function reducer(state: InserterState, action: Action): InserterState {
  switch (action.type) {
    case 'SET_ACTIVE_STEP': {
      return {
        ...state,
        activeStep: action.payload,
      };
    }
    case 'SET_DATA_KIND': {
      return {
        ...state,
        dataKind: action.payload,
        activeStep: 1,
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
    case 'SET_TRIP_NAME': {
      return {
        ...state,
        trip: {
          ...(state.trip ?? emptyTrip),
          name: action.payload,
        },
      };
    }
    case 'SET_TRIP_SUMMARY': {
      return {
        ...state,
        trip: {
          ...(state.trip ?? emptyTrip),
          summary: action.payload,
        },
      };
    }
    case 'SET_TRIP_COVER': {
      return {
        ...state,
        trip: {
          ...(state.trip ?? emptyTrip),
          coverImage: action.payload,
        },
      };
    }
    case 'SET_TRIP_WITH_WORK': {
      return {
        ...state,
        trip: {
          ...(state.trip ?? emptyTrip),
          work: action.payload,
        },
      };
    }
    case 'SET_TRIP_FILE': {
      return {
        ...state,
        trip: {
          ...(state.trip ?? emptyTrip),
          imageFile: action.payload,
        },
      };
    }
    case 'RESET_STATE': {
      return initialState;
    }
  }
}

export default reducer;
