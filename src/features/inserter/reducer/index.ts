import { EditorState } from 'draft-js';
import { Action } from '../actions';
import { ImportData, KindOfData } from '../types';

export interface InserterState {
  activeStep: number;
  dataKind: KindOfData | undefined;
  filename: string;
  parsedData?: ImportData;
  optionId: number | null;
  trip?: {
    name: string;
    summary: string;
    coverImage: string;
    work: 'telework' | 'worktrip' | null;
    arrivalDate: Date;
    departureDate: Date;
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

function reducer(state: InserterState, action: Action) {
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
          ...state.trip,
          name: action.payload,
        },
      };
    }
    case 'SET_TRIP_SUMMARY': {
      return {
        ...state,
        trip: {
          ...state.trip,
          summary: action.payload,
        },
      };
    }
    case 'SET_TRIP_COVER': {
      return {
        ...state,
        trip: {
          ...state.trip,
          coverImage: action.payload,
        },
      };
    }
    case 'SET_TRIP_WITH_WORK': {
      return {
        ...state,
        trip: {
          ...state.trip,
          work: action.payload,
        },
      };
    }
    case 'SET_TRIP_ARRIVAL_DATE': {
      return {
        ...state,
        trip: {
          ...state.trip,
          arrivalDate: action.payload,
        },
      };
    }
    case 'SET_TRIP_DEPARTURE_DATE': {
      return {
        ...state,
        trip: {
          ...state.trip,
          departureDate: action.payload,
        },
      };
    }
    case 'RESET_STATE': {
      return initialState;
    }
  }
}

export default reducer;
