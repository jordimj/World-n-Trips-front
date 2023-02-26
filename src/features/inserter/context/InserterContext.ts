import { EditorState } from 'draft-js';
import { createContext, Dispatch, SetStateAction } from 'react';
import { ImportData, KindOfData } from '../types';

interface InserterContext {
  dataKind: KindOfData | undefined;
  filename: string;
  parsedData?: ImportData;
  optionId: number;
  journal: {
    date: Date | null;
    title: string;
    editorState: EditorState;
  };
  //   updateParsedData: (
  //     id: number,
  //     key: 'category' | 'subcategory' | 'extraInfo',
  //     value: any
  //   ) => void;
}

export const InserterContext = createContext<InserterContext>({
  dataKind: undefined,
  filename: '',
  parsedData: [],
  optionId: -1,
  journal: {
    date: null,
    title: '',
    editorState: EditorState.createEmpty(),
  },
});
