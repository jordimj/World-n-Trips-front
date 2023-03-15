import { EditorState } from 'draft-js';
import { createContext } from 'react';
import { ImportData, KindOfData } from '../types';

interface InserterContext {
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

export const InserterContext = createContext<InserterContext>({
  dataKind: undefined,
  filename: '',
  parsedData: [],
  optionId: null,
  journal: {
    date: null,
    title: '',
    editorState: EditorState.createEmpty(),
  },
});
